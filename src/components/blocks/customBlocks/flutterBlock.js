import * as Blockly from "blockly";

// All existing block definitions
Blockly.Blocks['flutter_center'] = {
    init() {
        this.appendValueInput("child")
            .setCheck("Widget")
            .appendField("Center child");
        this.setOutput(true, ["Widget", "Center"]);
        this.setColour(230);
        this.setTooltip("Centers its child");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Center-class.html");
    }
};

Blockly.Blocks['scaffold'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Scaffold");
        this.appendValueInput("appBar")
            .setCheck("AppBar")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("appBar");
        this.appendValueInput("body")
            .setCheck("Widget")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("body");
        this.appendValueInput("fab")
            .setCheck("FloatingActionButton")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("floatingActionButton");
        this.setOutput(true, ["Widget", "Scaffold"]);
        this.setColour(165);
        this.setTooltip("Hi");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/Scaffold-class");
    }
};

Blockly.Blocks['appBar'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("appBar");
        this.appendValueInput("title")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("title").setCheck("flutter_text");
        this.setOutput(true, ["Widget", "AppBar"]);
        this.setColour(165);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/AppBar-class.html");
    }
};

Blockly.Blocks['flutter_text'] = {
    init: function() {
        this.appendValueInput("data")
            .setCheck("String")
            .appendField("Text");
        this.setColour(230);
        this.setOutput(true, ["Widget", "Text"]);
        this.setTooltip("Text Widget");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Text-class.html");
    }
};

Blockly.Blocks['flutter_row'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Row");
        this.appendValueInput("children")
            .appendField("children")
            .setCheck(["Array", "Widget"]);
        this.setOutput(true, ["Widget","Row"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Row-class.html");
    }
};

Blockly.Blocks['flutter_column'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Column");
        this.appendValueInput("children")
            .appendField("children")
            .setCheck(["Array","Widget"]);
        this.setOutput(true, ["Widget", "Column"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Column-class.html");
    }
};

Blockly.Blocks['flutter_listview'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("ListView");
        this.appendValueInput("children")
            .appendField("children")
            .setCheck(["Array","Widget"]);
        this.setOutput(true, ["Widget", "ListView"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/ListView-class.html");
    }
};

Blockly.Blocks['flutter_icon'] = {
    init: function() {
        this.appendValueInput("icon")
            .setCheck("IconData")
            .appendField("icon");
        this.appendValueInput("color")
            .setCheck("Color")
            .appendField("color");
        this.appendValueInput("size")
            .setCheck("Number")
            .appendField("size");
        this.setColour(230);
        this.setOutput(true, ["Widget", "Icon"]);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Icon-class.html");
    }
};

Blockly.Blocks['flutter_icons'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Icons.")
            .appendField(new Blockly.FieldTextInput("android"), "constant");
        this.setOutput(true, "IconData");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/IconData-class.html");
    }
};

Blockly.Blocks['flutter_placeholder'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Placeholder");
        this.appendDummyInput()
            .appendField("color");
        this.appendDummyInput()
            .appendField("strokeWidth")
            .appendField(new Blockly.FieldNumber(2.0), "strokeWidth");
        this.appendDummyInput()
            .appendField("fallbackWidth")
            .appendField(new Blockly.FieldNumber(400), "fallbackWidth");
        this.appendDummyInput()
            .appendField("fallbackHeight")
            .appendField(new Blockly.FieldNumber(400), "fallbackHeight");
        this.setOutput(true, ["Widget", "Placeholder"]);
        this.setColour(230);
        this.setTooltip("A widget that draws a box that represents where other widgets will one day be added.");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Placeholder-class.html");
    }
};

Blockly.Blocks['flutter_raised_button'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("RaisedButton");
        this.appendStatementInput("onPressed")
            .setCheck("Function")
            .appendField("onPressed");
        this.appendValueInput("child")
            .setCheck("Widget")
            .appendField("child");
        this.setOutput(true, ["Widget", "RaisedButton"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/RaisedButton-class.html");
    }
};

Blockly.Blocks['flutter_fab'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Floating Action Button");
        this.appendStatementInput("onPressed")
            .setCheck("Function")
            .appendField("onPressed");
        this.appendValueInput("child")
            .setCheck("Widget")
            .appendField("child");
        this.setOutput(true, ["Widget", "FloatingActionButton"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/FloatingActionButton-class.html");
    }
};

Blockly.Blocks['flutter_stateful_widget'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("App"), "classname")
            .appendField("MainWidget");
        this.appendStatementInput("Variables")
            .setCheck(null)
            .appendField("Variables");
        this.appendValueInput("content")
            .setCheck("Widget")
        this.setColour(250);
        this.setTooltip("MainWidget is a StatefulWidget that can hold state and rebuild when the state changes.");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html");
    }
};

Blockly.Blocks['flutter_create_instance'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Create instance of")
            .appendField(new Blockly.FieldTextInput("MyWidget"), "className");
        this.setOutput(true, "Widget");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['flutter_container'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Container");
        this.appendValueInput("width")
            .setCheck("Number")
            .appendField("width");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.appendValueInput("color")
            .setCheck("Colour")
            .appendField("color");
        this.appendValueInput("child")
            .setCheck("Widget")
            .appendField("child");
        this.setOutput(true, ["Widget", "Container"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Container/Container.html");
    }
};

Blockly.Blocks['flutter_set_state_call'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("setState");
        this.appendStatementInput("code")
            .setCheck(null)
            .appendField("code to run");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/State/setState.html");
    }
};

Blockly.Blocks['flutter_raw_input'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("raw code")
            .appendField(new Blockly.FieldTextInput("default"), "code");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['flutter_raw_statement'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("raw code")
            .appendField(new Blockly.FieldTextInput("var a = 0;"), "code");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// Export function for LLM context
export const getFlutterBlocksInfo = () => {
    return {
        availableBlocks: [
            {
                name: "flutter_center", 
                description: "Centers its child widget in the available space",
                inputs: ["child (Widget)"],
                output: "Center Widget",
                category: "Layout"
            },
            {
                name: "scaffold", 
                description: "Provides basic material design visual layout structure with appBar, body, and floating action button",
                inputs: ["appBar (AppBar)", "body (Widget)", "fab (FloatingActionButton)"],
                output: "Scaffold Widget",
                category: "Structure"
            },
            {
                name: "appBar", 
                description: "Top navigation bar that appears at the top of a Scaffold",
                inputs: ["title (Text Widget)"],
                output: "AppBar Widget",
                category: "Structure"
            },
            {
                name: "flutter_text", 
                description: "Displays a string of text with single style",
                inputs: ["data (String)"],
                output: "Text Widget",
                category: "Basic"
            },
            {
                name: "flutter_row", 
                description: "Displays its children in a horizontal array",
                inputs: ["children (List of Widgets)"],
                output: "Row Widget",
                category: "Layout"
            },
            {
                name: "flutter_column", 
                description: "Displays its children in a vertical array",
                inputs: ["children (List of Widgets)"],
                output: "Column Widget",
                category: "Layout"
            },
            {
                name: "flutter_container", 
                description: "A convenience widget that combines common painting, positioning, and sizing widgets",
                inputs: ["width (Number)", "height (Number)", "color (Color)", "child (Widget)"],
                output: "Container Widget",
                category: "Layout"
            },
            {
                name: "flutter_stateful_widget", 
                description: "Creates a widget that can hold mutable state and rebuild when the state changes",
                inputs: ["classname (String)", "Variables (Statements)", "content (Widget)"],
                output: "StatefulWidget",
                category: "Structure"
            },
            {
                name: "flutter_raised_button", 
                description: "A material design raised button (deprecated, use ElevatedButton instead)",
                inputs: ["onPressed (Function)", "child (Widget)"],
                output: "RaisedButton Widget",
                category: "Interactive"
            },
            {
                name: "flutter_fab", 
                description: "A circular icon button that hovers over content to promote a primary action",
                inputs: ["onPressed (Function)", "child (Widget)"],
                output: "FloatingActionButton Widget",
                category: "Interactive"
            },
            {
                name: "flutter_icon", 
                description: "A graphical icon widget drawn with a glyph from a font",
                inputs: ["icon (IconData)", "color (Color)", "size (Number)"],
                output: "Icon Widget",
                category: "Basic"
            },
            {
                name: "flutter_listview", 
                description: "A scrollable list of widgets arranged linearly",
                inputs: ["children (List of Widgets)"],
                output: "ListView Widget",
                category: "Layout"
            }
        ],
        categories: {
            "Structure": ["scaffold", "appBar", "flutter_stateful_widget"],
            "Layout": ["flutter_center", "flutter_row", "flutter_column", "flutter_container", "flutter_listview"],
            "Basic": ["flutter_text", "flutter_icon"],
            "Interactive": ["flutter_raised_button", "flutter_fab"]
        },
        usage: {
            basicApp: "Start with Scaffold → add AppBar and body → add content widgets",
            layout: "Use Row/Column for linear layouts, Container for styling, Center for centering",
            interaction: "Use buttons (RaisedButton/FAB) for user actions with onPressed events",
            state: "Use StatefulWidget when you need to update UI based on changing data"
        }
    };
};