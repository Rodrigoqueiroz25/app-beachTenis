
import { useNavigate } from 'react-router-dom';

import styles from './ItemListTournaments.module.css';
import logoTour from '@/assets/logoTour.jpg';
import image1 from '@/assets/image1.svg';
import image2 from '@/assets/image2.svg';
import { ButtonSmall } from '@/components/ButtonSmall/ButtonSmall';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Routes } from '@/enums/routes.enum';


type Props = {
    dataTournament: ITournamentRegistered
}

export function ItemListTournaments({ dataTournament }: Props) {

    const navigate = useNavigate();

    function access(){
        navigate(`${Routes.tournamentLessParam}/${dataTournament.id}`, { state: {tournament: dataTournament}})
    }
    
    function configure(){
        //nothing    
    }
    
    
    return (
        <div className={styles.tournament}>
            <img className={styles.logo} src={logoTour} alt="logo do torneio" />
            <div className={styles.dataIcons}>
                <p className={styles.period}>{dataTournament.dtStartTournament} à {dataTournament.dtFinalTournament}</p>
                <div className={styles.photos}>
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                    <img src={image1} alt="" />
                </div>
            </div>
            <div className={styles.txt}>
                <p className={styles.description}>{dataTournament.organization}</p>
                <p className={styles.informations}>{dataTournament.description}</p>
            </div>
            <div className={styles.buttons}>
                <ButtonSmall func={access} text='Acessar'/>
                <ButtonSmall func={configure} text='Configurar'/>
            </div>
            
        </div>
    );
}