'use strict';

const vscode = require('vscode');
const { planDeletion } = require('./line-edit');

function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand('smartLineDelete.execute', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    if (editor.selections.length !== 1) {
      vscode.window.showInformationMessage('このコマンドはカーソルが1つのときに使用できます。');
      return;
    }
    const document = editor.document;
    const selection = editor.selection;
    const plan = planDeletion(document, selection.active.line);
    const position = ([line, character]) => new vscode.Position(line, character);
    const range = new vscode.Range(position(plan.start), position(plan.end));
    const success = await editor.edit(builder => builder.delete(range), {
      undoStopBefore: true,
      undoStopAfter: true
    });
    if (!success || editor.document !== document) return;
    const target = position(plan.cursor);
    editor.selection = new vscode.Selection(target, target);
    editor.revealRange(new vscode.Range(target, target), vscode.TextEditorRevealType.InCenterIfOutsideViewport);
  }));
}

module.exports = { activate };
