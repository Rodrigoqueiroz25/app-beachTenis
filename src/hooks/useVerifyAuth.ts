import { useCookies } from "react-cookie";


export default function useVerifyAuth(){
    
    const [cookies, setCookies] = useCookies();

    function isAuth(){
        if (cookies.user_session && cookies.user_name) {
            return true;
        }
        else{
            return false;
        }
    }
    
    return isAuth;
}