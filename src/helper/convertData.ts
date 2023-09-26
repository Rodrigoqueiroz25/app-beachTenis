

export function convertDateBrazilToString(date: Date): string{
    return `${date.getDate()}/${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}/${date.getFullYear()}`;
}

export function convertDateAmericanToString(date: Date): string{
    return `${date.getFullYear()}-${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate()}`;
}

export function stringToDate(str: string){
    let date = new Date(str.concat('T00:00:00'));
    if(!isNaN(date.getTime())){
        return date;
    }
}

export function americanDateString(date: string){
    return date?.split('/').reverse().join('-');
}

export function stringBrazilToDate(str: string){
    let strr = americanDateString(str);
    let date = new Date(strr?.concat('T00:00:00'));
    // if(!isNaN(date.getTime())){
        return date;
    // }
}

export function dateDayActual(): Date{
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setDate(t.getDate());
    return t;
}



export function brazilDateString(date: string){
    return date?.split('-').reverse().join('/');
}

export function calcAgeFromDate(date: string): number{
    let dateBirthday = new Date(date).getTime();
    let dateToday = dateDayActual().getTime();
    return Math.floor((dateToday - dateBirthday) / (365.25 * 24 * 60 * 60 * 1000));
}


export function dateFollowingDay(): Date{
    let date = dateDayActual();
    return new Date(`${date.getFullYear()}-${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate() + 1}`);
}