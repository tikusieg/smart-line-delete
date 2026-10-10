'use strict';

// Coordinates refer to logical document lines, independent of word wrapping.
function planDeletion(document, line) {
  const last = document.lineCount - 1;
  const previousEnd = line > 0 ? document.lineAt(line - 1).text.length : 0;
  let start;
  let end;
  if (line < last) {
    start = [line, 0];
    end = [line + 1, 0];
  } else if (line > 0) {
    // Include the preceding newline when removing the final line.
    start = [line - 1, previousEnd];
    end = [line, document.lineAt(line).text.length];
  } else {
    start = [0, 0];
    end = [0, document.lineAt(0).text.length];
  }
  return { start, end, cursor: line > 0 ? [line - 1, previousEnd] : [0, 0] };
}

module.exports = { planDeletion };
