
import styles from './InputForm.module.css';
import { InputHTMLAttributes } from 'react';

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement>{
    msgError?: string
    label: string
    register: any
}

export function InputForm(props: InputFormProps) {

    return (
        <div className={styles.inputForm}>
            <div className={styles.inputWrapper}>
                <input 
                    className={ props.msgError? `${styles['input']} ${styles['invalid']}` : styles['input']} 
                    type={props.type} 
                    placeholder={props.placeholder}
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