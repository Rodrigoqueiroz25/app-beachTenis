
import { IMaskInput } from 'react-imask';
import styles from './TextField.module.css';

type Props = {
    placeholder: string;
    type: string;
    name?: string;
    value?: string;
    func?: any;
    mask?: string;
    src?: string;
}

export function TextField({placeholder, type, name, value, func, src, mask}: Props) {
    return (
        <div className={styles.textField}>
            <IMaskInput 
                placeholder={placeholder} 
                mask={mask}
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