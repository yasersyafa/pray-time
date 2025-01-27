import { ExtensionContext, window } from "vscode";
import { reactivate } from "../extension";

export const showConfirmationMessage = (context: ExtensionContext, message: string) => {
    window.showInformationMessage(
        message,
        "Ok",
    )
    .then((choice) => choice === "Ok" ? reactivate() : reactivate());
};