/* eslint-disable react-hooks/exhaustive-deps */

import { SelectHTMLAttributes } from 'react';
import styles from './Combobox.module.css';

interface ComboboxProps extends SelectHTMLAttributes<HTMLSelectElement>{
    msgError?: string
    label: string
    register: any;
    idOptions?: any[];
    options: any[];
    isEmpty: boolean;
}

export function Combobox(props: ComboboxProps) {

    return (
        <div className={styles.combobox}>
            <div className={styles.selectWrapper}>
                <select 
                    className={props.msgError ? styles['invalid'] : "" }
                    {...props.register(props.name)}
                >
                    <option key={-1} value=""></option>
                    {props.options.map((res: any, key: number) => (
                        <option key={key} value={props.idOptions ? props.idOptions[key] : res}>{res}</option>
                    ))}

                </select>
                <p className={styles.error}>{props.msgError}</p>
                <label className={`${props.isEmpty ? styles.label_empty_option : styles.label_noempty_option}`} htmlFor={props.name}>{props.label}</label>
            </div>
        </div>
    );

}