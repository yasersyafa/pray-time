import axios from "axios";


export interface PrayerTimes {
    [key: string]: string,
    fajr: string,
    dhuhr: string,
    asr: string,
    maghrib: string,
    isha: string
}

export const ApiService = async (city: string, country: string) : Promise<PrayerTimes | null> => {
    try {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity`, {
            params: {
                city: city,
                country: country
            }
        });
        if (response.data && response.data.data && response.data.data.timings) {
            const timings = response.data.data.timings;
            return {
                fajr: timings.Fajr,
                dhuhr: timings.Dhuhr,
                asr: timings.Asr,
                maghrib: timings.Maghrib,
                isha: timings.Isha,
            };
        }
    } catch(error) {
        console.error(`error fetching: ${error}`);
    }
    return null;
};