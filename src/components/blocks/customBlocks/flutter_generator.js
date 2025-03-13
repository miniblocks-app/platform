import * as Blockly from "blockly";
import {dartGenerator, Order} from "blockly/dart";

dartGenerator.forBlock['flutter_text'] = function(block) {
  let value_data = dartGenerator.valueToCode(block, 'data', Order.ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  let code = 'Text('+ value_data+')';
  // dartGenerator.definitions_['import_material'] =
  //       'import \'package:flutter/material.dart\';';
  return [code, Order.NONE];
};

dartGenerator['runapp'] = function(block) {
  var value_name = dartGenerator.valueToCode(block, 'NAME', dartGenerator.ORDER_NONE);
  console.log(block);
  console.log(dartGenerator.valueToCode(block, 'NAME', dartGenerator.ORDER_NONE));
  // TODO: Assemble Dart into code variable.
  var code = 'runApp(' + value_name+');\n';
  return code;
};

dartGenerator['app'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var value_home = dartGenerator.valueToCode(block, 'home', dartGenerator.ORDER_NONE);
  var value_title = dartGenerator.valueToCode(block, 'title', dartGenerator.ORDER_ATOMIC);
  console.log(block);
  if (dropdown_type == "MATERIAL") {
    code =  'MaterialApp(\n';
    if (value_title != "")
      code += '\t title:'+value_title +',\n';

    code += 'home:' + value_home + ',\n' +

    ')';
  } else
    code = "Not implemented";
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['scaffold'] = function(block) {
  var value_appbar = dartGenerator.valueToCode(block, 'appBar', dartGenerator.ORDER_NONE);
  var value_body = dartGenerator.valueToCode(block, 'body', dartGenerator.ORDER_NONE);
  var value_fab = dartGenerator.valueToCode(block, 'fab', dartGenerator.ORDER_NONE);

  var code = 'Scaffold(\n';
  console.log(value_appbar);
  if (value_appbar != "")
    code += '\t appBar: ' + value_appbar + ',\n';
  if (value_body != "")
    code += '\t body: ' + value_body + ',\n';

  if (value_fab != "")
    code += '\t floatingActionButton: ' + value_fab + ',\n';

  code +=  ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['appBar'] = function(block) {
  var value_title = dartGenerator.valueToCode(block, 'title', dartGenerator.ORDER_NONE);
  // TODO: Assemble Dart into code variable.
  var code = 'AppBar(' +"\n";
  if (value_title != "")
    code += '\t title: '+ value_title +"\n";

  code += ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_row'] = function(block) {
  var value_children = dartGenerator.valueToCode(block, 'children', dartGenerator.ORDER_NONE);
  // TODO: Assemble Dart into code variable.
  var code = "Row(\n";
  if (value_children != "") {
    code += "\t children: &lt;Widget&gt;";

  if (value_children.startsWith("["))
    code += value_children+"\n"
  else code += "[\n\t" + value_children + "]\n";
  }
  code += ")"
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_column'] = function(block) {
  var value_children = dartGenerator.valueToCode(block, 'children', dartGenerator.ORDER_NONE);
  // TODO: Assemble Dart into code variable.
  var code = 'Column(\n';
    if (value_children != "") {
        code += "\t children: &lt;Widget&gt;";

    if (value_children.startsWith("["))
      code += value_children+"\n"
    else code += "[\n\t" + value_children + "]\n";

    }
  code += ")"
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_listview'] = function(block) {
  var value_children = dartGenerator.valueToCode(block, 'children', dartGenerator.ORDER_NONE);
  // TODO: Assemble Dart into code variable.
  var code = 'ListView(\n';
    if (value_children != "") {
        code += "\t children: &lt;Widget&gt;";

    if (value_children.startsWith("["))
      code += value_children+"\n"
    else code += "[\n\t" + value_children + "]\n";

    }
  code += ")"
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, dartGenerator.ORDER_NONE];
};


dartGenerator['flutter_icon'] = function(block) {
  var value_icon = dartGenerator.valueToCode(block, 'icon', dartGenerator.ORDER_NONE);
  var value_color = dartGenerator.valueToCode(block, 'color', dartGenerator.ORDER_ATOMIC);
  var value_size = dartGenerator.valueToCode(block, 'size', dartGenerator.ORDER_ATOMIC);
  // TODO: Assemble Dart into code variable.
  var code = 'Icon(\n';
  if (value_icon != "")
    code += "\t"+ value_icon+",\n";

  if (value_color != "")
    code += "\t color: const Color(0xFF"+value_color.slice(2,8).toUpperCase()+"), \n";
  if (value_size != "")
    code += "\t size: "+value_size+",\n";
  code += ")";
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_icons'] = function(block) {
  var text_constant = block.getFieldValue('constant');
  // TODO: Assemble Dart into code variable.
  var code = "Icons."+text_constant;
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_placeholder'] = function(block) {
  var colour_color = block.getFieldValue('color');
  var number_strokewidth = block.getFieldValue('strokeWidth');
  var number_fallbackwidth = block.getFieldValue('fallbackWidth');
  var number_fallbackheight = block.getFieldValue('fallbackHeight');
  // TODO: Assemble Dart into code variable.
  var code = "Placeholder( \n";
  code += "\tcolor: const Color(0xFF"+colour_color.slice(1).toUpperCase()+"), \n";
  code += "\tstrokeWidth: "+ number_strokewidth +", \n";
  code += "\tfallbackWidth: "+ number_fallbackwidth +", \n";
  code += "\tfallbackHeight: "+ number_fallbackheight +", \n";
  code += " )"
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_raised_button'] = function(block) {
  var value_child = dartGenerator.valueToCode(block, 'child', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_onPressed = dartGenerator.statementToCode(block, 'onPressed');

  var code = 'RaisedButton(\n';
  if (statement_onPressed != "")
    code += "\t onPressed: (){\n"+statement_onPressed+"},\n";
  else code += "\t onPressed: null,\n";

  code += "\t child: "+value_child+"\n";
  code += ")";
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_fab'] = function(block) {
  var value_child = dartGenerator.valueToCode(block, 'child', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_onPressed = dartGenerator.statementToCode(block, 'onPressed');

  var code = 'FloatingActionButton(\n';
  if (statement_onPressed != "")
    code += "\t onPressed: (){\n"+statement_onPressed+"},\n";
  else code += "\t onPressed: null,\n";

  if (value_child != "")
    code += "\t child: "+value_child+"\n";

  code += ")";
  return [code, dartGenerator.ORDER_NONE];
};


dartGenerator['flutter_stateless_widget'] = function(block) {
  dartGenerator.definitions_['import_material'] =
        'import \'package:flutter/material.dart\';';

  var text_classname = block.getFieldValue('classname');
  var value_content = dartGenerator.valueToCode(block, 'content', dartGenerator.ORDER_NONE);
  // TODO: Assemble Dart into code variable.
  var code = 'class '+text_classname+' extends StatelessWidget {\n';
  code += "\t@override\n";
  code += "\tWidget build(BuildContext context) {\n";

  code += "\t\treturn "+ value_content+";\n";

  code += "\t}\n";
  code += "}\n";
  return code;
};

dartGenerator['flutter_stateful_widget'] = function(block) {
  dartGenerator.definitions_['import_material'] =
        'import \'package:flutter/material.dart\';';

  var text_classname = block.getFieldValue('classname');
  var value_content = dartGenerator.valueToCode(block, 'content', dartGenerator.ORDER_NONE);
  var statement_vars = dartGenerator.statementToCode(block, 'vars');
  // Create stateful widget.
  var code = 'class '+text_classname+' extends StatefulWidget {\n';

  code += "\t@override\n";
  code += "\t_"+text_classname + "State createState() => _"+text_classname+"State();\n";
  code += "}\n\n";

  // Create state
  code += 'class _'+text_classname+'State extends State&lt;'+text_classname+'> {\n';
  code += statement_vars + "\n";
  code += "\t@override\n";
  code += "\tWidget build(BuildContext context) {\n";
  code += "\t\treturn "+ value_content+";\n";

  code += "\t}\n";
  code += "}\n";
  return code;
};

dartGenerator['flutter_create_instance'] = function(block) {
  var text_classname = block.getFieldValue('className');
  // TODO: Assemble Dart into code variable.
  var code = text_classname+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_container'] = function(block) {
  var value_width = dartGenerator.valueToCode(block, 'width', dartGenerator.ORDER_ATOMIC);
  var value_height = dartGenerator.valueToCode(block, 'height', dartGenerator.ORDER_ATOMIC);
  var value_color = dartGenerator.valueToCode(block, 'color', dartGenerator.ORDER_ATOMIC);
  var value_child = dartGenerator.valueToCode(block, 'child', dartGenerator.ORDER_ATOMIC);

  var code = 'Container(\n';
  if (value_color != "")
    code += "\t color: const Color(0xFF"+value_color.slice(2,8).toUpperCase()+"),\n";

  if (value_width != "")
    code += "\t width: "+value_width+",\n";
  if (value_height != "")
    code += "\t height: "+value_height+",\n";
  if (value_child != "")
    code += "\t child: "+value_child+"\n";
  code += ")";

  return [code, dartGenerator.ORDER_NONE];
};

dartGenerator['flutter_set_state_call'] = function(block) {
  var statements_code = dartGenerator.statementToCode(block, 'code');
  // TODO: Assemble Dart into code variable.
  var code = "setState(() {\n";
  code += statements_code +"\n";
  code += "});\n"

  return code;
};

dartGenerator['flutter_raw_input'] = function(block) {
  // Text value.
  const code = block.getFieldValue('code');
  return [code, dartGenerator.ORDER_ATOMIC];
};

dartGenerator['flutter_raw_statement'] = function(block) {
  // Text value.
  return block.getFieldValue('code');
};