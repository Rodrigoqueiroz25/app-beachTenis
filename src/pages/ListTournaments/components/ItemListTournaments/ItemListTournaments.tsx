
import styles from './ItemListTournaments.module.css';

import logoTour from '../../../../assets/logoTour.jpg';
import image1 from '../../../../assets/image1.svg';
import image2 from '../../../../assets/image2.svg';
import { ButtonSmall } from '../../../../components/ButtonSmall/ButtonSmall';

export function ItemListTournaments() {

    return (
        <div className={styles.tournament}>
            <img className={styles.logo} src={logoTour} alt="logo do torneio" />
            <div className={styles.dataIcons}>
                <p className={styles.period}>25/09/2022 à 01/10/2022</p>
                <div className={styles.photos}>
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                    <img src={image1} alt="" />
                </div>
            </div>
            <div className={styles.txt}>
                <p className={styles.description}>Ravenna Beach Tennis</p>
                <p className={styles.informations}>1º zumbee Fitness Open de beach tennis</p>
            </div>
            <div className={styles.buttons}>
                <ButtonSmall text='Acessar'/>
                <ButtonSmall text='Configurar'/>
            </div>
            
        </div>
    );
}