
import styles from './styles.module.css';
import { InputHTMLAttributes } from 'react';
import React from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    msgError?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({msgError, ...rest}, ref) => (
    <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
            <input
                className={msgError ? `${styles['input']} ${styles['invalid']}` : styles['input']}
                ref={ref}
                {...rest}
            />
            <p className={styles.error}>{msgError}</p>
            <label className={styles.label}>
                {rest.placeholder}
            </label>
        </div>
    </div>
))
