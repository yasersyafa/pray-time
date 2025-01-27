import { ExtensionContext, window, workspace } from "vscode";

export const welcomeMessage = (context: ExtensionContext) => {
    const enableMessage = workspace.getConfiguration().get<boolean>('pray-time.welcome-message.enabled');
    if(enableMessage) {
        let city = workspace.getConfiguration().get<string>('pray-time.welcome-message.city');
        window.showInformationMessage(`Hello ${city || 'You'} Welcome to Pray Time Extension!`);
    }
};