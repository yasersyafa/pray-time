import { ExtensionContext, StatusBarAlignment, StatusBarItem, window, workspace } from "vscode";
import { ApiService } from "./ApiService";
import useLocalization from "../hooks/useLocalization";
import { formatCountdown, getNextPrayerTimes } from "../hooks/useTimer";

let timerInterval: NodeJS.Timeout | undefined;

const statusBar = async () => {
    const statusBar =  window.createStatusBarItem(StatusBarAlignment.Left, 1);
    statusBar.show();
    statusBar.text = `Fetching data...`;
    const getCity = workspace.getConfiguration().get<string>('pray-time.welcome-message.city');
    if(getCity) {
        const getCountry = useLocalization(getCity);
        const prayerTimes = await ApiService(getCity, getCountry);
        if(prayerTimes) {
            startCountdownTimer(prayerTimes, statusBar);
        }else {
            console.error('error fetching data');
        }
    }
};

const startCountdownTimer = (prayerTimes: {[key: string] : string}, statusBarItem: StatusBarItem) => {
    if(timerInterval) {
        clearInterval(timerInterval);
    }

    let nextPrayerTime = getNextPrayerTimes(prayerTimes);

    timerInterval = setInterval(() => {
        const now = new Date();
        if (!nextPrayerTime) {
            statusBarItem.text = "Next Sholat: Waiting for new day...";
            nextPrayerTime = getNextPrayerTimes(prayerTimes);
            return;
        }

        const diff = Math.floor((nextPrayerTime.getTime() - now.getTime()) / 1000);

        if (diff <= 0) {
            statusBarItem.text = "Time for Sholat!";
            window.showInformationMessage("Waktunya sholat!");
            clearInterval(timerInterval);
            nextPrayerTime = getNextPrayerTimes(prayerTimes);
        } else {
            statusBarItem.text = `Next Sholat in: ${formatCountdown(diff)}`;
        }
    }, 1000);
};


export const registerStatusBar = (context: ExtensionContext) => {
    statusBar();
};