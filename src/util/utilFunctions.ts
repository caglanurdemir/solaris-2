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

const solarisData = solarisJSON as Array<Array<any>>;

export function getTimeInterval(): string {
    let dateList: string[] = [];

    solarisData.forEach((item) => {
        dateList.push(moment(item[0]).format("DD-MM-YYYY"));
    })

    return `You are viewing data from ${dateList[0]} to ${dateList[dateList.length - 1]}`
}

export function getDailyStats(): DailyStats[] {
    let dailyStats: DailyStats[] = [];

    solarisData.forEach((dailyData: Array<any>) => {
        let date = moment(dailyData[0]).format("DD-MM-YYYY");

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