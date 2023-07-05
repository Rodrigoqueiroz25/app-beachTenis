
export function isAdmin(): boolean{
    if(sessionStorage.getItem('isAdmin') === 'true'){
        return true
    }
    return false
}