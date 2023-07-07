import { isDate, parse } from "date-fns";

export function convertData(date: Date): string{
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
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