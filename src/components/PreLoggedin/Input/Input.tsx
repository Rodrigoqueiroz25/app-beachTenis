
import styles from './Input.module.css';
import React, { InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    src?: string;
    msgError?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ msgError, src, ...rest }, ref) => (
    <div className={styles.inputPreLogged}>
        <input
            className={msgError ? `${styles['input']} ${styles['invalid']}` : styles['input']}
            ref={ref}
            {...rest}
        />
        <p className={styles.error}>{msgError}</p>
        <img src={src} alt="" />
    </div>
));
