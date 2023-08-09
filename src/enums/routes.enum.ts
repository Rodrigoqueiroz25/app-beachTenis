
export enum Routes {
    login = '/login',
    signup = '/signup',
    createUser = '/signup/create-user',
    createProfile = '/signup/create-profile',
    forgotPasswd = '/forgot-password',
    createPasswd = '/create-password',
    createTournament = '/create-tournament',
    editTournament = '/edit-tournament',
    addCategories = '/add-categories',
    listTournaments = '/list-tournaments',
    tournament = '/tournament/:id',
    tournamentLessParam = '/tournament',
    home = '/home',
    editProfile = '/profile',
    null = '*',
    root = '/',
    createCategory = '/create-category',
    editCategory = '/edit-category',
    createTournamentSponsor = '/create-tournament-sponsor/:tournamentId',
    editTournamentSponsor = '/edit-tournament-sponsor/:sponsorId',
    registerPlayerCategory = '/category/register-player'
}