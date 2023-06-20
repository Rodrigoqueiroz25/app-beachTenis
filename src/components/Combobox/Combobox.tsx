/* eslint-disable react-hooks/exhaustive-deps */

import styles from './Combobox.module.css';
import { ChangeEvent, useState } from 'react';

type Props = {
    label: string;
    field: string;
    func: any;
    data: any;
}


export function Combobox({func, label, field, data}: Props) {

    const [value, setValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLSelectElement>){
        setValue(e.target.value);
        func(e.target.value, e.target.selectedOptions[0].id);
    }

    return (
        <div className={styles.combobox}>
            <div className={styles.selectWrapper}>
                <select name="name" id="id" placeholder='teste' onChange={handleChange}>
                    <option id='' value=""></option>
                    {data.map((res: any, key: number) => (
                        <option key={key} id={res['id']} value={res[field]}>{res[field]}</option>
                    ))}
                </select>
                <label className={`${value === "" ? styles.label_empty_option : styles.label_noempty_option}`} htmlFor="name">{label}</label>
            </div>
        </div>
    );

}