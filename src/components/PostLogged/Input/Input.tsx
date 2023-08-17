
import styles from './styles.module.css';
import { InputHTMLAttributes } from 'react';
import React from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    msgError?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ msgError, ...rest }, ref) => (
    <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>
                <input
                    className={msgError ? `${styles['input']} ${styles['invalid']}` : styles['input']}
                    ref={ref}
                    {...rest}
                />
                <label className={styles.label}>
                    {rest.placeholder}
                </label>
            </div>
            <p className={styles.error}>{msgError}</p>
        </div>
    </div>
))
