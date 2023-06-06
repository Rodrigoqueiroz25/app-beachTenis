
import { FormPhoneEmailPasswd } from './components/FormPhoneEmailPasswd/FormPhoneEmailPasswd';
import { FormCreateProfile } from './components/FormCreateProfile/FormCreateProfile';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';
import { Navigate } from 'react-router-dom';


export function SignUp(){

    const [complete, setComplete] = useState(false);
    
    const { signup, isAuth, isLoading, error, msgFailedAuth } = useSignup();

    function signUp(){
        setComplete(false);
        signup();
    }

    return (
        <>
            { isLoading && 
                <p>isLoading</p>
            }

            { isAuth 
                && <Navigate to='/home'/>
            }

            { !isAuth && msgFailedAuth
                && 
                    <div>
                        <p>{msgFailedAuth}</p>
                        { !complete && !isAuth
                            ? <FormPhoneEmailPasswd func={() => setComplete(true)}/>
                            : <FormCreateProfile submit={signUp} />
                        }
                    </div>
                
            }

            { !complete && !isAuth
                ? <FormPhoneEmailPasswd func={() => setComplete(true)}/>
                : <FormCreateProfile submit={signUp} />
            }
        </>
    );
}