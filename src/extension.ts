import * as vscode from "vscode";
import Accentizer from "hunaccent";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "hungarian-accents.convertAccents",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage("No active text editor!");
        return;
      }

      const selection = editor.selection;
      const text = Accentizer.accentize(editor.document.getText(selection));

      editor.edit((editBuilder) => {
        editBuilder.replace(selection, text);
      });
    }
  );

  context.subscriptions.push(disposable);
}
