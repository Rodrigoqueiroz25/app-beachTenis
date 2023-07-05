
import { ReactNode } from 'react';
import styles from './PostLoggedHeader.module.css';


interface PostLoggedHeaderProps {
    children: ReactNode;
}

export function PostLoggedHeader({children}: PostLoggedHeaderProps){

    return (
        <header className={styles.header}>
            {children}
        </header>
    );
}