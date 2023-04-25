

import { HeaderLogin } from '../../components/HeaderLogin/HeaderLogin';
import styles from './CreateProfile.module.css';
import imgCreateProfile from '../../assets/create_profile_title.svg';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import imgRectangle from '../../assets/Rectangle.svg';
import imgPhotoCircle from '../../assets/photo_create_profile.svg';

export function CreateProfile(){
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
                    <Button text='Upload Image'/>
                </div>                                                
                                                
                <form className={styles.form} action="post">
                    <TextField placeholder='First Name' type='text'/>
                    <TextField placeholder='Last Name' type='text'/>
                    <div className={styles.date}>
                        <p>DOB</p>
                        <TextField placeholder='' type='date'/>
                    </div>
                    <div className={styles.gender}>
                        <p>Gender</p>
                        <div className={styles.radioButton}>
                            <input type="radio" id='male' value='male'/>
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className={styles.radioButton}>
                            <input type="radio" id='female' value='female'/>
                            <label htmlFor="female">Female</label>
                        </div>
                        
                    </div>
                    <Button text='Login'/>
                </form>                
            </main>
            
            <footer className={styles.imgRetangle}>
                <img src={imgRectangle} alt="" />
            </footer>
        </div>
    );
}