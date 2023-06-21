
import styles from './Categories.module.css';
import imgEdit from '../../../../assets/edit.svg';
import imgDelete from '../../../../assets/delete.svg';

type Props = {
    categorie: string;
}

export function Categories({ categorie }: Props) {

    return (
        <div className={styles.categorie}>
            <div className={styles.elements}>
                <p className={styles.text}>{categorie}</p>
                <div className={styles.imgs}>
                    <img src={imgEdit} alt="" />
                    <img src={imgDelete} alt="" />
                </div>
            </div>
            <hr />
        </div>
    );

}
