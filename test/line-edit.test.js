'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { planDeletion } = require('../line-edit');

const cases = [
  ['middle line', 'alpha\nbeta\ngamma', 1, 'alpha\ngamma', [0, 5]],
  ['first line', 'alpha\nbeta', 0, 'beta', [0, 0]],
  ['final line', 'alpha\nbeta', 1, 'alpha', [0, 5]],
  ['single line', 'alpha', 0, '', [0, 0]],
  ['empty document', '', 0, '', [0, 0]],
  ['empty middle line', 'alpha\n\ngamma', 1, 'alpha\ngamma', [0, 5]],
  ['trailing empty line', 'alpha\n', 1, 'alpha', [0, 5]],
  ['empty previous line', '\nbeta\ngamma', 1, '\ngamma', [0, 0]],
  ['CRLF middle', 'alpha\r\nbeta\r\ngamma', 1, 'alpha\r\ngamma', [0, 5]],
  ['CRLF final', 'alpha\r\nbeta', 1, 'alpha', [0, 5]],
  ['Unicode previous line', '日本語😀\nbeta', 1, '日本語😀', [0, 5]],
  ['long wrapped logical line', 'alpha\n' + 'x'.repeat(1000) + '\ngamma', 1, 'alpha\ngamma', [0, 5]]
];

for (const [name, input, line, expected, cursor] of cases) {
  test(name, () => {
    const lines = input.split(/\r?\n/);
    const eol = input.includes('\r\n') ? '\r\n' : '\n';
    const document = { lineCount: lines.length, lineAt: i => ({ text: lines[i] }) };
    const plan = planDeletion(document, line);
    const offset = ([i, column]) => lines.slice(0, i).reduce((n, text) => n + text.length + eol.length, 0) + column;
    assert.equal(input.slice(0, offset(plan.start)) + input.slice(offset(plan.end)), expected);
    assert.deepEqual(plan.cursor, cursor);
  });
}
