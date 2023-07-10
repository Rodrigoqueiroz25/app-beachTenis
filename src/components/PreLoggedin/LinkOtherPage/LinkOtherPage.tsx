
import { Link } from 'react-router-dom';
import styles from './LinkOtherPage.module.css';


interface LinkOtherPageProps {
    text?: string;
    textLink?: string;
    endPoint?: string;
}

export function LinkOtherPage({text, textLink, endPoint}) {

    return (
        <p className={styles.dontHaveRegister}>
            {text}
            <Link className={styles.link} to={endPoint}>
                {textLink}
            </Link>
        </p>
    );
}