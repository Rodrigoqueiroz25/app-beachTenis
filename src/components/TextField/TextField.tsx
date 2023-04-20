
import styles from './TextField.module.css';

type Props = {
    placeholder: string;
    type: string;
    src?: string;
}

export function TextField({placeholder, type, src}: Props) {
    return (
        <div className={styles.textField}>
            <input placeholder={placeholder} type={type} name="" />
            <img src={src} alt="" />
        </div>
    );
}