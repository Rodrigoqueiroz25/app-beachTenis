
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
            user: email,
            password: passwd
        }),   
    }
    
    try {
        let response = await fetch('https://playgo-api.cyclic.app/api/login', options);
        if(response.status === 200){
            let json = await response.json() as TLogado;
            localStorage.setItem('token', json.accessToken);
            console.log(json);
        }
    } catch (error) {
        console.error(error);
        alert("Erro! tente novamente mais tarde");    
    }
    
}