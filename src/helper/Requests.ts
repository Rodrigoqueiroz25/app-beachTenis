import { HTTPMETHODS } from "constants/httpMethods"
import { ICategory } from "interfaces/ICategory";
import { IDataLogin } from "interfaces/IDataLogin"
import { IDataSignUp } from "interfaces/IDataSignUp";
import { IRequest } from "interfaces/IRequest"
import { IFormTournament } from "interfaces/ITournament";
import { ITournamentSponsor } from "interfaces/ITournamentSponsor";
import { IUserAccount } from "interfaces/IUserAccount";


export class Requests {

    public static login(data: IDataLogin): IRequest<IDataLogin>{
        return {
            method: HTTPMETHODS.POST,
            body: data,
            url: '/login'
        }
    }

    public static signup(data: IDataSignUp): IRequest<IDataSignUp>{
        return {
            method: HTTPMETHODS.POST,
            body: data,
            url: '/signup'
        }
    }

    public static updateUser(data: IUserAccount, param: string, cookie: string): IRequest<IUserAccount>{
        return {
            method: HTTPMETHODS.PUT,
            cookie: cookie,
            body: data,
            url: `/account/${param}`
        }
    }

    public static getUserByToken(cookie: string): IRequest{
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/account/loadByToken`
        }
    }

    public static getCategories(param: string, cookie: string): IRequest{
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/category/loadByTournament?tournamentId=${param}`
        }
    }
    
    public static createCategory(data: ICategory, cookie: string): IRequest<ICategory> {
        return {
            method: HTTPMETHODS.POST,
            cookie: cookie,
            body: data,
            url: '/category'
        }
    }

    public static updateCategory(data: ICategory, param: string, cookie: string): IRequest<ICategory> {
        return {
            method: HTTPMETHODS.PUT,
            cookie: cookie,
            body: data,
            url: `/category/${param}`
        }
    }

    public static deleteCategory(param: string, cookie: string): IRequest {
        return {
            method: HTTPMETHODS.DELETE,
            cookie: cookie,
            url: `/category/${param}`
        }
    }

    public static createSport(data: { description: string }, cookie: string): IRequest<{ description: string }> {
        return {
            method: HTTPMETHODS.POST,
            cookie: cookie,
            body: data,
            url: `/sport`
        }       
    }

    public static getSports(cookie: string): IRequest {
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/sports`
        }       
    }
    
    public static getCities(cookie: string): IRequest {
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/cities`
        }       
    }
    
    public static createTournament(data: IFormTournament, cookie: string): IRequest<IFormTournament> {
        return {
            method: HTTPMETHODS.POST,
            body: data,
            cookie: cookie,
            url: `/tournament`
        }       
    }

    public static editTournament(data: IFormTournament, param: string, cookie: string): IRequest<IFormTournament> {
        return {
            method: HTTPMETHODS.PUT,
            body: data,
            cookie: cookie,
            url: `/tournament/${param}`
        }       
    }

    public static getTournaments(cookie: string): IRequest {
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/tournaments`
        }       
    }

    public static getTournament(param: string, cookie: string): IRequest {
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/tournament/loadById?id=${param}`
        }       
    }

    public static deleteTournament(param: number, cookie: string): IRequest {
        return {
            method: HTTPMETHODS.DELETE,
            cookie: cookie,
            url: `/tournament/${param}`
        }       
    }

    public static createTournamentSponsor(data: ITournamentSponsor, cookie: string): IRequest<ITournamentSponsor> {
        return {
            method: HTTPMETHODS.POST,
            body: data,
            cookie: cookie,
            url: `/tournament-sponsor`
        }       
    }

    public static editTournamentSponsor(data: ITournamentSponsor, param: string, cookie: string): IRequest<ITournamentSponsor> {
        return {
            method: HTTPMETHODS.PUT,
            body: data,
            cookie: cookie,
            url: `/tournament-sponsor/${param}`
        }       
    }

    public static getTournamentSponsors(param: string, cookie: string): IRequest {
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/tournament-sponsor/load-by-tournament?tournamentId=${param}`
        }       
    }

    public static deleteTournamentSponsor(param: string, cookie: string): IRequest {
        return {
            method: HTTPMETHODS.DELETE,
            cookie: cookie,
            url: `/tournament-sponsor/${param}`
        }       
    }


}