import { HTTPMETHODS } from "@/constants/httpMethods"
import { IRequest } from "@/interfaces/IRequest"

export enum Request {
    login = 'login',
    signup = 'signup',
    updateUser = 'updateUser',

    getCategories = 'getCategories',
    createCategory = 'createCategory',
    updateCategory = 'updateCategory',
    deleteCategory = 'deleteCategory',

    createSport = 'createSport',
    getSports = 'getSports',

    getCities = 'getCities',

    createTournament = 'createTournament',
    getTournaments = 'getTournaments',
    deleteTournament = 'deleteTournament',

    createTournamentSponsor = 'createTournamentSponsor',
    getTournamentsSponsor = 'getTournamentsSponsor',
    deleteTournamentSponsor = 'deleteTournamentSponsor',
}


export function getRequestArgs(request: Request, id?: string): IRequest {
    switch (request) {
        case Request.login:
            return {
                method: HTTPMETHODS.POST,
                endPoint: "/login",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }
        case Request.updateUser:
            return {
                method: HTTPMETHODS.PUT,
                endPoint: "/account",
                parametersURL: `${id}`,
                url: function (): string {
                    return `${this.endPoint}/${this.parametersURL}`
                }
            }
        case Request.signup:
            return {
                method: HTTPMETHODS.POST,
                endPoint: "/signup",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.getCategories:
            return {
                method: HTTPMETHODS.GET,
                endPoint: "/category/loadByTournament",
                parametersSearch: `tournamentId=${id}`,
                url: function (): string {
                    return `${this.endPoint}?${this.parametersSearch}`
                }
            }

        case Request.createCategory:
            return {
                method: HTTPMETHODS.POST,
                endPoint: "/category",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.updateCategory:
            return {
                method: HTTPMETHODS.PUT,
                endPoint: "/category",
                parametersURL: id,
                url: function (): string {
                    return `${this.endPoint}/${this.parametersURL}`
                }
            }

        case Request.deleteCategory:
            return {
                method: HTTPMETHODS.DELETE,
                endPoint: "/category",
                parametersURL: id,
                url: function (): string {
                    return `${this.endPoint}/${this.parametersURL}`
                }
            }

        case Request.createSport:
            return {
                method: HTTPMETHODS.POST,
                endPoint: "/sport",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.getSports:
            return {
                method: HTTPMETHODS.GET,
                endPoint: "/sports",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.getCities:
            return {
                method: HTTPMETHODS.GET,
                endPoint: "/cities",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.createTournament:
            return {
                method: HTTPMETHODS.POST,
                endPoint: "/tournament",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.getTournaments:
            return {
                method: HTTPMETHODS.GET,
                endPoint: "/tournaments",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.deleteTournament:
            return {
                method: HTTPMETHODS.DELETE,
                endPoint: "/tournament",
                parametersURL: id,
                url: function (): string {
                    return `${this.endPoint}/${this.parametersURL}`
                }
            }

        case Request.createTournamentSponsor:
            return {
                method: HTTPMETHODS.POST,
                endPoint: "/tournament-sponsor",
                url: function (): string {
                    return `${this.endPoint}`
                }
            }

        case Request.getTournamentsSponsor:
            return {
                method: HTTPMETHODS.GET,
                endPoint: "/tournament-sponsor/load-by-tournament",
                parametersSearch: `tournamentId=${id}`,
                url: function (): string {
                    return `${this.endPoint}?${this.parametersSearch}`
                }
            }

        case Request.deleteTournamentSponsor:
            return {
                method: HTTPMETHODS.DELETE,
                endPoint: "/tournament-sponsor",
                parametersURL: id,
                url: function (): string {
                    return `${this.endPoint}/${this.parametersURL}`
                }
            }
    }
}
