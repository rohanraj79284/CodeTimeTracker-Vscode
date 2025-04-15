const vscode = require('vscode');
const { startTracking, stopTracking } = require('./tracker/fileTracker');  // Import the fileTracker module

function activate(context) {
  console.log('CodeTimeTracker Extension Activated!');
  
  // Automatically start tracking when VS Code is launched or when a file is opened
  if (vscode.window.activeTextEditor) {
    startTracking(vscode.window.activeTextEditor.document.fileName);
  }

  // Register the 'startTracking' command
  let startTrackingCommand = vscode.commands.registerCommand('extension.startTracking', () => {
    if (vscode.window.activeTextEditor) {
      startTracking(vscode.window.activeTextEditor.document.fileName);
      vscode.window.showInformationMessage('Started tracking!');
    }
  });

  // Register the 'stopTracking' command
  let stopTrackingCommand = vscode.commands.registerCommand('extension.stopTracking', () => {
    stopTracking();
    vscode.window.showInformationMessage('Stopped tracking!');
  });

  // Track file activity when the active text editor changes
  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor && editor.document) {
      startTracking(editor.document.fileName);
    } else {
      stopTracking();
    }
  });

  // Stop tracking when a text document is closed
  vscode.workspace.onDidCloseTextDocument(() => stopTracking());

  // Push the stopTracking function to subscriptions, so it gets called on extension deactivation
  context.subscriptions.push(startTrackingCommand);
  context.subscriptions.push(stopTrackingCommand);
  context.subscriptions.push({ dispose: stopTracking });
}

function deactivate() {
  stopTracking();
}

module.exports = {
  activate,
  deactivate
};
