
import { ReactNode } from 'react';
import styles from './Footer.module.css';
// import imgGoogle from '@/assets/google.svg';
// import imgFacebook from '@/assets/Facebook.svg';
import imgRectangle from '@/assets/Rectangle.svg';

interface FooterProps {
    children: ReactNode;
}

export function Footer(props: FooterProps) {

    return (
        <footer className={styles.wrapper}>
            <div className={styles.footer}>
                {/* <p className={styles.textOr}>Or</p>
            <div className={styles.imgsSocialMedia}>
                <img src={imgGoogle} alt="" />
                <img src={imgFacebook} alt="" />
            </div> */}
                {props.children}
                <img src={imgRectangle} alt="" />
            </div>
        </footer>

    );
}