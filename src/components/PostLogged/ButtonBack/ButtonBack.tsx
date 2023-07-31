
import { HTMLAttributes } from 'react';
import styles from './ButtonBack.module.css';
import back from 'assets/set_left.svg';


interface ButtonBackProps extends HTMLAttributes<HTMLDivElement> {
    
}

export function ButtonBack(props: ButtonBackProps){

    return (
        <div
            {...props}
            className={styles.button}
        >
            <img src={back} alt="seta para esquerda" />
        </div>
    );
}