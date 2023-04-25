
import React, { ReactNode } from 'react';
import styles from './HeaderLogin.module.css';

type Props = {
    children: ReactNode;
}

export function HeaderLogin({children}: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.divBlue}>
            </div>
            <div className={styles.divWhite}>                
                {children}
            </div>
        </div>
    );
}