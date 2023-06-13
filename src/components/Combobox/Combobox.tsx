
import styles from './Combobox.module.css';
import { ChangeEvent, useState } from 'react';

type Props = {
    label: string;
    func?: any;
}


export function Combobox({func, label}: Props) {

    const [value, setValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLSelectElement>){
        setValue(e.target.value);
        func(e.target.value);
    }


    return (
        <div className={styles.combobox}>
            <div className={styles.selectWrapper}>
                <select name="name" id="id" placeholder='teste' onChange={handleChange}>
                    
                </select>
                <label className={`${value === "" ? styles.label_empty_option : styles.label_noempty_option}`} htmlFor="name">{label}</label>
            </div>
        </div>
    );

}