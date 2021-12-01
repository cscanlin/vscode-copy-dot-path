// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const path = require('path');
const vscode = require('vscode');

function activate(context) {

    const contextURIToClipboard = (clipboardContent) => {
        // https://github.com/rioj7/context-menu-extra/blob/master/extension.js#L23
        const command = uri => {
            if (uri === undefined) {
                const editor = vscode.window.activeTextEditor;
                if (!editor) { return errorMessage('No editor'); }
                uri = editor.document.uri;
            }
            vscode.env.clipboard.writeText(clipboardContent(uri)).then(v => v, v => null);
        };
        return command;
    };

    let disposable = vscode.commands.registerCommand(
        'vscode-copy-dot-path.copy_dot_path',
        contextURIToClipboard(uri => {
            relativePath = path.relative(vscode.workspace.workspaceFolders[0].uri.path, uri.path)
            parsedPath = path.parse(relativePath)
            pathWithoutExtension = path.join(parsedPath.dir, parsedPath.name)
            return pathWithoutExtension.replaceAll(path.sep, '.');
        })
    );

    context.subscriptions.push(disposable);

}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
