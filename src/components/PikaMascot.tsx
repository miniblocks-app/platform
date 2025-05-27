import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import PikaIcon from './PikaIcon';
import MascotGif from '../assets/Mascot.gif';

const PikaMascot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'pika'; text: string }[]>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', text: message }]);

    // Generate response based on the message
    const response = generateResponse(message);
    
    // Add Pika's response to chat
    setChatHistory(prev => [...prev, { type: 'pika', text: response }]);
    
    setMessage('');
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('build')) {
      return "The Build button is in the top header. It compiles your project so you can preview or deploy it.";
    }
     if (lowerMessage.includes('preview')) {
        return "The Preview button, located in the top header, lets you see how your app will look and behave before deploying.";
    }
     if (lowerMessage.includes('request web view') || lowerMessage.includes('request') && lowerMessage.includes('web')) {
        return "Request Web View is in the top header. Use it to request a deployable web version of your project.";
    }
     if (lowerMessage.includes('view web') || lowerMessage.includes('view') && lowerMessage.includes('web')) {
        return "The View Web button in the top header takes you to the live, deployed version of your project.";
    }
    if (lowerMessage.includes('button')) {
      return "You can find button components in the UI components section. They're styled using Tailwind CSS and follow our design system!";
    }
    if (lowerMessage.includes('radio button') || lowerMessage.includes('radio')) {
      return "To add a radio button, you can use the RadioGroup component from our UI library. Check out the documentation for examples!";
    }
    if (lowerMessage.includes('checkbox')) {
        return "Checkbox components are available in the Form Elements section. You can configure their state and labels.";
    }
    if (lowerMessage.includes('slider')) {
        return "You can add sliders from the Form Elements section. They are useful for selecting a value within a range.";
    }
    if (lowerMessage.includes('input field') || lowerMessage.includes('input') || lowerMessage.includes('text field')) {
        return "Input fields are under Form Elements. You can use them to get text input from the user.";
    }
     if (lowerMessage.includes('counter')) {
        return "The Counter component is in the Form Elements section. It provides a simple way to increment and decrement a value.";
    }
    if (lowerMessage.includes('dropdown') || lowerMessage.includes('select')) {
        return "Dropdowns are also in Form Elements. They allow users to select an option from a list.";
    }
     if (lowerMessage.includes('text')) {
        return "You can add Text components from the General section to display static text on the screen.";
    }
     if (lowerMessage.includes('image')) {
        return "Image components are in the General section. You can use them to display images in your app.";
    }
     if (lowerMessage.includes('spacer')) {
        return "The Spacer component is in the General section and is used to add empty space between elements for layout.";
    }
     if (lowerMessage.includes('circle')) {
        return "Circle shapes can be added from the Shapes section to include basic geometric shapes.";
    }
     if (lowerMessage.includes('line')) {
        return "You can add Line shapes from the Shapes section, useful for dividers or visual elements.";
    }
     if (lowerMessage.includes('rectangle') || lowerMessage.includes('square')) {
        return "Rectangle shapes are available in the Shapes section, for adding rectangular visual elements.";
    }
    if (lowerMessage.includes('logic') || lowerMessage.includes('if') || lowerMessage.includes('condition')) {
        return "Logic blocks are in the Logic section. You can use them to create conditional statements, loops, and control flow in your app. Try using 'if' blocks for conditions, 'while' for loops, and 'set variable' for storing values.";
    }
    if (lowerMessage.includes('variable') || lowerMessage.includes('var')) {
        return "You can create and manage variables using the Logic section. Use 'set variable' to create or update variables, and 'get variable' to use their values in your app.";
    }
    if (lowerMessage.includes('loop') || lowerMessage.includes('while') || lowerMessage.includes('for')) {
        return "Loops are available in the Logic section. Use 'while' blocks to repeat actions while a condition is true, or 'for' blocks to iterate a specific number of times.";
    }
    if (lowerMessage.includes('function') || lowerMessage.includes('method')) {
        return "Functions are in the Logic section. You can create reusable blocks of code using 'function' blocks. Define parameters and return values to make your functions more flexible.";
    }
    if (lowerMessage.includes('operator') || lowerMessage.includes('math') || lowerMessage.includes('calculate')) {
        return "Math operators are in the Logic section. You can perform calculations using blocks like 'add', 'subtract', 'multiply', and 'divide'. There are also comparison operators like 'equals', 'greater than', and 'less than'.";
    }
    if (lowerMessage.includes('flutter') || lowerMessage.includes('widget')) {
        return "Flutter blocks are in the Flutter section. You can use them to create Flutter widgets like Center, Container, Text, Row, Column, ListView, and more. These blocks generate Dart code for your Flutter app.";
    }
    if (lowerMessage.includes('center') || lowerMessage.includes('align')) {
        return "The Center block is in the Flutter section. It helps you center any widget both horizontally and vertically in its parent container.";
    }
    if (lowerMessage.includes('container')) {
        return "The Container block is in the Flutter section. It's a versatile widget that can have padding, margins, borders, and background colors. You can also set its width and height.";
    }
    if (lowerMessage.includes('row') || lowerMessage.includes('column') || lowerMessage.includes('layout')) {
        return "Row and Column blocks are in the Flutter section. Use Row to arrange widgets horizontally and Column to arrange them vertically. You can add multiple children to both.";
    }
    if (lowerMessage.includes('listview')) {
        return "The ListView block is in the Flutter section. It creates a scrollable list of widgets. Perfect for displaying long lists of items that might not fit on the screen.";
    }
    if (lowerMessage.includes('scaffold')) {
        return "The Scaffold block is in the Flutter section. It provides a basic visual layout structure for your app, including an AppBar, body, and optional FloatingActionButton.";
    }
    if (lowerMessage.includes('appbar')) {
        return "The AppBar block is in the Flutter section. It creates a top app bar with a title. You can customize it with different colors and styles.";
    }
    if (lowerMessage.includes('stateful') || lowerMessage.includes('state')) {
        return "The StatefulWidget block is in the Flutter section. Use it when you need to create widgets that can change over time. It includes a state class where you can manage variables and update the UI.";
    }
    if (lowerMessage.includes('setstate') || lowerMessage.includes('update')) {
        return "The setState block is in the Flutter section. Use it inside a StatefulWidget to update the UI when your data changes. It triggers a rebuild of the widget with the new state.";
    }
    if (lowerMessage.includes('raw code') || lowerMessage.includes('custom code')) {
        return "The raw code blocks are in the Flutter section. Use them to write custom Dart code when you need more control than what the blocks provide. 'raw code' for expressions and 'raw statement' for statements.";
    }
    if (lowerMessage.includes('string') || lowerMessage.includes('text value')) {
        return "The String block is in the Flutter section. Use it to create text values that can be used in Text widgets or other places where a string is needed.";
    }
    if (lowerMessage.includes('icon') || lowerMessage.includes('icons')) {
        return "Icon blocks are in the Flutter section. Use 'flutter_icons' to select an icon from the Material Icons library, and 'flutter_icon' to create an Icon widget with the selected icon.";
    }
    if (lowerMessage.includes('placeholder')) {
        return "The Placeholder block is in the Flutter section. It creates a box that represents where other widgets will be added. Useful for planning your layout before adding the actual content.";
    }
    if (lowerMessage.includes('button') || lowerMessage.includes('fab')) {
        return "Button blocks are in the Flutter section. You can use RaisedButton for standard buttons and FloatingActionButton for floating buttons. Both can have an onPressed handler and a child widget.";
    }
    if (lowerMessage.includes('component')) {
      return "All our components are located in the src/components directory. We have UI components, layout components, and more!";
    }
    
    // Default response
    return "I'm not so sure about that.. Maybe you can check the documentation here: https://miniblocks-docs.vercel.app/";
  };

  const latestPika =
    chatHistory.filter(m => m.type === 'pika').pop()?.text ?? 'How can I help?';

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
            <div className="bg-white p-4 rounded-lg shadow-lg w-64">
              <div className="flex flex-col space-y-4">
                {/* Speech bubble */}
                <div className="relative max-w-full">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    {latestPika}
                  </div>
                  <div className="absolute left-0 top-full w-0 h-0 border-t-8 border-t-gray-100 border-x-8 border-x-transparent" />
                </div>

                {/* Input field */}
                <div className="flex w-full">
                  <Input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Ask Pika something..."
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 mr-2"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Send
                  </Button>
                </div>
              </div>
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
        Ask Pika!
      </Button>
    </div>
  );
};

export default PikaMascot;
