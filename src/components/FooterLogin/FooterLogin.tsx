
import styles from './FooterLogin.module.css';
import imgGoogle from '../../assets/google.svg';
import imgFacebook from '../../assets/Facebook.svg';
import imgRectangle from '../../assets/Rectangle.svg';
import { Link } from 'react-router-dom';


type Props = {
    text: string;
    textLink: string;
    endPoint: string;
}

export function FooterLogin({text, textLink, endPoint}: Props) {
    return (
        <footer className={styles.footer}>
            {/* <p className={styles.textOr}>Or</p>
            <div className={styles.imgsSocialMedia}>
                <img src={imgGoogle} alt="" />
                <img src={imgFacebook} alt="" />
            </div> */}
            <p className={styles.dontHaveRegister}>{text}<Link className={styles.link} to={endPoint}>{textLink}</Link></p>

            <img src={imgRectangle} alt="" />
        </footer>
    );
}