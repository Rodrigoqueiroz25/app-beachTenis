
import styles from './styles.module.css';
import imgSearch from 'assets/search.svg';
import imgBell from 'assets/bell.svg';
import photoHome from 'assets/photo_home.svg';


interface HeaderHomeProps {
    nameUser: string
}

export function HeaderHome({nameUser}: HeaderHomeProps) {
    return (
        <div className={styles.header} >
            <div className={styles.photoNameUser}>
                <img src={photoHome} alt="" />
                <p>Olá, {nameUser}</p>
            </div>
            <div className={styles.icons}>
                <img src={imgSearch} alt="" />
                <img src={imgBell} alt="" />
            </div>
        </div>
    )
}