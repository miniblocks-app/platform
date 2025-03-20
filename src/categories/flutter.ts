import "../components/blocks/customBlocks/flutter_block.js";
import "../components/blocks/customBlocks/flutter_generator.js";
import "../components/blocks/customBlocks/flutter_scaffolding.js";

export interface ToolboxCategory {
    kind: string;
    name?: string;
    colour?: string;
    blockxml?: string;
    gap?: number;
    contents?: Array<{ kind: string; type: string }>;
}

export const flutterCategory: ToolboxCategory= {
    kind: "category",
    name: "Flutter-Blocks",
    colour: "#ffb5eb",
    contents: [
        {
            kind: "block",
            type: "flutter_import_material",
        },
        {
            kind: "block",
            type: "flutter_stateless_widget",
        },
        {
            kind: "block",
            type: "flutter_stateful_widget",
        },
        {
            kind: "block",
            type: "flutter_create_instance",
        },
        {
            kind: "block",
            type: "flutter_set_state_call",
        },
        {
            kind: "block",
            type: "flutter_raw_input",
        },
        {
            kind: "block",
            type: "flutter_raw_statement",
        },
        {
            kind: "block",
            type: "flutter_container",
        },
        {
            kind: "block",
            type: "flutter_text",
        },
        {
            kind: "block",
            type: "runApp",
        },
        {
            kind: "block",
            type: "app",
        },
        {
            kind: "block",
            type: "scaffold",
        },
        {
            kind: "block",
            type: "appBar",
        },
        {
            kind: "block",
            type: "flutter_row",
        },
        {
            kind: "block",
            type: "flutter_column",
        },
        {
            kind: "block",
            type: "flutter_listview",
        },
        {
            kind: "block",
            type: "flutter_icon",
        },
        {
            kind: "block",
            type: "flutter_icons",
        },
        {
            kind: "block",
            type: "flutter_placeholder",
        },
        {
            kind: "block",
            type: "flutter_raised_button",
        },
        {
            kind: "block",
            type: "flutter_fab",
        }
    ],
};
