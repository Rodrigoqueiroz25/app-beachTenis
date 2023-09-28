
import { ReactNode } from 'react';
import styles from './styles.module.css';


interface HeaderDivProps {
    children: ReactNode;
}

export function HeaderDiv({children}: HeaderDivProps){
    return(
        <div className={styles.headerDiv}>
            {children}
        </div>
    );
}