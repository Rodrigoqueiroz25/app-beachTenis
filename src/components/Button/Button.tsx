
import styles from './Button.module.css';

type Props = {
    texto: string;
}

export function Button({texto}:Props){
    return (
        <button className={styles.botao}>{texto}</button>
    );
}