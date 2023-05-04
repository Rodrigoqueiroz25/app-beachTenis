import { TLogado, dataLogin } from "../types/login";

export function isAuthenticated(): boolean{
    //autenticate token from server
    return false;
}


export async function authenticate(email: string, passwd: string){
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept': '*/*',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify({
            user: email.toLowerCase(),
            password: passwd.toLowerCase()
        }),
        mode: 'cors'
    }
    
    try {
        // let response = await fetch('https://playgo-api.cyclic.app/api/login', options);
        let response = await fetch('http://localhost:3003/api/login', options); //using server in localhost
        if(response.status === 200){
            let json = await response.json() as TLogado;
            //localStorage.setItem('token', json.accessToken);
            return {
                msg: "Autenticado",
                name_user: json.name,
                token: json.accessToken
            } as dataLogin;
        }
        if(response.status === 401){
            return {
                msg: "usuario/senha invalido"
            } as dataLogin;
        }
        else{
            return {
                msg: "Erro, tente novamente mais tarde"
            } as dataLogin;
        }
        
    } catch (error) {
        return {
            msg: "Erro, tente novamente mais tarde"
        } as dataLogin;
    }
    
}