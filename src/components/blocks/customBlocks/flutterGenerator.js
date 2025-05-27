import {dartGenerator, Order} from "blockly/dart";

const INDENT = '  ';

// All existing generator functions
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
    return App();
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

dartGenerator.forBlock['appBar'] = function(block) {
    let value_title = dartGenerator.valueToCode(block, 'title', Order.NONE);
    let code = 'AppBar(\n';
    if (value_title) {
        code += '\t title: ' + value_title + ',\n';
    }
    code += ')';
    return [code, Order.NONE];
};

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

dartGenerator.forBlock['flutter_icon'] = function(block) {
    let value_icon = dartGenerator.valueToCode(block, 'icon', Order.NONE);
    let value_color = dartGenerator.valueToCode(block, 'color', Order.ATOMIC);
    let value_size = dartGenerator.valueToCode(block, 'size', Order.ATOMIC);

    let code = 'Icon(\n';
    if (value_icon) {
        code += '\t' + value_icon + ',\n';
    }
    if (value_color) {
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

dartGenerator.forBlock['flutter_icons'] = function(block) {
    let text_constant = block.getFieldValue('constant');
    let code = "Icons." + text_constant;
    return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_placeholder'] = function(block) {
    let colour_color = block.getFieldValue('color');
    let number_strokewidth = block.getFieldValue('strokeWidth');
    let number_fallbackwidth = block.getFieldValue('fallbackWidth');
    let number_fallbackheight = block.getFieldValue('fallbackHeight');

    let hexColor = colour_color ? colour_color.slice(1).toUpperCase() : '000000';

    let code = "Placeholder(\n";
    code += "\tcolor: const Color(0xFF" + hexColor + "),\n";
    code += "\tstrokeWidth: " + number_strokewidth + ",\n";
    code += "\tfallbackWidth: " + number_fallbackwidth + ",\n";
    code += "\tfallbackHeight: " + number_fallbackheight + ",\n";
    code += ")";
    return [code, Order.NONE];
};

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

dartGenerator.forBlock['flutter_stateful_widget'] = function(block) {
    let text_classname = block.getFieldValue('classname');
    let value_content = dartGenerator.valueToCode(block, 'content', Order.NONE);
    let statement_lets = dartGenerator.statementToCode(block, 'Variables');

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

dartGenerator.forBlock['flutter_create_instance'] = function(block) {
    let text_classname = block.getFieldValue('className');
    let code = text_classname + '()';
    return [code, Order.NONE];
};

dartGenerator.forBlock['flutter_container'] = function(block) {
    let value_width = dartGenerator.valueToCode(block, 'width', Order.ATOMIC);
    let value_height = dartGenerator.valueToCode(block, 'height', Order.ATOMIC);
    let value_color = dartGenerator.valueToCode(block, 'color', Order.ATOMIC);
    let value_child = dartGenerator.valueToCode(block, 'child', Order.ATOMIC);

    let code = 'Container(\n';
    if (value_color) {
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

dartGenerator.forBlock['flutter_set_state_call'] = function(block) {
    let statements_code = dartGenerator.statementToCode(block, 'code');
    let code = 'setState(() {\n' + statements_code + '\n});\n';
    return code;
};

dartGenerator.forBlock['flutter_raw_input'] = function(block) {
    const code = block.getFieldValue('code');
    return [code, Order.ATOMIC];
};

dartGenerator.forBlock['flutter_raw_statement'] = function(block) {
    return block.getFieldValue('code') + '\n';
};

dartGenerator.forBlock['procedures_defnoreturn'] = function(block) {
    let funcName = block.getFieldValue('NAME');
    let branch = dartGenerator.statementToCode(block, 'STACK');
    branch = branch.replace(/\n/g, '\n\t');
    let code = `void ${funcName}() {\n\t${branch}\n}\n`;
    return code;
};

dartGenerator.forBlock['procedures_defreturn'] = function(block) {
    let funcName = block.getFieldValue('NAME');
    let branch = dartGenerator.statementToCode(block, 'STACK');
    branch = branch.replace(/\n/g, '\n\t');
    let returnValue = dartGenerator.valueToCode(block, 'RETURN', Order.NONE) || '';
    let code = `\n${funcName}() {\n\t${branch}\n\treturn ${returnValue};\n}\n`;
    return code;
};

// Export function for LLM context
export const getFlutterGeneratorsInfo = () => {
    return {
        codeExamples: {
            flutter_center: {
                description: "Centers a child widget in the available space",
                dartCode: "Center(\n  child: Text('Centered Content'),\n)",
                usage: "Use when you want to center content on screen or within a parent widget"
            },
            scaffold: {
                description: "Basic material design layout structure",
                dartCode: "Scaffold(\n  appBar: AppBar(title: Text('My App')),\n  body: Center(child: Text('Hello World')),\n  floatingActionButton: FloatingActionButton(child: Icon(Icons.add)),\n)",
                usage: "Use as the main structure for Flutter screens - provides appBar, body, and FAB slots"
            },
            flutter_text: {
                description: "Displays text with a single style",
                dartCode: "Text('Hello World')",
                usage: "Use to display any text content - can be styled with TextStyle"
            },
            flutter_row: {
                description: "Arranges children horizontally",
                dartCode: "Row(\n  children: <Widget>[\n    Text('Left'),\n    Text('Right'),\n  ],\n)",
                usage: "Use to arrange widgets side by side horizontally"
            },
            flutter_column: {
                description: "Arranges children vertically",
                dartCode: "Column(\n  children: <Widget>[\n    Text('Top'),\n    Text('Bottom'),\n  ],\n)",
                usage: "Use to arrange widgets in a vertical stack"
            },
            flutter_container: {
                description: "Styling and positioning wrapper widget",
                dartCode: "Container(\n  width: 100,\n  height: 100,\n  color: Colors.blue,\n  child: Text('Content'),\n)",
                usage: "Use to add padding, margins, colors, decorations, and constraints to child widgets"
            },
            flutter_raised_button: {
                description: "Material design raised button (deprecated)",
                dartCode: "RaisedButton(\n  onPressed: () {\n    // Handle button press\n  },\n  child: Text('Click Me'),\n)",
                usage: "Use for primary actions (note: deprecated, use ElevatedButton instead)"
            },
            flutter_fab: {
                description: "Floating action button for primary actions",
                dartCode: "FloatingActionButton(\n  onPressed: () {\n    // Handle FAB press\n  },\n  child: Icon(Icons.add),\n)",
                usage: "Use for the primary action in your app - typically placed in Scaffold"
            }
        },
        commonPatterns: [
            {
                name: "Basic App Structure",
                description: "Standard Flutter app with AppBar and centered content",
                blocks: ["scaffold", "appBar", "flutter_center", "flutter_text"],
                dartCode: "Scaffold(\n  appBar: AppBar(title: Text('My App')),\n  body: Center(child: Text('Hello World')),\n)"
            },
            {
                name: "Vertical List Layout",
                description: "Column of items with consistent spacing",
                blocks: ["flutter_column", "flutter_container", "flutter_text"],
                dartCode: "Column(\n  children: [\n    Container(child: Text('Item 1')),\n    Container(child: Text('Item 2')),\n  ],\n)"
            },
            {
                name: "Horizontal Button Row",
                description: "Row of buttons for multiple actions",
                blocks: ["flutter_row", "flutter_raised_button", "flutter_text"],
                dartCode: "Row(\n  children: [\n    RaisedButton(child: Text('Cancel')),\n    RaisedButton(child: Text('OK')),\n  ],\n)"
            },
            {
                name: "Card-like Container",
                description: "Styled container with content",
                blocks: ["flutter_container", "flutter_column", "flutter_text"],
                dartCode: "Container(\n  padding: EdgeInsets.all(16),\n  decoration: BoxDecoration(borderRadius: BorderRadius.circular(8)),\n  child: Column(children: [Text('Title'), Text('Content')]),\n)"
            }
        ],
        tips: {
            layout: "Use Row for horizontal layouts, Column for vertical. Wrap with Container for styling.",
            interaction: "Always provide onPressed handlers for buttons. Use FAB for primary actions.",
            structure: "Start with Scaffold as the base, add AppBar for navigation, use body for main content.",
            nesting: "Widgets can be nested - put Text inside Buttons, Buttons inside Rows, etc."
        }
    };
};