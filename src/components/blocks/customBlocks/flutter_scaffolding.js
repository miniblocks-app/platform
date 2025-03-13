import * as Blockly from "blockly";

Blockly.Blocks['runapp'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("Widget")
          .appendField("RunApp");
      this.setColour(230);
      this.setPreviousStatement(true, null);
   this.setTooltip("");
   this.setHelpUrl("https://api.flutter.dev/flutter/widgets/runApp.html");
    }
  };

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

  Blockly.Blocks['scaffold'] = {
    init: function() {
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_CENTRE)
 //         .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"))
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