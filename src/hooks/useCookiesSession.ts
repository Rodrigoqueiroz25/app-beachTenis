
import { useCookies } from "react-cookie";

export default function useCookiesSession(){

    const nameCookieToken = 'playGo_user_session';
    const nameCookieNameUser = 'playGo_user_name';

    const [cookies, setCookies, removeCookies] = useCookies();


    function setCookiesSession(accessToken: string, nameUser: string, isAdmin: string): boolean{
        setCookies(nameCookieToken, accessToken, {
            path: '/',
            sameSite: 'strict',
            maxAge: 20000
        });
        setCookies(nameCookieNameUser, nameUser, {
            path: '/',
            sameSite: 'strict',
            maxAge: 20000
        });
        sessionStorage.setItem('isAdmin', isAdmin);

        if(cookiesSessionExists()){
            return true;
        }
        else{
            return false;
        }
    }

    function getCookieNameUser(){
        if(cookiesSessionExists()){
            return cookies[nameCookieNameUser] as string;
        }
    }

    function getCookieToken(){
        if(cookiesSessionExists()){
            return cookies[nameCookieToken];
        }
    }

    function cookiesSessionExists(): boolean{
        if (cookies[nameCookieToken] && cookies[nameCookieNameUser]) {
            return true;
        }
        else{
            return false;
        }
    }

    function removeCookiesSession(){
        removeCookies(nameCookieNameUser);
        removeCookies(nameCookieToken);
    }


    return {
        setCookiesSession,
        getCookieNameUser,
        getCookieToken,
        cookiesSessionExists,
        removeCookiesSession
    };

}