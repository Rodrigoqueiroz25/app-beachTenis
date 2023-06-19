

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
        setState({ ...state, dateBirthday: e.target.value });
    }

    function changeGender(e: ChangeEvent<HTMLInputElement>){
        setState({ ...state, gender: e.target.value as "" | "F" | "M"});
    }

    function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(state);
        submit();

    }

    return (
        <div className={styles.formCreateProfile}>

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
                            value={state.dateBirthday}
                            func={changeBirthDate}
                        />
                    </div>
                    <div className={styles.gender}>
                        <p>Gender</p>
                        <div className={styles.radioButton}>
                            <input 
                                type="radio" 
                                id='male' 
                                value='M'
                                checked={state.gender === 'M'}
                                onChange={changeGender}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className={styles.radioButton}>
                            <input 
                                type="radio" 
                                id='female' 
                                value='F'
                                checked={state.gender === 'F'}
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