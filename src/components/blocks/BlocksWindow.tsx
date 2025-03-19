import {BlocklyWorkspace, WorkspaceSvg} from "react-blockly";
import { useAppStore } from '../../store';
import { useState} from "react";
import "./customBlocks/custom_Blocks";
import {flutterCategory} from "../../categories/flutter.ts";
import {dartGenerator} from "blockly/dart";
import {ComponentTree} from "../design/ComponentTree.tsx";
import {Minimap} from '@blockly/workspace-minimap';
import {Backpack} from '@blockly/workspace-backpack';

export const BlocksWindow = () => {
  const { debugMode, advanceMode} = useAppStore();
  const [dartCode, setDartCode] = useState("");

    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: advanceMode ? [flutterCategory] : [],
    };

  function workspaceDidChange(workspace: WorkspaceSvg) {
    const code = dartGenerator.workspaceToCode(workspace);
    setDartCode(code);
  }

  function handleWorkspaceInjected(workspace: WorkspaceSvg) {
      const minimap = new Minimap(workspace);
        minimap.init();

      const backpack = new Backpack(workspace);
      backpack.init();
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
            onInject={handleWorkspaceInjected}
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