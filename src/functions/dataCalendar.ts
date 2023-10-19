
import { stringBrazilToDate } from "helper/convertData";
import { Tournament } from "models/Tournament";


function isInPeriodTime(dateInitial: string, dateFinal: string) {
    return stringBrazilToDate(dateInitial).getTime() <= dateDayActual().getTime()
        && dateDayActual().getTime() <= stringBrazilToDate(dateFinal).getTime();
}

export function isInPeriodRegistration(tournament: Tournament){
    const period = tournament.periodRegistration;
    return isInPeriodTime(period.dateInitial.text, period.dateFinal.text);
}

export function isInPeriodTournament(tournament: Tournament){
    return isInPeriodTime(tournament.periodRegistration.dateFinal.text, tournament.periodTournament.dateFinal.text);
}

export function dateDayActual(): Date{
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setDate(t.getDate());
    return t;
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