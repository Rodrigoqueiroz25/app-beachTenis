

import styles from './TextFieldSmall.module.css';

type Props = {
    placeholder: string;
    label: string;
    register: any;
    name: string;
    errors: any;
    type: "text" | "number";
}


export function TextFieldSmall({ placeholder, label, register, name, errors, type }: Props) {


    return (
        <>
            <div className={styles.textFieldSmall}>
                <div className={styles.inputWrapper}>
                    <p className={styles.error}>{errors[name]?.message}</p>
                    <input 
                        className={errors[name]?.message ? `${styles['input']} ${styles['invalid']}` : styles['input']}
                        placeholder={placeholder}
                        type={type}
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