
import styles from './ItemListPeriod.module.css';

interface ItemListPeriodProps {
    dtInit: string;
    dtFinal: string;
}

export function ItemListPeriod({dtInit, dtFinal}: ItemListPeriodProps){
    
    return (
        <div className={styles.period}>
            <p className={styles.period}>{dtInit} à {dtFinal}</p>
        </div>
    );
}