import { isDate, parse } from "date-fns";

export function convertData(date: Date): string{
    return `${date.getDate()}/${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}/${date.getFullYear()}`;
}


export function parseDateString(value: any, originalValue: any){
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());
    return parsedDate;
}

// dd/mm/yyyy
export function stringToDate(str: string){
    let date = new Date(str.split('/').reverse().join('-').concat('T00:00:00'));
    if(!isNaN(date.getTime())){
        return date;
    }
}

export function stringToDate2(str: string){
    let date = new Date(str.concat('T00:00:00'));
    if(!isNaN(date.getTime())){
        return date;
    }
}

export function dateDayActual(): Date{
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setDate(t.getDate());
    return t;
}

export function americanDateString(date: string){
    return date.split('/').reverse().join('-');
}

export function brazilDateString(date: string){
    return date.split('-').reverse().join('/');
}

export function calcAgeFromDate(date: string): number{
    let dateBirthday = new Date(date).getTime();
    let dateToday = dateDayActual().getTime();
    return Math.floor((dateToday - dateBirthday) / (365.25 * 24 * 60 * 60 * 1000));
}