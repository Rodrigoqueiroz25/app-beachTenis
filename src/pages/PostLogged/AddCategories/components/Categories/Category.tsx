
import styles from './Category.module.css';
import imgEdit from '@/assets/edit.svg';
import imgDelete from '@/assets/delete.svg';

type Props = {
    category: string
    id: string
    edit: (id: string) => void
    del: (id: string) => void

}

export function Category({ category, id, edit, del }: Props) {

    function edition(){
        edit(id);
    }

    function deletion(){
        del(id);
    }

    return (
        <div className={styles.category}>
            <div className={styles.elements}>
                <p className={styles.text}>{category}</p>
                <div className={styles.imgs}>
                    <img src={imgEdit} alt="" onClick={edition}/>
                    <img src={imgDelete} alt="" onClick={deletion}/>
                </div>
            </div>
            <hr />
        </div>
    );

}
