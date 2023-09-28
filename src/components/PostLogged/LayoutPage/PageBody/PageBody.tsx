
import { HTMLAttributes } from 'react';
import styles from './style.module.css';
import { Footer } from '../Footer/Footer';

interface PageBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: JSX.Element[];
}

export function PageBody({ children }: PageBodyProps) {
    return (
        <div className={styles.pageBody}>
            {children?.map((child, i) => {
                return child;
            })}
            <Footer />
        </div>

    );
}