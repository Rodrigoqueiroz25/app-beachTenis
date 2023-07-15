
import styles from '../styles.module.css'
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Routes } from '@/enums/routes.enum';

import logoTour from '@/assets/logoTour.jpg';
import { Button } from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';

import { PostLogged } from '@/components/PostLogged';
import { isAdmin } from '@/helper/isAdmin';


interface ListProps {
    listTournaments?: ITournamentRegistered[];
}

export function List({listTournaments}: ListProps) {

    const navigate = useNavigate();

    function access(tournament: ITournamentRegistered): void {
        navigate(`${Routes.tournamentLessParam}/${tournament.id}`, { state: { tournament: tournament } })
    }

    return (
        <>
            {listTournaments?.map((d: ITournamentRegistered, key: number) => (
                <PostLogged.Item.Wrapper key={key}>
                    <div className={styles.itemList}>
                        <img src={logoTour} alt="logo do torneio" />
                        <PostLogged.Item.Period dtInit={d.dtStartTournament} dtFinal={d.dtFinalTournament} />
                        <PostLogged.Item.Photos />
                        <PostLogged.Item.Text text={d.organization} />
                        <PostLogged.Item.Text small text={d.description} />
                        {isAdmin()
                            ?
                            <>
                                <Button small onClick={() => access(d)} >Acessar</Button>
                                <Button small >Configurar</Button>
                            </>
                            :
                            <>
                                <Button small onClick={() => access(d)} >Acessar</Button>
                            </>
                        }
                    </div>
                </PostLogged.Item.Wrapper>
            ))}
        </>
    );
}