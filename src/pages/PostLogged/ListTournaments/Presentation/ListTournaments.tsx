
import styles from '../styles.module.css'
import { Routes } from 'enums/routes.enum';
import logoTour from 'assets/logoTour.jpg';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import { dateFinalTournament, dateStartTournament, description, organization } from 'constants/wordsPhrases';
import { ItemListTournament } from './ItemListTournament';


interface ListTournamentsProps {
    listTournaments?: ITournamentDataGetResponse[];
    funcBtnAccess: (id: number) => void;
    funcBtnConfigure: (tournament: ITournamentDataGetResponse) => void;
}


export function ListTournaments({ listTournaments, funcBtnAccess, funcBtnConfigure }: ListTournamentsProps) {

    return (
        <>
            <div className={styles.list}>
                {listTournaments?.map((tournament: ITournamentDataGetResponse, key: number) => (
                    <ItemListTournament 
                        tournament={tournament} 
                        funcBtnAccess={funcBtnAccess} 
                        funcBtnConfigure={funcBtnConfigure}
                        key={key}
                    />
                ))}
            </div>
        </>
    );
}