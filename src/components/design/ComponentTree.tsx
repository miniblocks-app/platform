import React from "react";
import { 
  ChevronRight, 
  Plus, 
  Smartphone, 
  Type, 
  Image, 
  Donut as Button, 
  Trash2,
  Circle,
  Minus as LineIcon,
  Box as RectangleIcon,
  Square,
  Star
} from "lucide-react";
import clsx from "clsx";
import { useAppStore } from "../../store";
import { WorkspaceSvg } from "react-blockly";

/** An icon for different component types (button, text, image, etc.) */
const ComponentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "button":
      return <Button className="w-4 h-4 text-gray-600" />;
    case "text":
      return <Type className="w-4 h-4 text-gray-600" />;
    case "image":
      return <Image className="w-4 h-4 text-gray-600" />;
    case "circle":
      return <Circle className="w-4 h-4 text-gray-600" />;
    case "line":
      return <LineIcon className="w-4 h-4 text-gray-600" />;
    case "rectangle":
      return <RectangleIcon className="w-4 h-4 text-gray-600" />;
    case "square":
      return <Square className="w-4 h-4 text-gray-600" />;
    case "star":
      return <Star className="w-4 h-4 text-gray-600" />;
    default:
      return null;
  }
};

/**
 * Props for our ComponentTree:
 * - workspace: the current Blockly workspace (if available)
 * - currentProject: the project containing screens
 */
interface ComponentTreeProps {
  workspace: WorkspaceSvg | null;
  currentProject: any; // or the proper type if you have one
}

export const ComponentTree: React.FC<ComponentTreeProps> = ({
  workspace,
  currentProject,
}) => {
  // From your store
  const { 
    selectedScreen, 
    selectedComponent,
    setSelectedScreen, 
    setSelectedComponent,
    addScreen,
    setShowDeleteDialog,
    setScreenToDelete
  } = useAppStore();

  // Local state to track which screens are expanded in the tree
  const [expandedScreens, setExpandedScreens] = React.useState<Set<string>>(new Set());

  // Create + add a new screen
  const handleAddScreen = () => {
    const screenCount = currentProject?.screens.length ?? 0;
    const newScreen = {
      id: crypto.randomUUID(),
      name: `Screen ${screenCount + 1}`,
      components: [],
      settings: {
        scrollable: false,
        backgroundColor: "#ffffff",
        orientation: "portrait" as const,
        statusBar: {
          visible: true,
          style: "default" as const,
          color: "#000000",
        },
      },
    };

    // 1) Add the screen to the store
    addScreen(newScreen);
    setSelectedScreen(newScreen.id);

    // 2) Create a new block for this screen (if workspace is ready)
    if (workspace) {
      // 1. Create the parent block
      const parentBlock = workspace.newBlock("flutter_stateless_widget");
      parentBlock.setFieldValue(`screen${screenCount+1}`, "classname");  // e.g. "screen1"

      // 2. Create the child block
      const childBlock = workspace.newBlock("flutter_create_instance");
      childBlock.setFieldValue("MyWidget", "className");  // e.g. "MyWidget"

      // 3. Connect the child to the parent's "content" input
      //    (This depends on your block definition. If your "flutter_stateless_widget"
      //     block has an <value name="content">, then you connect childBlock's
      //     output connection to that input's connection.)
      const contentInput = parentBlock.getInput("content");
      if (contentInput && contentInput.connection && childBlock.outputConnection) {
        contentInput.connection.connect(childBlock.outputConnection);
      }

      // Finally, initialize & render both blocks
      parentBlock.initSvg();
      parentBlock.render();

      childBlock.initSvg();
      childBlock.render();

    }
  };

  // Expand/collapse a screen in the tree view
  const toggleScreenExpand = (screenId: string) => {
    setExpandedScreens((prev) => {
      const next = new Set(prev);
      if (next.has(screenId)) {
        next.delete(screenId);
      } else {
        next.add(screenId);
      }
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header area with "Add Screen" button */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-700 mb-2 flex items-center justify-between">
          Component Tree
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={handleAddScreen}
            title="Add new screen"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </h2>
      </div>

      {/* List of screens and components */}
      <div className="flex-1 overflow-y-auto">
        {currentProject?.screens.map((screen: any) => (
          <div key={screen.id}>
            <div
              className={clsx(
                "flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50",
                selectedScreen === screen.id && "bg-blue-50"
              )}
            >
              {/* Button to expand/collapse screen */}
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => toggleScreenExpand(screen.id)}
              >
                <ChevronRight
                  className={clsx(
                    "w-4 h-4 text-gray-400 transition-transform",
                    expandedScreens.has(screen.id) && "rotate-90"
                  )}
                />
              </button>

              {/* Clicking screen name selects it */}
              <button
                className="flex items-center flex-1"
                onClick={() => setSelectedScreen(screen.id)}
              >
                <Smartphone className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">{screen.name}</span>
              </button>

              {/* Delete screen button */}
              <button
                className="p-1 hover:bg-red-50 rounded text-red-500"
                onClick={() => {
                  setScreenToDelete(screen.id);
                  setShowDeleteDialog(true);
                }}
                title="Delete screen"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* If expanded, show child components */}
            {expandedScreens.has(screen.id) &&
              screen.components.map((component: any) => (
                <div
                  key={component.id}
                  className={clsx(
                    "flex items-center px-8 py-1 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer",
                    selectedComponent === component.id && "bg-blue-50"
                  )}
                  onClick={() => setSelectedComponent(component.id)}
                >
                  <ComponentIcon type={component.type} />
                  <span className="ml-2 capitalize">{component.type}</span>
                </div>
              ))}
          </div>
        ))}

        {/* If no screens exist yet */}
        {(!currentProject?.screens || currentProject.screens.length === 0) && (
          <div className="p-4 text-sm text-gray-500 text-center">
            No screens yet. Click the + button to create one.
          </div>
        )}
      </div>
    </div>
  );
};