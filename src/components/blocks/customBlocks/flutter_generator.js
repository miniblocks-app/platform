import * as Blockly from "blockly";
import {dartGenerator, Order} from "blockly/dart";

dartGenerator.forBlock['flutter_text'] = function(block) {
  let value_data = dartGenerator.valueToCode(block, 'data', Order.ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  let code = 'Text('+ value_data+')';
  dartGenerator.definitions_['import_material'] =
        'import \'package:flutter/material.dart\';';
  return [code, Order.NONE];
};

dartGenerator.forBlock['runApp'] = function(block) {
  let value_name = dartGenerator.valueToCode(block, 'NAME', Order.NONE);
  console.log(block);
  console.log(dartGenerator.valueToCode(block, 'NAME', Order.NONE));
  // TODO: Assemble Dart into code variable.
  return 'runApp(' + value_name + ');\n';
};

dartGenerator.forBlock['app'] = function(block) {
  let dropdown_type = block.getFieldValue('type');
  let value_home = dartGenerator.valueToCode(block, 'home', Order.NONE);
  let value_title = dartGenerator.valueToCode(block, 'title', Order.ATOMIC);
  console.log(block);
  let code
  if (dropdown_type === "MATERIAL") {
     code =  'MaterialApp(\n';
    if (value_title !== "")
      code += '\t title:'+value_title +',\n';
    code += 'home:' + value_home + ',\n' +
    ')';
  } else
    code = "Not implemented";
  return [code, Order.NONE];
};

dartGenerator.forBlock['scaffold'] = function(block) {
  let value_appbar = dartGenerator.valueToCode(block, 'appBar', Order.NONE);
  let value_body = dartGenerator.valueToCode(block, 'body', Order.NONE);
  let value_fab = dartGenerator.valueToCode(block, 'fab', Order.NONE);

  let code = 'Scaffold(\n';
  console.log(value_appbar);
  if (value_appbar !== "")
    code += '\t appBar: ' + value_appbar + ',\n';
  if (value_body !== "")
    code += '\t body: ' + value_body + ',\n';

  if (value_fab !== "")
    code += '\t floatingActionButton: ' + value_fab + ',\n';

  code +=  ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.NONE];
};

dartGenerator.forBlock['appBar'] = function(block) {
  let value_title = dartGenerator.valueToCode(block, 'title', Order.NONE);
  // TODO: Assemble Dart into code variable.
  let code = 'AppBar(' +"\n";
  if (value_title !== "")
    code += '\t title: '+ value_title +"\n";

  code += ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_row'] = function(block) {
  let value_children = dartGenerator.valueToCode(block, 'children', Order.NONE);
  // TODO: Assemble Dart into code variable.
  let code = "Row(\n";
  if (value_children !== "") {
    code += "\t children: &lt;Widget&gt;";

  if (value_children.startsWith("["))
    code += value_children+"\n"
  else code += "[\n\t" + value_children + "]\n";
  }
  code += ")"
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_column'] = function(block) {
  let value_children = dartGenerator.valueToCode(block, 'children', Order.NONE);
  // TODO: Assemble Dart into code variable.
  let code = 'Column(\n';
    if (value_children !== "") {
        code += "\t children: &lt;Widget&gt;";

    if (value_children.startsWith("["))
      code += value_children+"\n"
    else code += "[\n\t" + value_children + "]\n";
    }
  code += ")"
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_listview'] = function(block) {
  let value_children = dartGenerator.valueToCode(block, 'children', Order.NONE);
  // TODO: Assemble Dart into code variable.
  let code = 'ListView(\n';
    if (value_children !== "") {
        code += "\t children: &lt;Widget&gt;";

    if (value_children.startsWith("["))
      code += value_children+"\n"
    else code += "[\n\t" + value_children + "]\n";

    }
  code += ")"
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.NONE];
};


dartGenerator.forBlock['flutter_icon'] = function(block) {
  let value_icon = dartGenerator.valueToCode(block, 'icon', Order.NONE);
  let value_color = dartGenerator.valueToCode(block, 'color', Order.ATOMIC);
  let value_size = dartGenerator.valueToCode(block, 'size', Order.ATOMIC);
  // TODO: Assemble Dart into code variable.
  let code = 'Icon(\n';
  if (value_icon !== "")
    code += "\t"+ value_icon+",\n";

  if (value_color !== "")
    code += "\t color: const Color(0xFF"+value_color.slice(2,8).toUpperCase()+"), \n";
  if (value_size !== "")
    code += "\t size: "+value_size+",\n";
  code += ")";
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_icons'] = function(block) {
  let text_constant = block.getFieldValue('constant');
  // TODO: Assemble Dart into code variable.
  let code = "Icons."+text_constant;
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_placeholder'] = function(block) {
  let colour_color = block.getFieldValue('color');
  let number_strokewidth = block.getFieldValue('strokeWidth');
  let number_fallbackwidth = block.getFieldValue('fallbackWidth');
  let number_fallbackheight = block.getFieldValue('fallbackHeight');
  // TODO: Assemble Dart into code letiable.
  let code = "Placeholder( \n";
  code += "\tcolor: const Color(0xFF"+colour_color.slice(1).toUpperCase()+"), \n";
  code += "\tstrokeWidth: "+ number_strokewidth +", \n";
  code += "\tfallbackWidth: "+ number_fallbackwidth +", \n";
  code += "\tfallbackHeight: "+ number_fallbackheight +", \n";
  code += " )"
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_raised_button'] = function(block) {
  let value_child = dartGenerator.valueToCode(block, 'child', Blockly.JavaScript.ORDER_ATOMIC);
  let statement_onPressed = dartGenerator.statementToCode(block, 'onPressed');

  let code = 'RaisedButton(\n';
  if (statement_onPressed !== "")
    code += "\t onPressed: (){\n"+statement_onPressed+"},\n";
  else code += "\t onPressed: null,\n";

  code += "\t child: "+value_child+"\n";
  code += ")";
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_fab'] = function(block) {
  let value_child = dartGenerator.valueToCode(block, 'child', Blockly.JavaScript.ORDER_ATOMIC);
  let statement_onPressed = dartGenerator.statementToCode(block, 'onPressed');

  let code = 'FloatingActionButton(\n';
  if (statement_onPressed !== "")
    code += "\t onPressed: (){\n"+statement_onPressed+"},\n";
  else code += "\t onPressed: null,\n";

  if (value_child !== "")
    code += "\t child: "+value_child+"\n";

  code += ")";
  return [code, Order.NONE];
};


dartGenerator.forBlock['flutter_stateless_widget'] = function(block) {
  dartGenerator.definitions_['import_material'] =
        'import \'package:flutter/material.dart\';';

  let text_classname = block.getFieldValue('classname');
  let value_content = dartGenerator.valueToCode(block, 'content', Order.NONE);
  // TODO: Assemble Dart into code letiable.
  let code = 'class '+text_classname+' extends StatelessWidget {\n';
  code += "\t@override\n";
  code += "\tWidget build(BuildContext context) {\n";

  code += "\t\treturn "+ value_content+";\n";

  code += "\t}\n";
  code += "}\n";
  return code;
};

dartGenerator.forBlock['flutter_stateful_widget'] = function(block) {
  dartGenerator.definitions_['import_material'] =
        'import \'package:flutter/material.dart\';';

  let text_classname = block.getFieldValue('classname');
  let value_content = dartGenerator.valueToCode(block, 'content', Order.NONE);
  let statement_lets = dartGenerator.statementToCode(block, 'lets');
  // Create stateful widget.
  let code = 'class '+text_classname+' extends StatefulWidget {\n';

  code += "\t@override\n";
  code += "\t_"+text_classname + "State createState() => _"+text_classname+"State();\n";
  code += "}\n\n";

  // Create state
  code += 'class _'+text_classname+'State extends State&lt;'+text_classname+'> {\n';
  code += statement_lets + "\n";
  code += "\t@override\n";
  code += "\tWidget build(BuildContext context) {\n";
  code += "\t\treturn "+ value_content+";\n";

  code += "\t}\n";
  code += "}\n";
  return code;
};

dartGenerator.forBlock['flutter_create_instance'] = function(block) {
  let text_classname = block.getFieldValue('className');
  // TODO: Assemble Dart into code letiable.
  let code = text_classname+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_container'] = function(block) {
  let value_width = dartGenerator.valueToCode(block, 'width', Order.ATOMIC);
  let value_height = dartGenerator.valueToCode(block, 'height', Order.ATOMIC);
  let value_color = dartGenerator.valueToCode(block, 'color', Order.ATOMIC);
  let value_child = dartGenerator.valueToCode(block, 'child', Order.ATOMIC);

  let code = 'Container(\n';
  if (value_color !== "")
    code += "\t color: const Color(0xFF"+value_color.slice(2,8).toUpperCase()+"),\n";

  if (value_width !== "")
    code += "\t width: "+value_width+",\n";
  if (value_height !== "")
    code += "\t height: "+value_height+",\n";
  if (value_child !== "")
    code += "\t child: "+value_child+"\n";
  code += ")";

  return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_set_state_call'] = function(block) {
  let statements_code = dartGenerator.statementToCode(block, 'code');
  // TODO: Assemble Dart into code letiable.
  let code = "setState(() {\n";
  code += statements_code +"\n";
  code += "});\n"

  return code;
};

dartGenerator.forBlock['flutter_raw_input'] = function(block) {
  // Text value.
  const code = block.getFieldValue('code');
  return [code, Order.ATOMIC];
};

dartGenerator.forBlock['flutter_raw_statement'] = function(block) {
  // Text value.
  return block.getFieldValue('code');
};