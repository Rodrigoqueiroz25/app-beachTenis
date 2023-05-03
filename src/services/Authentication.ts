
type TLogado = {
    accessToken: string;
    name: string;
}


export function isAuthenticated(): boolean{
    if(localStorage.getItem('token')){
        return true;
    }
    else{
        return false;
    }
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
            localStorage.setItem('token', json.accessToken);
            return "Autenticado";
        }
        if(response.status === 401){
            return "usuario/senha invalido";
        }
        else{
            return "Erro, tente novamente mais tarde";
        }
        
    } catch (error) {
        return "Erro, tente novamente mais tarde";
    }
    
}