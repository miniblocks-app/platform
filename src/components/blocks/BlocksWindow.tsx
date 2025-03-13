import {BlocklyWorkspace} from "react-blockly";
import { useAppStore } from '../../store';
import { javascriptGenerator } from 'blockly/javascript';
import { useState } from "react";
import "./customBlocks/custom_Blocks";
import {flutterCategory} from "../../categories/flutter.ts";

export const BlocksWindow = () => {
  useAppStore();
  const [xml, ] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");

  const initialXml =
      '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';
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
      // {
      //   kind: "category",
      //   name: "Math",
      //   colour: "#5CA65C",
      //   contents: [
      //     {
      //       kind: "block",
      //       type: "math_round",
      //     },
      //     {
      //       kind: "block",
      //       type: "math_number",
      //     },
      //   ],
      // },
      // {
      //   kind: "category",
      //   name: "Custom",
      //   colour: "#5CA699",
      //   contents: [
      //     {
      //       kind: "block",
      //       type: "new_boundary_function",
      //     },
      //     {
      //       kind: "block",
      //       type: "return",
      //     },
      //   ],
      // },
      flutterCategory,
    ],
  };

  function workspaceDidChange(workspace) {
    const code = javascriptGenerator.workspaceToCode(workspace);
    setJavascriptCode(code);
  }


  return (
      <>
        <BlocklyWorkspace
            toolboxConfiguration={toolboxCategories}
            initialXml={initialXml}
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
            // onXmlChange={setXml}
        />
        <pre id="generated-xml">{xml}</pre>
        <textarea
            id="code"
            style={{ height: "200px", width: "400px" }}
            value={javascriptCode}
            readOnly
        ></textarea>
      </>
  );
};