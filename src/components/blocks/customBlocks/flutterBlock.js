import * as Blockly from "blockly";

// TODO: Deprecated blocks, remove in future versions
// Blockly.Blocks['flutter_import_material'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("import 'package:flutter/material.dart';");
//         this.setOutput(true, "Import");
//         this.setPreviousStatement(false, null);
//         this.setNextStatement(false, null);
//         this.setColour(510);
//         this.setTooltip("Import Flutter Material package");
//         this.setHelpUrl("https://api.flutter.dev/flutter/material/material-library.html");
//     }
// };
// Blockly.Blocks['flutter_main'] = {
//     init() {
//         this.appendDummyInput().appendField("main()");
//         this.appendStatementInput("body")
//             .setCheck(null)
//             .appendField("body");
//         this.setColour(290);
//         this.setTooltip("Dart entry point");
//         this.setHelpUrl("https://dart.dev/guides/language/language-tour#functions");
//     }
// };
// Blockly.Blocks['runApp'] = {
//     init: function() {
//         this.appendValueInput("NAME")
//             .setCheck("Widget")
//             .appendField("RunApp");
//         this.setColour(230);
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(false, null);
//         this.setTooltip("");
//         this.setHelpUrl("https://api.flutter.dev/flutter/widgets/runApp.html");
//     }
// };
// Blockly.Blocks['app'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("App of type")
//             .appendField(new Blockly.FieldDropdown([["material","MATERIAL"], ["cupertino","CUPERTINO"]]), "type");
//         this.appendValueInput("title")
//             .setCheck("String")
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField("title");
//         this.appendValueInput("home")
//             .setCheck(null)
//             .setAlign(Blockly.ALIGN_RIGHT)
//             .appendField("home");
//         this.setOutput(true, ["Widget", "MaterialApp"]);
//         this.setColour(230);
//         this.setTooltip("");
//         this.setHelpUrl("https://api.flutter.dev/flutter/material/MaterialApp-class.html");
//     }
// };
//
// -- STATELESS WIDGET BLOCK --
// Blockly.Blocks['flutter_stateless_widget'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField(new Blockly.FieldTextInput("MyWidget"), "classname")
//             .appendField("StatelessWidget");
//         this.appendValueInput("content")
//             .setCheck("Widget")
//             .appendField("build(BuildContext context)");
//         this.setColour(120);
//         this.setTooltip("");
//         this.setHelpUrl("https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html");
//     }
// };


Blockly.Blocks['flutter_string'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Value")
            .appendField(new Blockly.FieldTextInput("Hello World"), "fluString");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("Create a string value that can be used in Text widgets or other places where text is needed");
        this.setHelpUrl("https://dart.dev/language/built-in-types#strings");
    }
};

Blockly.Blocks['flutter_text_variable'] = {
    init: function() {
        this.appendValueInput("data")
            .setCheck(null)  // Accept any type
            .appendField("Text Variable");
        this.setColour(230);
        this.setOutput(true, ["Widget", "Text"]);
        this.setTooltip("Create a Text widget that can display variables or expressions. The value will be automatically converted to a string.");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Text-class.html");
    }
};

Blockly.Blocks['scaffold'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("App with a bottom sheet:");
        this.appendValueInput("appBar")
            .setCheck("AppBar")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Add App Title:");
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
        this.setTooltip("A Scaffold provides the basic material design visual layout structure. It includes an AppBar, body content, and optional floating action button.");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/Scaffold-class.html");
    }
};

Blockly.Blocks['appBar'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("App Title");
        this.appendValueInput("title")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("title")
        this.setOutput(true, ["Widget", "AppBar"]);
        this.setColour(165);
        this.setTooltip("Create an AppBar that appears at the top of the screen. It typically contains the app title and can include actions and navigation controls.");
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
        this.setTooltip("Create a Text widget to display a string of text with a single style. Connect a string value to display it.");
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
        this.setTooltip("Create a Row widget that displays its children in a horizontal array. Children will be laid out from left to right.");
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
        this.setTooltip("Create a Column widget that displays its children in a vertical array. Children will be laid out from top to bottom.");
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
        this.setTooltip("Create a ListView widget that displays a scrollable list of widgets. Perfect for displaying lists of items that might not fit on the screen.");
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
        this.setTooltip("Create an Icon widget that displays a graphical icon. You can specify the icon type, color, and size.");
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
        this.setTooltip("Select a Material Design icon. Type the name of the icon (e.g., 'home', 'settings', 'person') to use it in your app.");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/Icons-class.html");
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
        this.setTooltip("Create a placeholder widget that shows a box where other widgets will be added. Useful for planning your layout before adding the actual content.");
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
        this.setTooltip("Create a Material Design raised button. The button will appear elevated and respond to touch events. Add an onPressed handler to define what happens when the button is clicked.");
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
        this.setTooltip("Create a floating action button that hovers over the content. Typically used for the primary action in an app. Add an onPressed handler to define what happens when the button is clicked.");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/FloatingActionButton-class.html");
    }
};


Blockly.Blocks['flutter_stateful_widget'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("App"), "classname")
            .appendField("Let's Build Something Awesome!");
        this.appendStatementInput("First")
            .setCheck(null)
            .appendField("Make");
        this.appendValueInput("content")
            .setCheck("Widget")
            .appendField("View");
        this.setColour(250);
        this.setTooltip("Create a StatefulWidget that can maintain state and rebuild when the state changes. Use the 'Make' section to define variables and state, and the 'View' section to define what to display.");
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
        this.setTooltip("Create an instance of a custom widget. Enter the name of the widget class you want to instantiate.");
        this.setHelpUrl("https://dart.dev/language/classes#using-constructors");
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
        this.setTooltip("Create a Container widget that can be customized with width, height, color, and a child widget. Useful for creating boxes with specific dimensions and styling.");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Container-class.html");
    }
};


Blockly.Blocks['flutter_set_state_call'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Change Something");
        this.appendStatementInput("code")
            .setCheck(null)
            .appendField("What to change?");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Use this block inside a StatefulWidget to update the state and trigger a rebuild of the widget. Add the code that changes the state variables.");
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
        this.setTooltip("Enter raw Dart code that will be used as a value. Use this for advanced cases where the block system doesn't provide what you need.");
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
        this.setTooltip("Enter raw Dart code statements. Use this for advanced cases where the block system doesn't provide what you need.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['flutter_center'] = {
    init: function() {
        this.appendValueInput("child")
            .setCheck("Widget")
            .appendField("Center");
        this.setOutput(true, ["Widget", "Center"]);
        this.setColour(160);
        this.setTooltip("Create a Center widget that aligns its child widget to the middle of the available space, both horizontally and vertically.");
        this.setHelpUrl("https://api.flutter.dev/flutter/widgets/Center-class.html");
    }
};

Blockly.Blocks['flutter_textfield'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("TextField");
        this.appendValueInput("hintText")
            .setCheck("String")
            .appendField("hint");
        this.setOutput(true, "Widget");
        this.setColour(160);
        this.setTooltip("Simple text input field");
        this.setHelpUrl("https://api.flutter.dev/flutter/material/TextField-class.html");
    }
};

