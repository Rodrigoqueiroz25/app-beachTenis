
import styles from './ItemListCategories.module.css';
import image1 from '@/assets/image1.svg';
import image2 from '@/assets/image2.svg';
import { Button } from '@/components/Button/Button';
import { ICategoryRegistered } from '@/interfaces/ICategory';

type Props = {
    dataCategory: ICategoryRegistered
}

export function ItemListCategories({ dataCategory }: Props) {

    function games(){
        //nothing
    }
    
    return (
        <div className={styles.category}>
            <div className={styles.infos}>
                <p className={styles.description}>{dataCategory.description}</p>
                <div className={styles.dataIcons}>
                    <div className={styles.photos}>
                        <img src={image1} alt="" />
                        <img src={image2} alt="" />
                        <img src={image1} alt="" />
                    </div>    
                </div>
                <p className={styles.numberAthletes}>{dataCategory.numberAthletes}</p>            
            </div>
            <div className={styles.buttons}>
                <Button small>Jogos</Button>
            </div>
            
        </div>
    );
}