
import styles from './CampoTexto.module.css';

type Props = {
    placeholder: string;
    type: string;
    src: string;
}

export function CampoTexto({placeholder, type, src}: Props) {
    return (
        <div className={styles.campoTexto}>
            <input placeholder={placeholder} type={type} name="" />
            <img src={src} alt="" />
        </div>
    );
}