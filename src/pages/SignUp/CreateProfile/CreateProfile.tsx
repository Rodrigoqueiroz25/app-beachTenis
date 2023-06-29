
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ContextSignup } from '@/contexts/ContextSignup';
import { FormCreateProfile } from './FormCreateProfile';
import useSignup from '@/hooks/useSignup';


export function CreateProfile() {

    const location = useLocation();
    const navigate = useNavigate();

    const { signup, isAuth, isLoading, error } = useSignup();
    const { state, setState } = useContext(ContextSignup);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (!location.state?.userCreated) {
            navigate('/signup')
        }
    });


    function changeFirstName(firstName: string) {
        // setState({ ...state, firstName: firstName })
        setFirstName(firstName);
    }

    function changeLastName(lastName: string) {
        // setState({ ...state, lastName: lastName })
        setLastName(lastName);
    }

    function changeBirthDate(birthDate: string) {
        setState({ ...state, dateBirthday: birthDate });
    }

    function changeGender(gender: string) {
        setState({ ...state, gender: gender as "" | "F" | "M" });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setState({...state, name: `${firstName} ${lastName}`})
        signup();
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {isAuth
                ? <Navigate to='/home' />
                : <FormCreateProfile props={{
                    firstName: firstName,
                    lastName: lastName,
                    gender: state.gender,
                    dateBirthday: state.dateBirthday,
                    setFirstName: changeFirstName,
                    setLastName: changeLastName,
                    setDateBirthday: changeBirthDate,
                    setGender: changeGender,
                    handleSubmit
                }} />
            }
            {!isAuth &&
                <div>
                    <p>{error}</p>
                </div>
            }
        </>
    );
}