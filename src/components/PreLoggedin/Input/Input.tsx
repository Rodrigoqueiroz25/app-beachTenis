
import styles from './Input.module.css';
import { InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    mask?: string;
    src?: string;
    register?: any;
    msgError?: string;
}


export function Input(props: InputProps) {
    return (
        <div className={styles.textField}>
            <input
                className={ props.msgError? `${styles['input']} ${styles['invalid']}` : styles['input']} 
                placeholder={props.placeholder} 
                type={props.type} 
                {...props.register(props.name)} 
            />
            <p className={styles.error}>{props.msgError}</p>
            <img src={props.src} alt="" />
        </div>
    );
}