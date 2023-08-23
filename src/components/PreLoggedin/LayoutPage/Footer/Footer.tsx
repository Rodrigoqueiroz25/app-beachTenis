
import { ReactNode } from 'react';
import styles from './Footer.module.css';
import imgRectangle from 'assets/Rectangle.svg';

interface FooterProps {
    children: ReactNode;
}

export function Footer(props: FooterProps) {

    return (
        <footer className={styles.wrapper}>
            <div className={styles.footer}>
                {props.children}
                <img src={imgRectangle} alt="" />
            </div>
        </footer>
    );
}