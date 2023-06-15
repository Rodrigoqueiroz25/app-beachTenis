
import useCookiesSession from "./useCookiesSession";


export default function useVerifyAuth(){
    
    const { cookiesSessionExists } = useCookiesSession();

    function isAuth(){
        if (cookiesSessionExists()) {
            return true;
        }
        else{
            return false;
        }
    }
    
    return isAuth;
}