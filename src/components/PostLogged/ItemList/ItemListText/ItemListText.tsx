
import styles from './ItemListText.module.css';

interface ItemListTextProps {
    text: string;
    small?: boolean;
}

export function ItemListText({text, small}: ItemListTextProps){
    
    const className = small ? styles.small : styles.normal;

    return (
        <div>
            <p className={`${styles.text} ${className} `}>{text}</p>
        </div>
    );
}