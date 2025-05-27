import 'blockly/blocks';

export const commonCategory = {
  kind: 'category',
  name: 'Logic',
  colour: '#3498db',
  contents: [
    {
      kind: 'block',
      type: 'controls_if',
    },
    {
      kind: 'block',
      type: 'logic_compare',
    },
    {
      kind: 'block',
      type: 'logic_operation',
    },
    {
      kind: 'block',
      type: 'logic_negate',
    },
    {
      kind: 'block',
      type: 'logic_boolean',
    },
    {
      kind: 'block',
      type: 'logic_null',
    },
    {
      kind: 'block',
      type: 'logic_ternary',
    },
  ],
};

export const loopsCategory = {
  kind: 'category',
  name: 'Loops',
  colour: '#2ecc71',
  contents: [
    {
      kind: 'block',
      type: 'controls_repeat_ext',
      inputs: {
        TIMES: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 10,
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'controls_whileUntil',
    },
    {
      kind: 'block',
      type: 'controls_for',
      inputs: {
        FROM: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1,
            },
          },
        },
        TO: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 10,
            },
          },
        },
        BY: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1,
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'controls_forEach',
    },
    {
      kind: 'block',
      type: 'controls_flow_statements',
    },
  ],
};

export const variablesCategory = {
  kind: 'category',
  name: 'Variables',
  colour: '#e74c3c',
  custom: 'VARIABLE',
};

export const textCategory = {
  kind: 'category',
  name: 'Text',
  colour: '#008080',
  contents: [
    { kind: 'block', type: 'text' },
    { kind: 'block', type: 'text_multiline' },
    { kind: 'block', type: 'text_join' },
    { kind: 'block', type: 'text_create_join_container' },
    { kind: 'block', type: 'text_create_join_item' },
    { kind: 'block', type: 'text_append' },
    { kind: 'block', type: 'text_length' },
    { kind: 'block', type: 'text_isEmpty' },
    { kind: 'block', type: 'text_indexOf' },
    { kind: 'block', type: 'text_charAt' },
    { kind: 'block', type: 'text_getSubstring' },
    { kind: 'block', type: 'text_changeCase' },
    { kind: 'block', type: 'text_trim' },
    { kind: 'block', type: 'text_count' },
    { kind: 'block', type: 'text_replace' },
    { kind: 'block', type: 'text_reverse' },
    { kind: 'block', type: 'text_prompt_ext' },
  ],
};

export const functionCategory = {
  kind: 'category',
  name: 'Function',
  colour: '#783fa1',
  contents: [
    { kind: 'block', type: 'procedures_defnoreturn' },
    { kind: 'block', type: 'procedures_defreturn' },
    { kind: 'block', type: 'procedures_ifreturn' },
  ],
};

export const colorCategory = {
  kind: 'category',
  name: 'Colours',
  colour: '#75604a',
  contents: [
    { kind: 'block', type: 'colour_random' },
    { kind: 'block', type: 'colour_picker' },
    { kind: 'block', type: 'colour_rgb' },
    { kind: 'block', type: 'colour_blend' },
  ],
};

export const listCategory = {
  kind: 'category',
  name: 'List',
  colour: '#800080',
  contents: [
    { kind: 'block', type: 'lists_create_with' },
    { kind: 'block', type: 'lists_repeat' },
    { kind: 'block', type: 'lists_length' },
    { kind: 'block', type: 'lists_isEmpty' },
    { kind: 'block', type: 'lists_sort' },
    { kind: 'block', type: 'lists_reverse' },
    { kind: 'block', type: 'lists_indexOf' },
    { kind: 'block', type: 'lists_setIndex' },
    { kind: 'block', type: 'lists_split' },
  ],
};

export const mathCategory = {
  kind: 'category',
  name: 'Math',
  colour: '#600000',
  contents: [
    { kind: 'block', type: 'math_number' },
    { kind: 'block', type: 'math_arithmetic' },
    { kind: 'block', type: 'math_single' },
    { kind: 'block', type: 'math_trig' },
    { kind: 'block', type: 'math_constant' },
    { kind: 'block', type: 'math_number_property' },
    { kind: 'block', type: 'math_round' },
    { kind: 'block', type: 'math_on_list' },
    { kind: 'block', type: 'math_modulo' },
    { kind: 'block', type: 'math_constrain' },
    { kind: 'block', type: 'math_random_int' },
    { kind: 'block', type: 'math_random_float' },
  ],
};