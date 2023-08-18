
import InputMask, { ReactInputMask } from 'react-input-mask';
import styles from './styles.module.css';
import React, { InputHTMLAttributes } from 'react';


interface InputMaskedProps extends InputHTMLAttributes<HTMLInputElement>{
    mask: string;
    src?: string;
    msgError?: string;
}

export const InputMasked = React.forwardRef<ReactInputMask, InputMaskedProps>(({ msgError, src, mask, ...rest }, ref) => (
        <div className={styles.inputMasked}>
            <InputMask
                className={msgError? `${styles['input']} ${styles['invalid']}` : styles['input']} 
                mask={mask}
                maskChar=""
                alwaysShowMask={false}
                ref={ref}
                {...rest}
            />
            <p className={styles.error}>{msgError}</p>
            <img src={src} alt="" />
        </div>
    ));
// }