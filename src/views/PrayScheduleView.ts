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

    resolveWebviewView(webviewView: WebviewView) {
        this.view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        
        this.updateWebviewContent(webviewView.webview);
        // webviewView.webview.html = this._getHtmlForWebView(webviewView.webview);
    }

    async updateWebviewContent(webview: Webview) {
      const city = workspace.getConfiguration().get<string>("pray-time.welcome-message.city") ?? "Jakarta";
      
      const country = useLocalization(city);
      const prayerTimes = await ApiService(city, country);
      
      if (prayerTimes) {
        webview.html = this.generateHtml(city, prayerTimes);
      } else {
        webview.html = `<h1>Error fetching prayer times. Please check your configuration.</h1>`;
      }
    }

    private generateHtml(city: string, prayerTimes: { [key: string]: string }) {
        return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pray Schedule</title>
          </head>
          <body>
            <h1>${city} Pray Schedule</h1>
            <ol>
              <li><strong>Fajr</strong>: ${prayerTimes.fajr}</li>
              <li><strong>Dhuhr</strong>: ${prayerTimes.dhuhr}</li>
              <li><strong>Asr</strong>: ${prayerTimes.asr}</li>
              <li><strong>Maghrib</strong>: ${prayerTimes.maghrib}</li>
              <li><strong>Isha</strong>: ${prayerTimes.isha}</li>
            </ol>
          </body>`;
    }
}