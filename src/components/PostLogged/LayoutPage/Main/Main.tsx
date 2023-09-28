
import { ReactNode } from 'react';
import styles from './styles.module.css';


interface HeaderProps {
    children: ReactNode;
}

export function Main({ children }: HeaderProps) {
    return (
        <main className={styles.main} >
            {children}
        </main>
    );
}