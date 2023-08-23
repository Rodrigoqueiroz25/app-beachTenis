
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';
import { Header } from '../Header/Header';
import { Footer } from 'components/PreLoggedin/LayoutPage/Footer/Footer';


interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    header?: ReactNode;
    main: ReactNode;
    footer?: ReactNode;
}

export function Layout({ header, main, footer }: LayoutProps) {

    return (
        <div className={styles.container}>
            {header &&
                <Header>
                    {header}
                </Header>
            }
            <main className={styles.main}>
                {main}
            </main>
            {footer &&
                <Footer>
                    {footer}
                </Footer>
            }
        </div>
    );
}