
import { IMaskInput } from 'react-imask';
import styles from './Input.module.css';
import { InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    mask?: string;
    src?: string;
}


export function Input(props: InputProps) {
    return (
        <div className={styles.textField}>
            <IMaskInput
                placeholder={props.placeholder} 
                mask={props.mask}
                type={props.type} 
                name={props.name} 
                value={props.value}
                onChange={props.onChange}
                required
            />
            <img src={props.src} alt="" />
        </div>
    );
}