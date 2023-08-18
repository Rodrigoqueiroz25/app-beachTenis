
import { Link } from 'react-router-dom';
import styles from './styles.module.css';


interface LinkOtherPageProps {
    text: string;
    textLink: string;
    endPoint: string;
}

export function LinkOtherPage({ text, textLink, endPoint }: LinkOtherPageProps) {

    return (
        <p className={styles.text}>
            {text}
            <Link className={styles.link} to={endPoint}>
                {textLink}
            </Link>
        </p>
    );
}