/* eslint-disable react-hooks/exhaustive-deps */

import styles from './Combobox.module.css';
import { ChangeEvent, useState } from 'react';

type Props = {
    label: string;
    ids?: any;
    name: string;
    register: any;
    errors: any;
    data: any;
    watch: any;
}


export function Combobox({label, ids, data, name, register, errors, watch}: Props) {

    const [value, setValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLSelectElement>){
        setValue(e.target.value);
    }

    return (
        <div className={styles.combobox}>
            <div className={styles.selectWrapper}>
                <select
                    className={errors[name]?.message ? styles['invalid'] : "" }
                    onChange={handleChange}
                    {...register(name)}
                >
                    <option key={-1} value=""></option>
                    {data.map((res: any, key: number) => (
                        <option key={key} value={ids ? ids[key] : res}>{res}</option>
                    ))}

                </select>
                <p className={styles.error}>{errors[name]?.message}</p>
                <label className={`${!watch ? styles.label_empty_option : styles.label_noempty_option}`} htmlFor={name}>{label}</label>
            </div>
        </div>
    );

}