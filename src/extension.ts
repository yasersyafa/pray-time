import * as vscode from 'vscode';
import { welcomeMessage } from './extensions/welcomeMessage';
import { registerStatusBar } from './extensions/statusBar';
import { registerWebViewProvider } from './views/PrayScheduleView';
import { showConfirmationMessage } from './extensions/confirmationMessage';

let activeContext: vscode.ExtensionContext | null = null;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	activeContext = context;
	console.log('Extension active...');
	const op = vscode.window.createOutputChannel('PrayTime');
	registerWebViewProvider(context, op);
	registerStatusBar(context);
	welcomeMessage(context);

	const handleChangeSettingValue = vscode.workspace.onDidChangeConfiguration((event) => {
		if(event.affectsConfiguration('pray-time.welcome-message.city') || event.affectsConfiguration('pray-time.welcome-message.enabled')) {
			reactivate();
		}

	});
	context.subscriptions.push(handleChangeSettingValue);

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { 
	activeContext = null;
	console.log('Extension deactivate');	
}

// method restard extension
export function reactivate() {
	if(activeContext) {
		deactivate();
		activate(activeContext);
	}
}
