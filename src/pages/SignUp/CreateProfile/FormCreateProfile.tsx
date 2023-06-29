
import { ChangeEvent, FormEvent } from 'react';

import styles from './FormCreateProfile.module.css';
import imgCreateProfile from '@/assets/create_profile_title.svg';
import imgRectangle from '@/assets/Rectangle.svg';
import imgPhotoCircle from '@/assets/photo_create_profile.svg';

import { HeaderLogin } from '@/components/HeaderLogin/HeaderLogin';
import { TextField } from '@/components/TextField/TextField';
import { Button } from '@/components/Button/Button';


type FormCreateProfileProps = {
    firstName: string
    setFirstName: (p: string) => void
    lastName: string
    setLastName: (p: string) => void
    dateBirthday: string
    setDateBirthday: (p: string) => void
    gender: string
    setGender: (p: string) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

type Prop = {
    props: FormCreateProfileProps;
}

export function FormCreateProfile({ props }: Prop) {

    return (
        <div className={styles.container}>

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

                <form className={styles.form} onSubmit={props.handleSubmit}>
                    <TextField
                        placeholder='First Name'
                        type='text'
                        value={props.firstName}
                        func={(e: ChangeEvent<HTMLInputElement>) => props.setFirstName(e.target.value)}
                    />
                    <TextField
                        placeholder='Last Name'
                        type='text'
                        value={props.lastName}
                        func={(e: ChangeEvent<HTMLInputElement>) => props.setLastName(e.target.value)}
                    />
                    <div className={styles.date}>
                        <p>DOB</p>
                        <TextField
                            placeholder=''
                            type='date'
                            value={props.dateBirthday}
                            func={(e: ChangeEvent<HTMLInputElement>) => props.setDateBirthday(e.target.value)}
                        />
                    </div>
                    <div className={styles.gender}>
                        <p>Gender</p>
                        <div className={styles.radioButton}>
                            <input 
                                type="radio" 
                                id='male' 
                                value='M'
                                checked={props.gender === 'M'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => props.setGender(e.target.value)}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className={styles.radioButton}>
                            <input 
                                type="radio" 
                                id='female' 
                                value='F'
                                checked={props.gender === 'F'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => props.setGender(e.target.value)}
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