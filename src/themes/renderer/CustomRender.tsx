import * as Blockly from "blockly/core";

class CustomRenderer extends Blockly.blockRendering.Renderer {
  constructor() {
    super();
  }
  makeConstants_() {
    return new CustomConstantProvider();
  }
}

class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
  getBlockBorderThickness() {
    return 10; // Adjust this value for your desired border size
  }
  constructor() {
    // Set up all the constants from the base provider.
    super();
    this.NOTCH_WIDTH = 40;
    this.NOTCH_HEIGHT = 6;
    this.CORNER_RADIUS = 15;

    // this is the left side puzzle thingy - the thingy that looks like ooms 
    this.TAB_HEIGHT = 30;
    this.TAB_WIDTH = 20;
    this.TAB_OFFSET_FROM_TOP = 6;

    this.MEDIUM_PADDING = 5;

    //top down puzzle notch thing -- width eka
    this.NOTCH_OFFSET_LEFT = 20;


    // this.JAGGED_TEETH = this.makeJaggedTeeth();
   
    // This is the tiny box with input that we see inside the blocks
    this.FIELD_BORDER_RECT_HEIGHT = 20;
    this.FIELD_BORDER_RECT_RADIUS = 5;
    this.FIELD_BORDER_RECT_X_PADDING = 20;

    // this is the puzzle female port
    this.EMPTY_INLINE_INPUT_PADDING = 50;
    this.EMPTY_INLINE_INPUT_HEIGHT = 40
    

    this.EMPTY_STATEMENT_INPUT_HEIGHT = 50
    this.FIELD_CHECKBOX_X_OFFSET = 5;

    //Dropdown colors
    this.FIELD_DROPDOWN_COLOURED_DIV = true
    
    // this.CURSOR_STROKE_WIDTH = 40;
  }

}

Blockly.blockRendering.register("custom_renderer", CustomRenderer);
