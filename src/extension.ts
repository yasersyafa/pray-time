import * as vscode from 'vscode';
import { welcomeMessage } from './extensions/welcomeMessage';
import { registerStatusBar } from './extensions/statusBar';
import { registerWebViewProvider } from './views/PrayScheduleView';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const op = vscode.window.createOutputChannel('PrayTime');
	registerWebViewProvider(context, op);
	registerStatusBar(context);
	welcomeMessage(context);


	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
