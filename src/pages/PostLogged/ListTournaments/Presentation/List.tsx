
import styles from '../styles.module.css'
import { Routes } from 'enums/routes.enum';
import logoTour from 'assets/logoTour.jpg';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import { dateFinalTournament, dateStartTournament, description, organization } from 'constants/wordsPhrases';



interface ListProps {
    listTournaments?: ITournamentDataGetResponse[];
}

export function List({ listTournaments }: ListProps) {

    const navigate = useNavigate();

    function access(tournamentId: number): void {
        navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
    }

    function configure(tournament: ITournamentDataGetResponse): void {
        navigate(Routes.editTournament, { state: { tournament } });
    }

    return (
        <>
            <div className={styles.list}>
                {listTournaments?.map((tournament: ITournamentDataGetResponse, key: number) => (
                    <PostLogged.Item.Wrapper key={key}>
                        <div className={styles.itemList}>
                            <img src={logoTour} alt="logo do torneio" />
                            <PostLogged.Item.Period dtInit={tournament[dateStartTournament]} dtFinal={tournament[dateFinalTournament]} />
                            <PostLogged.Item.Photos />
                            <PostLogged.Item.Text text={tournament[organization]} />
                            <PostLogged.Item.Text small text={tournament[description]} />
                            <Button small onClick={() => access(tournament.id)} >Acessar</Button>
                            {isAdmin() &&
                                <Button small onClick={() => configure(tournament)}>Configurar</Button>
                            }
                        </div>
                    </PostLogged.Item.Wrapper>
                ))}
            </div>
        </>
    );
}