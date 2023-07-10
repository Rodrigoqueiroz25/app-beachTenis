
import { HTMLAttributes } from 'react';
import styles from './ButtonPlus.module.css';
import plus from '@/assets/add.svg';

interface ButtonPlusProps extends HTMLAttributes<HTMLDivElement> {
    
}

export function ButtonPlus(props: ButtonPlusProps){

    return (
        <div
            {...props}
            className={styles.button}
        >
            <img src={plus} alt="" />
        </div>
    );
}