

import { HeaderLogin } from '../../../../components/HeaderLogin/HeaderLogin';
import styles from './FormCreateProfile.module.css';
import imgCreateProfile from '../../../../assets/create_profile_title.svg';
import { TextField } from '../../../../components/TextField/TextField';
import { Button } from '../../../../components/Button/Button';
import imgRectangle from '../../../../assets/Rectangle.svg';
import imgPhotoCircle from '../../../../assets/photo_create_profile.svg';
import { ChangeEvent, FormEvent, useContext } from 'react';
import { ContextSignup } from '../../../../contexts/ContextSignup';


type Props = {
    submit: any;
}

export function FormCreateProfile({ submit }: Props) {


    const { state, setState } = useContext(ContextSignup);


    function changeFirstName(e: ChangeEvent<HTMLInputElement>) {
        setState({...state, firstName: e.target.value})
    }

    function changeLastName(e: ChangeEvent<HTMLInputElement>) {
        setState({...state, lastName: e.target.value})
    }

    function changeBirthDate(e: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, birthDate: e.target.value });
    }

    function changeGender(e: ChangeEvent<HTMLInputElement>){
        setState({ ...state, gender: e.target.value });
    }

    function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(state);

    }

    return (
        <div className={styles.createProfile}>

            <HeaderLogin>
                <div className={styles.containerTitle}>
                    <p className={styles.title}>
                        Profile
                        <img src={imgCreateProfile} alt="" />
                    </p>
                </div>
            </HeaderLogin>

            <main className={styles.containerMain}>

                <div className={styles.uploadPhoto}>
                    <img src={imgPhotoCircle} alt="" />
                    <Button text='Upload Image' />
                </div>

                <form className={styles.form} onSubmit={handleSubmitForm}>
                    <TextField
                        placeholder='First Name'
                        type='text'
                        value={state.firstName}
                        func={changeFirstName}
                    />
                    <TextField
                        placeholder='Last Name'
                        type='text'
                        value={state.lastName}
                        func={changeLastName}
                    />
                    <div className={styles.date}>
                        <p>DOB</p>
                        <TextField
                            placeholder=''
                            type='date'
                            value={state.birthDate}
                            func={changeBirthDate}
                        />
                    </div>
                    <div className={styles.gender}>
                        <p>Gender</p>
                        <div className={styles.radioButton}>
                            <input 
                                type="radio" 
                                id='male' 
                                value='m'
                                checked={state.gender === 'm'}
                                onChange={changeGender}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className={styles.radioButton}>
                            <input 
                                type="radio" 
                                id='female' 
                                value='f'
                                checked={state.gender === 'f'}
                                onChange={changeGender}
                            />
                            <label htmlFor="female">Female</label>
                        </div>

                    </div>
                    <Button text='Login' />
                </form>
            </main>

            <footer className={styles.imgRetangle}>
                <img src={imgRectangle} alt="" />
            </footer>
        </div>
    );
}