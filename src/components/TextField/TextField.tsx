
import styles from './TextField.module.css';

type Props = {
    placeholder: string;
    type: string;
    name?: string;
    value?: string;
    func?: any;
    src?: string;
}

export function TextField({placeholder, type, name, value, func, src}: Props) {
    return (
        <div className={styles.textField}>
            <input 
                placeholder={placeholder} 
                type={type} 
                name={name} 
                value={value}
                onChange={func}
                required
            />
            <img src={src} alt="" />
        </div>
    );
}