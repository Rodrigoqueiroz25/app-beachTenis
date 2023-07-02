
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    small?: boolean;
}

export function Button({ small = false, ...props}: ButtonProps){
    return (
        <button 
            {...props}
            className={`${styles.button} ${small ? styles.small : styles.large}`}
        />
    );
}