
import InputMask from 'react-input-mask';
import styles from './styles.module.css';
import { InputHTMLAttributes } from 'react';


interface InputMaskedProps extends InputHTMLAttributes<HTMLInputElement>{
    mask: string;
    register: any;
    src?: string;
    msgError?: string;
}


export function InputMasked(props: InputMaskedProps) {
    return (
        <div className={styles.textField}>
            <InputMask
                className={ props.msgError? `${styles['input']} ${styles['invalid']}` : styles['input']} 
                placeholder={props.placeholder} 
                type={props.type} 

                mask={props.mask}
                maskChar=""
                alwaysShowMask={false}
                {...props.register(props.name)} 
            />
            <p className={styles.error}>{props.msgError}</p>
            <img src={props.src} alt="" />
        </div>
    );
}