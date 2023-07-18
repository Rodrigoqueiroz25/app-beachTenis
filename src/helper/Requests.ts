import { HTTPMETHODS } from "@/constants/httpMethods"
import { ICategory } from "@/interfaces/ICategory";
import { IDataLogin } from "@/interfaces/IDataLogin"
import { IDataSignUp } from "@/interfaces/IDataSignUp";
import { IRequest } from "@/interfaces/IRequest"
import { IFormTournament } from "@/interfaces/ITournament";
import { ITournamentSponsor } from "@/interfaces/ITournamentSponsor";
import { IUserAccount } from "@/interfaces/IUserAccount";
import { IUserAccountUpdate } from "@/interfaces/IUserAccountUpdate";

// export enum Request {
//     login = 'login',
//     signup = 'signup',
//     updateUser = 'updateUser',

//     getCategories = 'getCategories',
//     createCategory = 'createCategory',
//     updateCategory = 'updateCategory',
//     deleteCategory = 'deleteCategory',

//     createSport = 'createSport',
//     getSports = 'getSports',

//     getCities = 'getCities',

//     createTournament = 'createTournament',
//     getTournaments = 'getTournaments',
//     deleteTournament = 'deleteTournament',

//     createTournamentSponsor = 'createTournamentSponsor',
//     getTournamentsSponsor = 'getTournamentsSponsor',
//     deleteTournamentSponsor = 'deleteTournamentSponsor',
// }


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

    public static updateUser(data: IUserAccountUpdate, param: string, cookie: string): IRequest<IUserAccountUpdate>{
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

    public static getCategories(param: number, cookie: string): IRequest{
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

    public static deleteCategory(param: number, cookie: string): IRequest {
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

    public static getTournamentSponsors(param: number, cookie: string): IRequest {
        return {
            method: HTTPMETHODS.GET,
            cookie: cookie,
            url: `/tournament-sponsor/load-by-tournament?tournamentId=${param}`
        }       
    }

    public static deleteTournamentSponsor(param: number, cookie: string): IRequest {
        return {
            method: HTTPMETHODS.DELETE,
            cookie: cookie,
            url: `/tournament-sponsor/${param}`
        }       
    }


}

// let s = Requests.loginn({email: '', password: ''});



// export function getRequestArgs(reqArgs: Request, param?: string): IRequest {
//     switch (reqArgs) {
//         case Request.login:
//             return {
//                 method: HTTPMETHODS.POST,
//                 endPoint: "/login",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }
//         case Request.updateUser:
//             return {
//                 method: HTTPMETHODS.PUT,
//                 endPoint: "/account",
//                 parametersURL: `${param}`,
//                 url: function (): string {
//                     return `${this.endPoint}/${this.parametersURL}`
//                 }
//             }
//         case Request.signup:
//             return {
//                 method: HTTPMETHODS.POST,
//                 endPoint: "/signup",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.getCategories:
//             return {
//                 method: HTTPMETHODS.GET,
//                 endPoint: "/category/loadByTournament",
//                 parametersSearch: `tournamentId=${param}`,
//                 url: function (): string {
//                     return `${this.endPoint}?${this.parametersSearch}`
//                 }
//             }

//         case Request.createCategory:
//             return {
//                 method: HTTPMETHODS.POST,
//                 endPoint: "/category",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.updateCategory:
//             return {
//                 method: HTTPMETHODS.PUT,
//                 endPoint: "/category",
//                 parametersURL: param,
//                 url: function (): string {
//                     return `${this.endPoint}/${this.parametersURL}`
//                 }
//             }

//         case Request.deleteCategory:
//             return {
//                 method: HTTPMETHODS.DELETE,
//                 endPoint: "/category",
//                 parametersURL: param,
//                 url: function (): string {
//                     return `${this.endPoint}/${this.parametersURL}`
//                 }
//             }

//         case Request.createSport:
//             return {
//                 method: HTTPMETHODS.POST,
//                 endPoint: "/sport",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.getSports:
//             return {
//                 method: HTTPMETHODS.GET,
//                 endPoint: "/sports",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.getCities:
//             return {
//                 method: HTTPMETHODS.GET,
//                 endPoint: "/cities",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.createTournament:
//             return {
//                 method: HTTPMETHODS.POST,
//                 endPoint: "/tournament",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.getTournaments:
//             return {
//                 method: HTTPMETHODS.GET,
//                 endPoint: "/tournaments",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.deleteTournament:
//             return {
//                 method: HTTPMETHODS.DELETE,
//                 endPoint: "/tournament",
//                 parametersURL: param,
//                 url: function (): string {
//                     return `${this.endPoint}/${this.parametersURL}`
//                 }
//             }

//         case Request.createTournamentSponsor:
//             return {
//                 method: HTTPMETHODS.POST,
//                 endPoint: "/tournament-sponsor",
//                 url: function (): string {
//                     return `${this.endPoint}`
//                 }
//             }

//         case Request.getTournamentsSponsor:
//             return {
//                 method: HTTPMETHODS.GET,
//                 endPoint: "/tournament-sponsor/load-by-tournament",
//                 parametersSearch: `tournamentId=${param}`,
//                 url: function (): string {
//                     return `${this.endPoint}?${this.parametersSearch}`
//                 }
//             }

//         case Request.deleteTournamentSponsor:
//             return {
//                 method: HTTPMETHODS.DELETE,
//                 endPoint: "/tournament-sponsor",
//                 parametersURL: param,
//                 url: function (): string {
//                     return `${this.endPoint}/${this.parametersURL}`
//                 }
//             }
//     }
// }
