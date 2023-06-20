

import styles from './TextFieldSmall.module.css';

type Props = {
    placeholder: string;
    label: string;
    register: any;
    name: string;
    errors: any;
}


export function TextFieldSmall({ placeholder, label, register, name, errors }: Props) {


    return (
        <>
            <div className={styles.textFieldSmall}>
                <div className={styles.inputWrapper}>
                    <p className={styles.error}>{errors[name]?.message}</p>
                    <input 
                        className={errors[name]?.message ? `${styles['input']} ${styles['invalid']}` : styles['input']}
                        placeholder={placeholder}
                        {...register(name)}
                    />
                    <label className={styles.label} htmlFor={name}>
                        {/* {errors[name]?.message ? errors[name]?.message : label} */}
                        {label}
                    </label>
                </div>
            </div>
        </>

    );

}