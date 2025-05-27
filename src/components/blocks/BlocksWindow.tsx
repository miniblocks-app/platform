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
import {
    commonCategory,
    variablesCategory,
    loopsCategory,
    functionCategory,
    listCategory,
    mathCategory
} from "./categories/googleBlocks.ts";
import 'blockly/blocks';


import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Clipboard, ClipboardCheck} from "lucide-react";


const CodePreview: React.FC<{code: string}> = ({code}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (_) {
            // fallback – select text if clipboard api fails
            const range = document.createRange();
            const pre = document.getElementById('dart‑code');
            if (pre) {
                range.selectNodeContents(pre);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
            }
        }
    };

    return (
        <Card className="bottom‑4 right‑4 w‑[32rem] max‑h‑[calc(100vh‑8rem)] shadow‑xl bg‑slate‑900/95 backdrop‑blur">
            <CardContent className="p‑4">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCopy}
                    className="top‑2 right‑2"
                >
                    {copied ? <><ClipboardCheck className="h‑5 w‑5" /> <>Copied!</></> : <><Clipboard className="h‑5 w‑5" /><>Copy</></>}
                </Button>
                <pre
                    id="dart‑code"
                    className="text‑sm leading‑6 whitespace‑pre overflow‑auto font‑mono text‑green‑200"
                >{code || '// Dart code will appear here…'}</pre>
            </CardContent>
        </Card>
    );
};

export const BlocksWindow = () => {
    const {
        debugMode,
        blocklyXml,
        setBlocklyXml,
        currentProject,
        workspace,
        setWorkspace,
        setDartCode,
    } = useAppStore();
    const [dartCode, setLocalDartCode] = useState("");

    const baseContents: ToolboxCategory[] = [
        {
            kind: "search",
            name: "Search",
            contents: [],
        },
        { kind: "sep" },
        { kind: "sep" },
        listCategory,
        functionCategory,
        commonCategory,
        loopsCategory,
        variablesCategory,
        mathCategory,
        flutterCategory
    ];
    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: baseContents,
    };

    const workspaceConfiguration = {
        theme: LogicTheme,
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
            hidden: true,
        },
    };

    // Persist XML
    const handleXmlChange = (newXml: string) => {
        setBlocklyXml(newXml);
    };

    // Update dart code on every workspace change
    const workspaceDidChange = useCallback(
        (ws: WorkspaceSvg) => {
            setWorkspace(ws);
            const code = dartGenerator.workspaceToCode(ws);
            setLocalDartCode(code);
            setDartCode(code);
        },
        [setWorkspace, setDartCode]
    );

    // Enhance workspace with minimap/backpack/search
    const handleWorkspaceInjected = (ws: WorkspaceSvg) => {
        new PositionedMinimap(ws).init();
        new Backpack(ws).init();
        new WorkspaceSearch(ws).init();
    };

    return (
        <>
            <div className="flex w‑[200px]">
                <div className="w‑64 bg‑white border‑r flex flex‑col">
                    <ComponentTree workspace={workspace} currentProject={currentProject} />
                </div>
            </div>

            <BlocklyWorkspace
                initialXml={blocklyXml ?? undefined}
                toolboxConfiguration={toolboxCategories}
                className="[h‑screen‑100px] relative grow"
                workspaceConfiguration={workspaceConfiguration}
                onXmlChange={handleXmlChange}
                onWorkspaceChange={workspaceDidChange}
                onInject={handleWorkspaceInjected}
            />

            {debugMode && <CodePreview code={dartCode} />}
        </>
    );
};
