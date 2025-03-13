import {BlocklyWorkspace, WorkspaceSvg} from "react-blockly";
import { useAppStore } from '../../store';
import { useState } from "react";
import "./customBlocks/custom_Blocks";
import {flutterCategory} from "../../categories/flutter.ts";
import {dartGenerator} from "blockly/dart";

export const BlocksWindow = () => {
  useAppStore();
  const [dartCode, setDartCode] = useState("");

  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      // {
      //   kind: "category",
      //   name: "Logic",
      //   colour: "#5C81A6",
      //   contents: [
      //     {
      //       kind: "block",
      //       type: "controls_if",
      //     },
      //     {
      //       kind: "block",
      //       type: "logic_compare",
      //     },
      //   ],
      // },
      {
        kind: "category",
        name: "Math",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "math_round",
          },
          {
            kind: "block",
            type: "math_number",
          },
        ],
      },
      {
        kind: "category",
        name: "Custom",
        colour: "#5CA699",
        contents: [
          {
            kind: "block",
            type: "new_boundary_function",
          },
          {
            kind: "block",
            type: "return",
          },
        ],
      },
      flutterCategory,
    ],
  };

  function workspaceDidChange(workspace: WorkspaceSvg) {
    const code = dartGenerator.workspaceToCode(workspace);
    setDartCode(code);
  }

  return (
      <>
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
        <textarea
            id="code"
            style={{ height: "200px", width: "400px" }}
            value={dartCode}
            readOnly
        ></textarea>
      </>
  );
};