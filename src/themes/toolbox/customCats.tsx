import * as Blockly from "blockly/core";

class CustomCategory extends Blockly.ToolboxCategory {
  constructor(categoryDef: any, toolbox: any, opt_parent: any) {
    super(categoryDef, toolbox, opt_parent);
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory,
  true
);

export default CustomCategory;
