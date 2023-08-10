
import styles from './ItemListPhoto.module.css';
import image1 from 'assets/image1.svg';
import image2 from 'assets/image2.svg';


interface ItemListPhotoProps {

}

export function ItemListPhoto() {

    return (
        <div className={styles.photos}>
            <img src={image1} alt="" />
        </div>
    );
}