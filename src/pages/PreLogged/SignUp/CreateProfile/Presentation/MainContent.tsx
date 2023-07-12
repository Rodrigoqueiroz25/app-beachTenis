
import { ChangeEvent, FormEvent } from 'react';

import styles from '../styles.module.css';

import imgPhotoCircle from '@/assets/photo_create_profile.svg';

import { Button } from '@/components/Button/Button';
import { PreLoggedin } from '@/components/PreLoggedin';


interface MainContentProps {
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

interface Props{
    props: MainContentProps;
}

export function MainContent({props}: Props) {

    return (

        <main className={styles.containerMain}>

            <div className={styles.uploadPhoto}>
                <img src={imgPhotoCircle} alt="" />
                <Button>Enviar</Button>
            </div>

            <form className={styles.form} onSubmit={props.handleSubmit}>
                <PreLoggedin.Input
                    placeholder='First Name'
                    type='text'
                    value={props.firstName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.setFirstName(e.target.value)}
                />
                <PreLoggedin.Input
                    placeholder='Last Name'
                    type='text'
                    value={props.lastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.setLastName(e.target.value)}
                />
                <div className={styles.date}>
                    <p>DOB</p>
                    <PreLoggedin.Input
                        placeholder=''
                        type='date'
                        value={props.dateBirthday}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setDateBirthday(e.target.value)}
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
                <Button>Login</Button>
            </form>
        </main>

    );
}