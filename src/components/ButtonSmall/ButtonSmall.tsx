
import styles from './ButtonSmall.module.css';

type Props = {
    text: string;
    func?: () => void;
}

export function ButtonSmall({text, func}:Props){
    return (
        <button className={styles.button} onClick={func}>{text}</button>
    );
}