
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';
import { Footer } from '../Footer/Footer';

interface LayoutProps extends HTMLAttributes<HTMLDivElement>{
    header: ReactNode;
    main: ReactNode;
}

export function Layout({header, main}: LayoutProps){
    return (
        <>
            <header className={styles.header}>
                {header}
            </header>
            <main className={styles.main}>
                {main}
            </main>
            <Footer/>
        </>
        
    );
}