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

export interface SelectedDaysCounts {
    aliveCount: number;
    deadCount: number;
    unknownCount: number;
}

export interface DateSelectOption {
    date: string;
    parsedDate: string;
}

export const solarisData = solarisJSON as Array<Array<any>>;

export function getDateOptions(): DateSelectOption[] {
    let dateList: DateSelectOption[] = [];

    solarisData.forEach((item) => {
        dateList.push({ date: item[0], parsedDate: moment(item[0]).format("DD.MM.YYYY") });
    })

    return dateList;
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

export function getSelectedDaysCounts(selectedDate: string): SelectedDaysCounts {
    
    let aliveCount = 0;
    let deadCount = 0;
    let unknownCount = 0;

    solarisData.forEach((dailyData: Array<any>) => {
        if (dailyData[0] === selectedDate) {
            let creatureList: Creature[] = dailyData[1];
            creatureList.forEach((creature: Creature) => {
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
        }
    })

    let statsObject: SelectedDaysCounts = {
        aliveCount: aliveCount,
        deadCount: deadCount,
        unknownCount: unknownCount
    }

    return statsObject;
}

export function getTableDataByDate(selectedDate: string): Creature[] {
    let tableData: Creature[] = [];
    solarisData.forEach((dailyData: Array<any>) => {
        if (dailyData[0] === selectedDate) {
            tableData = dailyData[1];
        }
    })
    return tableData;
}

export function capitalize(s): string {
    if (typeof s !== 'string') {
        return "";
    } else {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}