import moment from "moment";
import solarisJSON from "../db.json";

export interface DailyStats {
    date: string;
    aliveCount: number;
    deadCount: number;
    unknownCount: number;
}

export interface Creature {
    status: string;
    age: string;
    diet: string;
    taxonomy: string[];
    id: string;
}

export interface LastDaysCounts {
    aliveCount: number;
    deadCount: number;
    unknownCount: number;
}

export const solarisData = solarisJSON as Array<Array<any>>;

export function getTimeInterval(): string {
    let dateList: string[] = [];

    solarisData.forEach((item) => {
        dateList.push(moment(item[0]).format("DD.MM.YYYY"));
    })

    return `You are viewing data from ${dateList[0]} to ${dateList[dateList.length - 1]}`
}

export function getDailyStats(): DailyStats[] {
    let dailyStats: DailyStats[] = [];

    solarisData.forEach((dailyData: Array<any>) => {
        let date = moment(dailyData[0]).format("DD.MM.YYYY");

        let aliveCount = 0;
        let deadCount = 0;
        let unknownCount = 0;

        dailyData[1].forEach((creature: Creature) => {
            switch (creature.status) {
                case "alive":
                    aliveCount++;
                    break;
                case "dead":
                    deadCount++;
                    break;
                case "unknown":
                    unknownCount++;
                    break;
            }
        })

        let dailyDataObject: DailyStats = {
            date: date,
            aliveCount: aliveCount,
            deadCount: deadCount,
            unknownCount: unknownCount
        };

        dailyStats.push(dailyDataObject);
    })

    return dailyStats;
}

export function getLastSyncTime(): string {
    let dateList: string[] = [];

    solarisData.forEach((item) => {
        dateList.push(moment(item[0]).format("DD.MM.YYYY"));
    })

    return dateList[dateList.length - 1];
}

export function getLastDaysCounts(): LastDaysCounts {
    let lastDaysData: Creature[] = solarisData[solarisData.length - 1][1];

    let aliveCount = 0;
    let deadCount = 0;
    let unknownCount = 0;

    lastDaysData.forEach((creature) => {
        switch (creature.status) {
            case "alive":
                aliveCount++;
                break;
            case "dead":
                deadCount++;
                break;
            case "unknown":
                unknownCount++;
                break;
        }
    });

    let lastDaysCountsObject: LastDaysCounts = {
        aliveCount: aliveCount,
        deadCount: deadCount,
        unknownCount: unknownCount
    }

    return lastDaysCountsObject;
}

export function getTableDataByDate(): Creature[] {
    return solarisData[0][1];
}

export function capitalize(s): string {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}