
import styles from './ItemListButtons.module.css';
import { HTMLAttributes, ReactNode } from 'react';

interface ItemListButtonsProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
}

export function ItemListButtons({ children, ...props}: ItemListButtonsProps) {

    return (
        <div {...props}>
            <div className={styles.wrapper}>
                <div className={styles.elements}>
                    {children}
                </div>
            </div>
        </div>
    );

}