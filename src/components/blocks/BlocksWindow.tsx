import {BlocklyWorkspace, WorkspaceSvg} from "react-blockly";
import {useAppStore} from '../../store';
import {useCallback, useState} from "react";
import {flutterCategory, ToolboxCategory} from "./categories/flutterBlocks.ts";
import {dartGenerator} from "blockly/dart";
import {ComponentTree} from "../design/ComponentTree.tsx";
import {Backpack} from '@blockly/workspace-backpack';
import {WorkspaceSearch} from '@blockly/plugin-workspace-search';
import {PositionedMinimap} from '@blockly/workspace-minimap';
import "@blockly/toolbox-search";
import CustomCategory from "../../themes/toolbox/customCats.tsx";
import {LogicTheme} from "../../themes/logicTheme.tsx";
import {commonCategory, variablesCategory, loopsCategory, functionCategory, listCategory} from "./categories/googleBlocks.ts";
import 'blockly/blocks';

export const BlocksWindow = () => {
  const {debugMode, advanceMode, blocklyXml, setBlocklyXml, currentProject, workspace, setWorkspace, setDartCode } = useAppStore();
  const [dartCode, setLocalDartCode] = useState("");
  const baseContents: ToolboxCategory[] = [
        {
            kind: "search",
            name: "Search",
            contents: [],
        },
        { kind: "sep" },
        { kind: "sep" },
        // colorCategory,
        listCategory,
        functionCategory,
        commonCategory,
        loopsCategory,
        variablesCategory,
        // textCategory,
    ];
  if (advanceMode) {
        baseContents.push(flutterCategory);
    }
  const toolboxCategories = {
        kind: "categoryToolbox",
        contents: baseContents,
    };
  const workspaceConfiguration = {
        theme: LogicTheme,
        // renderer: "custom_renderer",
        toolbar: CustomCategory,
        grid: {
            spacing: 20,
            length: 3,
            colour: "#a1caff",
            snap: true,
        },
        zoom: {
            controls: true,
            wheel: true,
            startScale: 0.8,
            maxScale: 3,
            minScale: 0.1,
            scaleSpeed: 1.2,
            pinch: true,
            trashcan: true,
        },
        toolboxConfiguration: {
            hidden: true, // Hide the toolbox
        },
    };
  // Whenever the XML changes (user drags blocks, etc.)
  const handleXmlChange = (newXml: string) => {
    setBlocklyXml(newXml);
  };
  const workspaceDidChange = useCallback((ws: WorkspaceSvg) => {
    setWorkspace(ws);
    const code = dartGenerator.workspaceToCode(ws);
    setLocalDartCode(code);
    setDartCode(code);
  }, [setWorkspace, setDartCode]);


    function handleWorkspaceInjected(workspace: WorkspaceSvg) {
        const minimap = new PositionedMinimap(workspace);
        minimap.init();

        const backpack = new Backpack(workspace);
        backpack.init();

        const workspaceSearch = new WorkspaceSearch(workspace);
        workspaceSearch.init();
    }

    return (
        <>
            <div className="flex w-[200px]">
                <div className="w-64 bg-white border-r flex flex-col">
                    <ComponentTree workspace={workspace} currentProject={currentProject}/>
                </div>
            </div>
            <BlocklyWorkspace
                initialXml={blocklyXml ?? undefined}
                toolboxConfiguration={toolboxCategories}
                className="[h-screen-100px] relative grow"
                workspaceConfiguration={workspaceConfiguration}
                onXmlChange={handleXmlChange}
                onWorkspaceChange={workspaceDidChange}
                onInject={handleWorkspaceInjected}
            />
            {debugMode && (
                <textarea
                    id="code"
                    style={{height: "[h-screen-200px]", width: "400px"}}
                    value={dartCode}
                    readOnly
                ></textarea>
            )}
        </>
    );
};