
import styles from './Input.module.css';
import React, { InputHTMLAttributes, ReactNode } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    src?: string;
    label?: string;
    msgError?: string;
}


const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(({ msgError, src, ...rest }, ref) => (

    <div className={styles.inputPreLogged}>
        <div className={styles.wrapper}>
            <input
                className={msgError ? `${styles['input']} ${styles['invalid']}` : styles['input']}
                ref={ref}
                {...rest}
            />
            <p className={styles.error}>{msgError}</p>
            <img src={src} alt="" />
        </div>

    </div>

));


export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ msgError, src, label, ...rest }, ref) => (
    <>
        {label ?
            <label className={styles.date}>{label}
                <InputWithLabel
                    src={src}
                    msgError={msgError}
                    {...rest}
                    ref={ref}
                />
            </label>
            :
            <InputWithLabel
                src={src}
                msgError={msgError}
                {...rest}
                ref={ref}
            />
        }
    </>
));
