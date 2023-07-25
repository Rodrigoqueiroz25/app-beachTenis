
import styles from './ItemListPhotos.module.css';
import image1 from 'assets/image1.svg';
import image2 from 'assets/image2.svg';


interface ItemListPhotosProps {

}

export function ItemListPhotos() {

    return (
        <div className={styles.photos}>
            <img src={image1} alt="" />
            <img src={image2} alt="" />
            <img src={image1} alt="" />
        </div>
    );
}