import {BlocklyWorkspace, WorkspaceSvg} from "react-blockly";
import { useAppStore } from '../../store';
import  { useState } from "react";
import "./customBlocks/custom_Blocks";
import {flutterCategory} from "../../categories/flutter.ts";
import {dartGenerator} from "blockly/dart";
import {ComponentTree} from "../design/ComponentTree.tsx";


export const BlocksWindow = () => {
  const { debugMode} = useAppStore();
  const [dartCode, setDartCode] = useState("");

  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      flutterCategory,
    ],
  };

  function workspaceDidChange(workspace: WorkspaceSvg) {
    const code = dartGenerator.workspaceToCode(workspace);
    setDartCode(code);
  }

  return (
      <>
          <div className="flex-1 flex">
            <div className="w-64 bg-white border-r flex flex-col">
              <ComponentTree />
            </div>
          </div>
        <BlocklyWorkspace
            toolboxConfiguration={toolboxCategories}
            className="[h-screen-100px] w-screen"
            workspaceConfiguration={{
              grid: {
                spacing: 20,
                length: 3,
                colour: "#ccc",
                snap: true,
              },
            }}
            onWorkspaceChange={workspaceDidChange}
        />
        {debugMode && (
            <textarea
                id="code"
                style={{ height: "[h-screen-200px]", width: "400px" }}
                value={dartCode}
                readOnly
            ></textarea>
        )}
      </>
  );
};