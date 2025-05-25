import {dartGenerator, Order} from "blockly/dart";

dartGenerator.forBlock['flutter_import_material'] = function(block) {
  let code = "import 'package:flutter/material.dart'";
  return [code, Order.NONE];
};

const INDENT = '  ';
function indent(code, spaces = 2) {
  return code.replace(/^/gm, INDENT.repeat(spaces / 2));
}

dartGenerator.forBlock['flutter_main'] = function (block) {
  const body = dartGenerator.statementToCode(block, 'body');
  return `void main() {\n${indent(body)}\n}\n`;
};

dartGenerator.forBlock['flutter_center'] = function (block) {
  const child = dartGenerator.valueToCode(block, 'child', Order.NONE);
  const code = `Center(\n${child ? INDENT + 'child: ' + child + ',\n' : ''})`;
  return [code, Order.NONE];
};

dartGenerator.finish = function (code) {
  const customHeader = `
import 'package:flutter/material.dart';

void main() {
	  runApp(MaterialApp(
	  	 home: MyWidget(),
	  ));
}

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Hello();
  }
}
`.trim();

  const headers = Object.values(dartGenerator.definitions_).join('\n');
  return `${customHeader}\n${headers ? headers + '\n' : ''}\n${code}`;
};


dartGenerator.forBlock['flutter_text'] = function(block) {
  let value_data = dartGenerator.valueToCode(block, 'data', Order.ATOMIC);
  let code = 'Text(' + value_data + ')';
  return [code, Order.NONE];
};

//
// -- runApp(...) GENERATOR --
dartGenerator.forBlock['runApp'] = function(block) {
  let value_name = dartGenerator.valueToCode(block, 'NAME', Order.NONE);
  let code = 'runApp(' + value_name + ');\n';
  return code;
};

//
// -- App (MaterialApp) GENERATOR --
dartGenerator.forBlock['app'] = function(block) {
  let dropdown_type = block.getFieldValue('type');
  let value_home = dartGenerator.valueToCode(block, 'home', Order.NONE);
  let value_title = dartGenerator.valueToCode(block, 'title', Order.ATOMIC);

  let code = '';
  if (dropdown_type === "MATERIAL") {
    code = 'MaterialApp(\n';
    if (value_title) {
      code += '\t title: ' + value_title + ',\n';
    }
    if (value_home) {
      code += '\t home: ' + value_home + ',\n';
    }
    code += ')';
  } else {
    // Could implement CupertinoApp similarly
    code = '// CupertinoApp not implemented\nMaterialApp()';
  }
  return [code, Order.NONE];
};

//
// -- Scaffold GENERATOR --
dartGenerator.forBlock['scaffold'] = function(block) {
  let value_appbar = dartGenerator.valueToCode(block, 'appBar', Order.NONE);
  let value_body = dartGenerator.valueToCode(block, 'body', Order.NONE);
  let value_fab = dartGenerator.valueToCode(block, 'fab', Order.NONE);

  let code = 'Scaffold(\n';
  if (value_appbar) {
    code += '\t appBar: ' + value_appbar + ',\n';
  }
  if (value_body) {
    code += '\t body: ' + value_body + ',\n';
  }
  if (value_fab) {
    code += '\t floatingActionButton: ' + value_fab + ',\n';
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- AppBar GENERATOR --
dartGenerator.forBlock['appBar'] = function(block) {
  let value_title = dartGenerator.valueToCode(block, 'title', Order.NONE);
  let code = 'AppBar(\n';
  if (value_title) {
    code += '\t title: ' + value_title + ',\n';
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- Row GENERATOR --
dartGenerator.forBlock['flutter_row'] = function(block) {
  let value_children = dartGenerator.valueToCode(block, 'children', Order.NONE);
  let code = 'Row(\n';
  if (value_children) {
    code += '\t children: <Widget> ';
    if (value_children.startsWith("[")) {
      code += value_children + ',\n';
    } else {
      code += '[\n\t' + value_children + '],\n';
    }
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- Column GENERATOR --
dartGenerator.forBlock['flutter_column'] = function(block) {
  let value_children = dartGenerator.valueToCode(block, 'children', Order.NONE);
  let code = 'Column(\n';
  if (value_children) {
    code += '\t children: <Widget> ';
    if (value_children.startsWith("[")) {
      code += value_children + ',\n';
    } else {
      code += '[\n\t' + value_children + '],\n';
    }
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- ListView GENERATOR --
dartGenerator.forBlock['flutter_listview'] = function(block) {
  let value_children = dartGenerator.valueToCode(block, 'children', Order.NONE);
  let code = 'ListView(\n';
  if (value_children) {
    code += '\t children: <Widget> ';
    if (value_children.startsWith("[")) {
      code += value_children + ',\n';
    } else {
      code += '[\n\t' + value_children + '],\n';
    }
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- Icon GENERATOR --
dartGenerator.forBlock['flutter_icon'] = function(block) {
  let value_icon = dartGenerator.valueToCode(block, 'icon', Order.NONE);
  let value_color = dartGenerator.valueToCode(block, 'color', Order.ATOMIC);
  let value_size = dartGenerator.valueToCode(block, 'size', Order.ATOMIC);

  let code = 'Icon(\n';
  if (value_icon) {
    code += '\t' + value_icon + ',\n';
  }
  if (value_color) {
    // color will be something like #FF0000 or 0xFFFF0000
    // If it's #RRGGBB, convert to 0xFFRRGGBB
    // Make sure to handle slice logic carefully if it’s a hex string
    if (value_color.startsWith("#")) {
      code += '\t color: const Color(0xFF' + value_color.slice(1).toUpperCase() + '),\n';
    } else {
      code += '\t color: ' + value_color + ',\n';
    }
  }
  if (value_size) {
    code += '\t size: ' + value_size + ',\n';
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- Icons.* GENERATOR --
dartGenerator.forBlock['flutter_icons'] = function(block) {
  let text_constant = block.getFieldValue('constant');
  let code = "Icons." + text_constant;
  return [code, Order.NONE];
};

//
// -- Placeholder GENERATOR --
dartGenerator.forBlock['flutter_placeholder'] = function(block) {
  let colour_color = block.getFieldValue('color');
  let number_strokewidth = block.getFieldValue('strokeWidth');
  let number_fallbackwidth = block.getFieldValue('fallbackWidth');
  let number_fallbackheight = block.getFieldValue('fallbackHeight');

  // color could be "#FFFFFF" => remove '#' => "FFFFFF"
  let hexColor = colour_color ? colour_color.slice(1).toUpperCase() : '000000';

  let code = "Placeholder(\n";
  code += "\tcolor: const Color(0xFF" + hexColor + "),\n";
  code += "\tstrokeWidth: " + number_strokewidth + ",\n";
  code += "\tfallbackWidth: " + number_fallbackwidth + ",\n";
  code += "\tfallbackHeight: " + number_fallbackheight + ",\n";
  code += ")";
  return [code, Order.NONE];
};

//
// -- RaisedButton GENERATOR --
dartGenerator.forBlock['flutter_raised_button'] = function(block) {
  let value_child = dartGenerator.valueToCode(block, 'child', Order.ATOMIC);
  let statement_onPressed = dartGenerator.statementToCode(block, 'onPressed');

  let code = 'RaisedButton(\n';
  if (statement_onPressed.trim()) {
    code += '\t onPressed: () {\n' + statement_onPressed + '},\n';
  } else {
    code += '\t onPressed: null,\n';
  }
  if (value_child) {
    code += '\t child: ' + value_child + '\n';
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- FloatingActionButton GENERATOR --
dartGenerator.forBlock['flutter_fab'] = function(block) {
  let value_child = dartGenerator.valueToCode(block, 'child', Order.ATOMIC);
  let statement_onPressed = dartGenerator.statementToCode(block, 'onPressed');

  let code = 'FloatingActionButton(\n';
  if (statement_onPressed.trim()) {
    code += '\t onPressed: () {\n' + statement_onPressed + '},\n';
  } else {
    code += '\t onPressed: null,\n';
  }
  if (value_child) {
    code += '\t child: ' + value_child + ',\n';
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- StatelessWidget GENERATOR --
dartGenerator.forBlock['flutter_stateless_widget'] = function(block) {
  let text_classname = block.getFieldValue('classname');
  let value_content = dartGenerator.valueToCode(block, 'content', Order.NONE);

  let code = 'class ' + text_classname + ' extends StatelessWidget {\n' +
      '  @override\n' +
      '  Widget build(BuildContext context) {\n' +
      '    return ' + value_content + ';\n' +
      '  }\n' +
      '}\n';
  return code;
};

//
// -- StatefulWidget GENERATOR --
dartGenerator.forBlock['flutter_stateful_widget'] = function(block) {
  let text_classname = block.getFieldValue('classname');
  let value_content = dartGenerator.valueToCode(block, 'content', Order.NONE);
  let statement_lets = dartGenerator.statementToCode(block, 'lets');

  let code =
      'class ' + text_classname + ' extends StatefulWidget {\n' +
      '  @override\n' +
      '  _' + text_classname + 'State createState() => _' + text_classname + 'State();\n' +
      '}\n\n' +
      'class _' + text_classname + 'State extends State<' + text_classname + '> {\n' +
      statement_lets + '\n' +
      '  @override\n' +
      '  Widget build(BuildContext context) {\n' +
      '    return ' + value_content + ';\n' +
      '  }\n' +
      '}\n';
  return code;
};

//
// -- Create Instance GENERATOR --
dartGenerator.forBlock['flutter_create_instance'] = function(block) {
  let text_classname = block.getFieldValue('className');
  let code = text_classname + '()';
  return [code, Order.NONE];
};

//
// -- Container GENERATOR --
dartGenerator.forBlock['flutter_container'] = function(block) {
  let value_width = dartGenerator.valueToCode(block, 'width', Order.ATOMIC);
  let value_height = dartGenerator.valueToCode(block, 'height', Order.ATOMIC);
  let value_color = dartGenerator.valueToCode(block, 'color', Order.ATOMIC);
  let value_child = dartGenerator.valueToCode(block, 'child', Order.ATOMIC);

  let code = 'Container(\n';
  if (value_color) {
    // If the color is a hex string like "#FF0000", convert to 0xFF0000
    if (value_color.startsWith("#")) {
      code += '\t color: const Color(0xFF' + value_color.slice(1).toUpperCase() + '),\n';
    } else {
      code += '\t color: ' + value_color + ',\n';
    }
  }
  if (value_width) {
    code += '\t width: ' + value_width + ',\n';
  }
  if (value_height) {
    code += '\t height: ' + value_height + ',\n';
  }
  if (value_child) {
    code += '\t child: ' + value_child + ',\n';
  }
  code += ')';
  return [code, Order.NONE];
};

//
// -- setState(...) CALL GENERATOR --
dartGenerator.forBlock['flutter_set_state_call'] = function(block) {
  let statements_code = dartGenerator.statementToCode(block, 'code');
  let code = 'setState(() {\n' + statements_code + '\n});\n';
  return code;
};

//
// -- RAW INPUT (expressions) GENERATOR --
dartGenerator.forBlock['flutter_raw_input'] = function(block) {
  const code = block.getFieldValue('code');
  return [code, Order.ATOMIC];
};

//
// -- PROCEDURE (void) GENERATOR --
dartGenerator.forBlock['procedures_defnoreturn'] = function(block) {
  let funcName = block.getFieldValue('NAME');
  let branch = dartGenerator.statementToCode(block, 'STACK');
  branch = branch.replace(/\n/g, '\n\t');
  let code = `void ${funcName}() {\n\t${branch}\n}\n`;
  return code;
};

//
// -- PROCEDURE (return) GENERATOR --
dartGenerator.forBlock['procedures_defreturn'] = function(block) {
  let funcName = block.getFieldValue('NAME');
  let branch = dartGenerator.statementToCode(block, 'STACK');
  branch = branch.replace(/\n/g, '\n\t');
  let returnValue = dartGenerator.valueToCode(block, 'RETURN', Order.NONE) || '';
  let code = `\n${funcName}() {\n\t${branch}\n\treturn ${returnValue};\n}\n`;
  return code;
};


dartGenerator.forBlock['flutter_raw_statement'] = function(block) {
  return block.getFieldValue('code') + '\n';
};

