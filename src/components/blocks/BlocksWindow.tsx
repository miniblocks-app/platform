import { BlocklyWorkspace, WorkspaceSvg } from "react-blockly";
import { useAppStore } from "../../store";
import { useState } from "react";
import "./customBlocks/custom_Blocks";
import { flutterCategory } from "../../categories/flutter.ts";
import { dartGenerator } from "blockly/dart";
import { ComponentTree } from "../design/ComponentTree.tsx";

export const BlocksWindow = () => {
  const { debugMode, blocklyXml, setBlocklyXml, currentProject } = useAppStore();
  const [dartCode, setDartCode] = useState("");
  const [workspace, setWorkspace] = useState<WorkspaceSvg | null>(null);

  // Whenever the XML changes (user drags blocks, etc.)
  const handleXmlChange = (newXml: string) => {
    setBlocklyXml(newXml);
  };

  // Toolbox categories for your custom blocks
  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [flutterCategory],
  };
  // Called on every workspace change
  const workspaceDidChange = (ws: WorkspaceSvg) => {
    setWorkspace(ws);

    const code = dartGenerator.workspaceToCode(ws);
    setDartCode(code);
    // For debugging
    console.log("Dart Code:", code);
    console.log("Current XML:", blocklyXml);
  };
  

  return (
    <>
      <div className="flex-1 flex">
        <div className="w-64 bg-white border-r flex flex-col">
          <ComponentTree
            workspace={workspace}
            currentProject={currentProject}
          />
        </div>
      </div>
      <BlocklyWorkspace
        initialXml={blocklyXml ?? undefined}
        toolboxConfiguration={toolboxCategories}
        className="[h-screen-100px] w-screen"
        onXmlChange={handleXmlChange}
        workspaceConfiguration={{
          grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
        }}
        onWorkspaceChange={workspaceDidChange} 
      />
      {debugMode && (
        <textarea
          id="code"
          style={{ height: "[h-screen-200px]", width: "400px" }}
          value={dartCode}
          readOnly
        />
      )}
    </>
  );
};
