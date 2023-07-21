/* eslint-disable react-hooks/exhaustive-deps */

import React, { SelectHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface ComboboxProps extends SelectHTMLAttributes<HTMLSelectElement> {
    msgError?: string;
    idOptions?: any[];
    options: any[];
    isEmpty: boolean;
}

export const Combobox = React.forwardRef<HTMLSelectElement, ComboboxProps>((
    {msgError, options, idOptions, isEmpty, ...rest}, ref) => (

    <div className={styles.combobox}>
        <div className={styles.selectWrapper}>
            <select 
                className={msgError ? styles['invalid'] : ""}
                ref={ref}
                {...rest}
            >
                <option key={-1} value=""></option>
                {options?.map((res: any, key: number) => (
                    <option key={key} value={idOptions ? idOptions[key] : res}>{res}</option>
                ))}

            </select>
            <p className={styles.error}>{msgError}</p>
            <label className={`${isEmpty ? styles.label_empty_option : styles.label_noempty_option}`}>
                {rest.placeholder}
            </label>
        </div>
    </div>
));
