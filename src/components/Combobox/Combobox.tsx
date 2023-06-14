
import useGetFetch from '../../hooks/useGetFetch';
import { City } from '../../types/login';
import styles from './Combobox.module.css';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
    label: string;
    endPoint: string;
    func?: any;
}


export function Combobox({func, label, endPoint}: Props) {

    const { getData, msgFailedGet, error, result } = useGetFetch<City>();

    useEffect(() =>{
        getData(endPoint)
    });


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
                    {result.map((res, key) => (
                        <option key={key} value={res.name}>{res.name}</option>
                    ))}
                </select>
                <label className={`${value === "" ? styles.label_empty_option : styles.label_noempty_option}`} htmlFor="name">{label}</label>
            </div>
        </div>
    );

}