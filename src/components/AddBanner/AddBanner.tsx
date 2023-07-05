
import styles from './AddBanner.module.css';
import photo from '@/assets/photo.svg';
import image from '@/assets/image.svg';

export function AddBanner() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.iconContainer}>
                <img className={styles.icon} src={image} alt="" />
                <img className={styles.iconPhoto} src={photo} alt="" />
            </div>
            <p className={styles.addBanner}>Adicione um banner</p>
        </div>
    );
}