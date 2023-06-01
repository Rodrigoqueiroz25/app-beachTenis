
import { FormPhoneEmailPasswd } from './components/FormPhoneEmailPasswd/FormPhoneEmailPasswd';
import { FormCreateProfile } from './components/FormCreateProfile/FormCreateProfile';
import { useState } from 'react';


export function SignUp(){

    const [complete, setComplete] = useState(false);

    function signUp(){
        //
    }

    return (
        <>
            {!complete 
                ? <FormPhoneEmailPasswd func={() => setComplete(true)}/>
                : <FormCreateProfile submit={signUp} />
            }
        </>
    );
}