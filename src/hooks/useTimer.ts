
export const getNextPrayerTimes = (prayerTimes: {[key: string] : string}) : Date | null => {
    
    let nextPrayerTime: Date | null = null;
    const now = new Date();
    const prayerNames = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    for (const prayerName of prayerNames) {
        const timeString = prayerTimes[prayerName];
        if (timeString) {
            // Buat objek Date untuk waktu sholat
            const [hours, minutes] = timeString.split(":").map(Number);
            const prayerTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hours,
                minutes,
                0
            );

            // Jika waktu sholat lebih besar dari waktu sekarang
            if (prayerTime > now) {
                nextPrayerTime = prayerTime;
                break; // Temukan waktu sholat berikutnya
            }
        }
    }

    // Jika tidak ada waktu sholat berikutnya hari ini, kembalikan null
    return nextPrayerTime;

};

export const formatCountdown = (diffInSeconds: number) : string => {
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
};
