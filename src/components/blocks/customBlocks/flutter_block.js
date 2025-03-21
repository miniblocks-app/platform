import * as Blockly from "blockly";

Blockly.Blocks['flutter_import_material'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("import 'package:flutter/material.dart';");
        // This block returns the import statement as a string.
        this.setOutput(true, "Import");
        this.setColour(120);
        this.setTooltip("Import Flutter Material package");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/material-library.html");
    }
};

//
// -- RUN APP BLOCK --
Blockly.Blocks['runApp'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck("Widget")
            .appendField("RunApp");
        this.setColour(230);
        this.setPreviousStatement(true, null);
        this.setNextStatement(false, null);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/runApp.html");
    }
};

//
// -- APP (MaterialApp / CupertinoApp) BLOCK --
Blockly.Blocks['app'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("App of type")
            .appendField(new Blockly.FieldDropdown([["material","MATERIAL"], ["cupertino","CUPERTINO"]]), "type");
        this.appendValueInput("title")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("title");
        this.appendValueInput("home")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("home");
        this.setOutput(true, ["Widget", "MaterialApp"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/MaterialApp-class.html");
    }
};

//
// -- SCAFFOLD BLOCK --
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
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/Scaffold-class.html");
    }
};

//
// -- APP BAR BLOCK --
Blockly.Blocks['appBar'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("appBar");
        // Set check to ["Widget"] or ["Text"] so it can accept a Text widget or any widget:
        this.appendValueInput("title")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("title")
            .setCheck(["Widget","Text"]);
        this.setOutput(true, ["Widget", "AppBar"]);
        this.setColour(165);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/AppBar-class.html");
    }
};

//
// -- TEXT WIDGET BLOCK --
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

//
// -- ROW BLOCK --
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

//
// -- COLUMN BLOCK --
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

//
// -- LISTVIEW BLOCK --
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

//
// -- ICON BLOCK --
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

//
// -- ICONS.* BLOCK --
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

//
// -- PLACEHOLDER BLOCK --
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

//
// -- RAISED BUTTON BLOCK --
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

//
// -- FLOATING ACTION BUTTON BLOCK --
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

//
// -- STATELESS WIDGET BLOCK --
Blockly.Blocks['flutter_stateless_widget'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("MyWidget"), "classname")
            .appendField("StatelessWidget");
        this.appendValueInput("content")
            .setCheck("Widget")
            .appendField("build(BuildContext context)");
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html");
    }
};

//
// -- STATEFUL WIDGET BLOCK --
Blockly.Blocks['flutter_stateful_widget'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("MyWidget"), "classname")
            .appendField("StatefulWidget");
        this.appendStatementInput("lets")
            .setCheck(null)
            .appendField("lets");
        this.appendValueInput("content")
            .setCheck("Widget")
            .appendField("build(BuildContext context)");
        this.setColour(250);
        this.setTooltip("");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html");
    }
};

//
// -- CREATE INSTANCE BLOCK --
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

//
// -- CONTAINER BLOCK --
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

//
// -- SET STATE CALL BLOCK --
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

//
// -- RAW INPUT (for expressions) BLOCK --
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

//
// -- RAW STATEMENT (for statements) BLOCK --
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
