
export enum Routes {
    login = '/login',
    signup = '/signup',
    createUser = '/signup/create-user',
    createProfile = '/signup/create-profile',
    forgotPasswd = '/forgot-password',
    createPasswd = '/create-password',
    addTournament = '/add-tournament',
    addTournamentSponsor = '/add-tournament-sponsor/:tournamentId',
    addTournamentSponsorLessParam = '/add-tournament-sponsor',
    addCategories = '/add-categories',
    listTournaments = '/list-tournaments',
    tournament = '/tournament/:id',
    tournamentLessParam = '/tournament',
    home = '/home',
    editProfile = '/profile',
    null = '*',
    root = '/'
}