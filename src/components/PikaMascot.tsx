import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import PikaIcon from './PikaIcon';
import MascotGif from '../assets/Mascot.gif';
import { useAppStore } from '../store';
import { getFlutterBlocksInfo } from './blocks/customBlocks/flutterBlock.js';
import { getFlutterGeneratorsInfo } from './blocks/customBlocks/flutterGenerator.js';

const PikaMascot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'pika'; text: string }[]>([]);
  
  // Get current context from the app store
  const { 
    activeTab, 
    currentProject, 
    selectedScreen, 
    selectedComponent, 
    debugMode, 
    advanceMode,
    dartCode 
  } = useAppStore();

  // Get API key from environment variable (Vite uses import.meta.env)
  const apiKey = import.meta.env.REACT_APP_GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!genAI) {
      return "I'm sorry, but I need an API key to be configured to help you properly. Please check your .env file and add REACT_APP_GEMINI_API_KEY.";
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      
      // Build context about the current state
      const currentContext = {
        activeTab,
        projectName: currentProject?.name || 'No project',
        screenCount: currentProject?.screens?.length || 0,
        selectedScreen: selectedScreen || 'None',
        selectedComponent: selectedComponent || 'None',
        debugMode,
        advanceMode,
        hasCode: !!dartCode && dartCode.trim().length > 0
      };

      // Get Flutter blocks and generators info
      const flutterBlocksInfo = getFlutterBlocksInfo();
      const flutterGeneratorsInfo = getFlutterGeneratorsInfo();

      // Create a comprehensive prompt with context
      const prompt = `You are Pika, a friendly and helpful AI assistant for Miniblocks - a visual mobile app development platform similar to MIT App Inventor but for Flutter apps.

CURRENT USER CONTEXT:
- Active Tab: ${currentContext.activeTab}
- Current Project: ${currentContext.projectName}
- Number of Screens: ${currentContext.screenCount}
- Selected Screen: ${currentContext.selectedScreen}
- Selected Component: ${currentContext.selectedComponent}
- Debug Mode: ${currentContext.debugMode ? 'ON' : 'OFF'}
- Advanced Mode: ${currentContext.advanceMode ? 'ON' : 'OFF'}
- Has Generated Code: ${currentContext.hasCode ? 'YES' : 'NO'}

PLATFORM FEATURES YOU CAN HELP WITH:
1. *Design Tab*: Drag-and-drop visual interface
   - Components: Button, Text, Image, Spacer, Input Field, Counter, Dropdown, Radio Button, Checkbox, Slider
   - Shapes: Circle, Line, Rectangle, Square, Star
   - Canvas: Mobile preview with alignment guides, zoom, grid
   - Properties Panel: Style components (colors, fonts, positioning)

2. *Blocks Tab*: Visual programming interface using Blockly
   - Flutter blocks for widgets (Center, Text, Container, Scaffold, etc.)
   - Logic blocks (if/else, loops, variables)
   - Debug mode shows generated Dart code
   - Advanced mode enables Flutter-specific blocks

AVAILABLE FLUTTER BLOCKS (Advanced Mode):
${JSON.stringify(flutterBlocksInfo.availableBlocks, null, 2)}

FLUTTER BLOCK CATEGORIES:
${JSON.stringify(flutterBlocksInfo.categories, null, 2)}

FLUTTER CODE GENERATION EXAMPLES:
${JSON.stringify(flutterGeneratorsInfo.codeExamples, null, 2)}

COMMON FLUTTER PATTERNS:
${JSON.stringify(flutterGeneratorsInfo.commonPatterns, null, 2)}

3. *Project Management*:
   - Create/manage multiple projects
   - Multiple screens per project
   - Component tree view
   - Undo/redo functionality

4. *Build & Deploy*:
   - Build button: Compiles project for mobile
   - Preview button: Opens preview in new tab
   - Request Web View: Compiles for web deployment
   - View Web: Shows compiled web version

5. *Header Controls*:
   - Switch between Design/Blocks tabs
   - Project naming and sharing
   - Build, Preview, Web compilation buttons
   - User authentication

PERSONALITY:
- Friendly, enthusiastic, and encouraging
- Use emojis occasionally but don't overdo it
- Give specific, actionable advice
- Reference the user's current context when relevant
- Keep responses concise but helpful
- If unsure about something specific, acknowledge it and offer general guidance
- When helping with Flutter blocks, provide specific block names and explain how to connect them
- If user asks about Flutter widgets, explain both the visual block and the generated Dart code

USER QUESTION: ${userMessage}

Please provide a helpful response as Pika, considering the user's current context and the platform's capabilities. If they're asking about Flutter blocks or widgets, reference the specific blocks available and show how they generate Dart code. If they're asking about something not directly related to Miniblocks, still try to be helpful but gently guide them back to app development topics.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm having trouble connecting to my AI brain right now. Please try again in a moment! In the meantime, you can check out our documentation at https://miniblocks-docs.vercel.app/";
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { type: 'user' as const, text: message };
    setChatHistory(prev => [...prev, userMessage]);
    
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(currentMessage);
      
      // Add Pika's response to chat
      const pikaMessage = { type: 'pika' as const, text: aiResponse };
      setChatHistory(prev => [...prev, pikaMessage]);
      
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage = { 
        type: 'pika' as const, 
        text: "Oops! I encountered an error. Please try asking me again! 🤖" 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get the latest Pika response or default greeting
  const latestPikaResponse = chatHistory
    .filter(m => m.type === 'pika')
    .pop()?.text ?? "Hi! I'm Pika, your AI assistant for Miniblocks! 🎯 I can help you build amazing mobile apps. What would you like to create today?";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="flex items-start space-x-2"
          >
            {/* Mascot GIF outside the white box */}
            <img
              src={MascotGif}
              alt="Pika"
              className="w-48 h-48 object-contain"
            />

            {/* Chat card */}
            <div className="bg-white p-4 rounded-lg shadow-lg w-80 max-h-96 flex flex-col">
              {/* Chat history */}
              <div className="flex-1 overflow-y-auto mb-4 max-h-48">
                {chatHistory.length > 0 ? (
                  <div className="space-y-3">
                    {chatHistory.slice(-6).map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-blue-100 text-blue-800 ml-4'
                            : 'bg-gray-100 text-gray-800 mr-4'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg mr-4">
                    <div className="text-sm whitespace-pre-wrap">
                      {latestPikaResponse}
                    </div>
                  </div>
                )}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg mr-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span className="text-sm">Pika is thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input field */}
              <div className="flex w-full space-x-2">
                <Input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ask Pika anything about app building..."
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Send
                </Button>
              </div>

              {/* API Key warning */}
              {!apiKey && (
                <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                  ⚠️ AI features require REACT_APP_GEMINI_API_KEY in your .env file
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ask Pika toggle button */}
      <Button
        onClick={() => setIsOpen(o => !o)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2"
      >
        <PikaIcon />
        Ask Pika AI!
      </Button>
    </div>
  );
};

export default PikaMascot;