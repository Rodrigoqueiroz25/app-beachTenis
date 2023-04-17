
import styles from './FooterLogin.module.css';
import imgGoogle from '../../assets/google.svg';
import imgFacebook from '../../assets/Facebook.svg';
import imgRectangle from '../../assets/Rectangle.svg';


type Props = {
    texto: string;
    link: string;
}

export function FooterLogin({texto, link}: Props) {
    return (
        <footer className={styles.footer}>
            <p>Or</p>
            <div className={styles.imgsRedes}>
                <img src={imgGoogle} alt="" />
                <img src={imgFacebook} alt="" />
            </div>
            <p className={styles.link}>{texto}<span>{link}</span></p>

            <img src={imgRectangle} alt="" />
        </footer>
    );
}