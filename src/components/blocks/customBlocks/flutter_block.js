import * as Blockly from "blockly";

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
        .appendField("color")
        .appendField(new Blockly.FieldColour("#c0c0c0"), "color");
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

Blockly.Blocks['flutter_stateful_widget'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("MyWidget"), "classname")
        .appendField("StatefulWidget");
    this.appendStatementInput("vars")
        .setCheck(null)
        .appendField("vars");
    this.appendValueInput("content")
        .setCheck("Widget")
        .appendField("build(BuildContext context)");
    this.setColour(250);
 this.setTooltip("");
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