
import { ReactNode } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    children: ReactNode;
}

export function Header({ children }: HeaderProps) {
    return (
        <header className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.divBlue}>
                </div>
                <div className={styles.divWhite}>
                    {children}
                </div>
            </div>
        </header>
    );
}