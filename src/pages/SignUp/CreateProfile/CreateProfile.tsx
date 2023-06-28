
import { FormEvent, useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useSignup from '@/hooks/useSignup';
import { ContextSignup } from '@/contexts/ContextSignup';
import { FormCreateProfile } from './FormCreateProfile';


export function CreateProfile(){

    const location = useLocation();
    const navigate = useNavigate();
    const { signup, isAuth, isLoading, msgFailedAuth } = useSignup();
    const {state, setState} = useContext(ContextSignup);

    useEffect(() => {
        if(!location.state?.userCreated){
            navigate('/signup')
        }
    });

    
    function changeFirstName(firstName: string) {
        setState({...state, firstName: firstName})
    }

    function changeLastName(lastName: string) {
        setState({...state, lastName: lastName})
    }

    function changeBirthDate(birthDate: string) {
        setState({ ...state, dateBirthday: birthDate });
    }

    function changeGender(gender: string){
        setState({ ...state, gender: gender as "" | "F" | "M"});
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        signup();
    }
 

    return (
        <>
            { isLoading && 
                <p>isLoading</p>
            }

            { isAuth 
                ? <Navigate to='/home'/>
                : <FormCreateProfile props={{
                    firstName: state.firstName,
                    lastName: state.lastName,
                    gender: state.gender,
                    dateBirthday: state.dateBirthday,
                    setFirstName: changeFirstName,
                    setLastName: changeLastName,
                    setDateBirthday: changeBirthDate,
                    setGender: changeGender,
                    handleSubmit
                }}/>
            }
        </>
    );
}