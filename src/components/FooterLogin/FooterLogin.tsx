
import styles from './FooterLogin.module.css';
import imgGoogle from '../../assets/google.svg';
import imgFacebook from '../../assets/Facebook.svg';
import imgRectangle from '../../assets/Rectangle.svg';


type Props = {
    text: string;
    link: string;
}

export function FooterLogin({text, link}: Props) {
    return (
        <footer className={styles.footer}>
            <p className={styles.textOr}>Or</p>
            <div className={styles.imgsSocialMedia}>
                <img src={imgGoogle} alt="" />
                <img src={imgFacebook} alt="" />
            </div>
            <p className={styles.link}>{text}<span>{link}</span></p>

            <img src={imgRectangle} alt="" />
        </footer>
    );
}