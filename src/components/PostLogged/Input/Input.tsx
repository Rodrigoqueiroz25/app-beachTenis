
import styles from './Input.module.css';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    msgError?: string
    label: string
    register?: any
}

export function Input(props: InputProps) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <input 
                    className={ props.msgError? `${styles['input']} ${styles['invalid']}` : styles['input']} 
                    type={props.type} 
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    {...props.register(props.name)}   
                />
                <p className={styles.error}>{props.msgError}</p>
                <label className={styles.label} htmlFor={props.name}>
                        {props.label}
                </label>
            </div>
        </div>
    );

}