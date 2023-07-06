
import styles from './DataFieldSmall.module.css';
import { ChangeEvent, useState } from 'react';


type Props = {
    placeholder: string;
    label: string;
    register: any;
    name: string;
    errors: any;
    errors2?: any;
}

export function DataFieldSmall({placeholder, label, register, name, errors, errors2}: Props) {

    const [type, setType] = useState('text');

    function focus(){
        setType('date');
    }

    function blur(e: ChangeEvent<HTMLInputElement>){
        if(e.target.value === undefined || e.target.value === ''){
            setType('text');
        }
    }

    return (
        <div className={styles.dataFieldSmall}>
            <div className={styles.inputWrapper}>
                <input 
                    className={errors[name]?.message || errors2 ? `${styles['input']} ${styles['invalid']}` : styles['input']} 
                    type={type} 
                    placeholder={placeholder}
                    
                    onFocus={focus}
                    onBlur={blur}
                    // onChange={func}
                    {...register(name)}
                />
                <p className={styles.error}>{errors[name]?.message}</p>
                <p className={styles.error}>{errors2 ? errors2 : ""}</p>
                <label className={styles.label} htmlFor={name}>
                        {/* {errors[name]?.message ? errors[name]?.message : label} */}
                        {label}
                </label>
            </div>
        </div>
    );

}