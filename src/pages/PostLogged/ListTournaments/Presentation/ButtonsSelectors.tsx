
import { useEffect, useState } from 'react';
import styles from '../styles.module.css';

interface ButtonsSelectorsProps {
    onClick: (value: boolean) => void;
}

export function ButtonsSelectors({ onClick }: ButtonsSelectorsProps) {

    const [inProgress, setInProgress] = useState(true);

    function handleClick() {
        setInProgress(!inProgress);
    }

    useEffect(() => {
        onClick(inProgress);
    }, [inProgress]);

    return (
        <div className={styles.buttons}>
            <button
                value="andamento"
                onClick={handleClick}
                className={inProgress ? `${styles.focus}` : ""}
            >Em andamento</button>

            <button
                value="finalizado"
                onClick={handleClick}
                className={!inProgress ? `${styles.focus}` : ""}
            >Finalizado</button>
        </div>
    );
}