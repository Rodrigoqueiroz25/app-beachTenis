
import styles from './Button.module.css';

type Props = {
    text: string;
}

export function Button({text}:Props){
    return (
        <button className={styles.button}>{text}</button>
    );
}