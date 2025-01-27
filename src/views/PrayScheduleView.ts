import { CancellationToken, ExtensionContext, OutputChannel, Uri, Webview, WebviewView, WebviewViewProvider, WebviewViewResolveContext, window, workspace } from "vscode";
import { ApiService } from "../extensions/ApiService";
import useLocalization from "../hooks/useLocalization";

export const registerWebViewProvider = (context: ExtensionContext, op: OutputChannel) => {
    const provider = new SideBarWebViewProvider(context.extensionUri, context);
    context.subscriptions.push(window.registerWebviewViewProvider('pray-time-sidear-panel', provider));
};

export class SideBarWebViewProvider implements WebviewViewProvider {
    constructor(private readonly _extensionUri: Uri, public extensionContext: ExtensionContext) {}
    view?: WebviewView;

    resolveWebviewView(webviewView: WebviewView, context: WebviewViewResolveContext, token: CancellationToken) {
        this.view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebView(webviewView.webview);
    }

    private _getHtmlForWebView(webView: Webview) {
        const location = workspace.getConfiguration().get<string>('pray-time.welcome-message.city') ?? 'Jakarta';
        const country = useLocalization(location);


        return `<!DOCTYPE html>
        <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Pray Schedule</title>
            </head>
            <body>
              <h1>${location} Pray Schedule</h1>
              <ul>
                <ol><strong>Fajr</strong>: </ol>
                <ol><strong>Dhuhr</strong>: </ol>
                <ol><strong>Asr</strong>: </ol>
                <ol><strong>Maghrib</strong>: </ol>
                <ol><strong>Isha</strong>: </ol>
              </ul>
            </body>`;
    }
}