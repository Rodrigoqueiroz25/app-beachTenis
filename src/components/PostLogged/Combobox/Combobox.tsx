/* eslint-disable react-hooks/exhaustive-deps */

import React, { SelectHTMLAttributes } from 'react';
import styles from './styles.module.css';
import { IOptionCombobox } from 'interfaces/IOptionCombobox';

interface ComboboxProps extends SelectHTMLAttributes<HTMLSelectElement> {
    msgError?: string;
    options: IOptionCombobox[];
}

export const Combobox = React.forwardRef<HTMLSelectElement, ComboboxProps>(({ msgError, options, ...rest }, ref) => {
    
    return (
        <div className={styles.combobox}>
            <div className={styles.selectWrapper}>
                <select
                    className={msgError ? styles['invalid'] : ""}
                    ref={ref}
                    {...rest}
                    defaultValue='select...'
                >
                    <option key={-1} value="select..." disabled>Selecione...</option>
                    {options?.map((option, key) => (
                        <option key={key} value={option.value}>{option.name}</option>
                    ))}

                </select>
                <label className={styles.label}>
                    {rest.placeholder}
                </label>
                <p className={styles.error}>{msgError}</p>
            </div>
        </div>
    );
})
