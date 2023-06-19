/* eslint-disable react-hooks/exhaustive-deps */

import useGetFetch from '../../hooks/useGetFetch';
import styles from './Combobox.module.css';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
    label: string;
    endPoint: string;
    func?: any;
    data?: string;
}


export function Combobox({func, label, endPoint, data}: Props) {

    const { getData, msgFailedGet, error, result } = useGetFetch();

    useEffect(() =>{
        setTimeout(() => {
            getData(endPoint, data);
        }, 500);
    }, [msgFailedGet, error]);


    const [value, setValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLSelectElement>){
        setValue(e.target.value);
        func(e.target.value);
    }

    return (
        <div className={styles.combobox}>
            <div className={styles.selectWrapper}>
                <select name="name" id="id" placeholder='teste' onChange={handleChange}>
                    <option value=""></option>
                    {result.map((res: any, key: number) => (
                        <option key={key} value={res}>{res}</option>
                    ))}
                </select>
                <label className={`${value === "" ? styles.label_empty_option : styles.label_noempty_option}`} htmlFor="name">{label}</label>
            </div>
        </div>
    );

}