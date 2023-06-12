
import styles from './TextFieldSmall.module.css';
import { ChangeEvent, useState } from 'react';

type Props = {
    placeholder: string;
    type: string;
    value: string;
    label: string;
    func?: any;
}


export function TextFieldSmall({placeholder, type, func, label}: Props) {

    const [typee, setType] = useState('text');
    const [value, setValue] = useState('');

    function focus(){
        if(type === 'date'){
            setType('date');
        }
    }

    function blur(){
        if(type === 'date'){
            if(value === ''){
                setType('text');
            }
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setValue(e.target.value);
        func();
    }


    return (
        <div className={styles.textFieldSmall}>
            <div className={styles.inputWrapper}>
                <input 
                    className={styles.input} 
                    name="name" 
                    type={typee} 
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onFocus={focus}
                    onBlur={blur}
                    required
                />
                <label className={styles.label} htmlFor="name">{label}</label>
            </div>
        </div>
    );

}