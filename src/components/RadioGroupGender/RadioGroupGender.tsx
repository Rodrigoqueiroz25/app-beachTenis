
import { feminino, masculino } from 'constants/wordsPhrases';
import styles from './styles.module.css';
import React, { InputHTMLAttributes } from 'react';

interface RadioGroupGenderProps extends InputHTMLAttributes<HTMLInputElement> {
    msgError?: string;
}


export const RadioGroupGender = React.forwardRef<HTMLInputElement, RadioGroupGenderProps>(({ msgError, ...rest }, ref) => (
    <div className={styles.gender}>
        <div className={styles.wrapper}>
            <p className={styles.title}>Gênero</p>
            <div className={msgError ? `${styles['radioGroup']} ${styles['selectOption']}` : styles['radioGroup']}>
                <label className={msgError ? styles['invalid'] : styles['radioButton']}>
                    <input
                        type="radio"
                        value="M"
                        ref={ref}
                        {...rest}
                    />{masculino}
                </label>
                <label className={msgError ? styles['invalid'] : styles['radioButton']}>
                    <input
                        type="radio"
                        value="F"
                        ref={ref}
                        {...rest}
                    />{feminino}
                </label>
            </div>
        </div>
        <p className={styles.error}>{msgError}</p>
    </div>
))