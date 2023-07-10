
import { HTMLAttributes, ReactNode } from 'react';
import styles from './ItemListWrapper.module.css';

interface ItemListProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
}

export function ItemListWrapper(props: ItemListProps){
    
    return (
        <div {...props}>
            <div className={styles.wrapper}>
                {props.children}
            </div>
        </div>
    );
}