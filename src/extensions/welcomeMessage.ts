import { ExtensionContext, window, workspace } from "vscode";
import useDate from "../hooks/useDate";

export const welcomeMessage = (context: ExtensionContext) => {
    const enableMessage = workspace.getConfiguration().get<boolean>('pray-time.welcome-message.enabled');
    if(enableMessage) {
        let message = useDate();
        window.showInformationMessage(`Welcome to Pray Time Extension! Today is ${message}`);
    }
};