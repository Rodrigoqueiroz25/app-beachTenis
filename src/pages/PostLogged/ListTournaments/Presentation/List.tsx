
import styles from '../styles.module.css'
import { Routes } from '@/enums/routes.enum';
import logoTour from '@/assets/logoTour.jpg';
import { Button } from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from '@/components/PostLogged';
import { isAdmin } from '@/helper/isAdmin';
import { ITournamentDataGetAllResponse } from '@/interfaces/ITournament';



interface ListProps {
    listTournaments?: ITournamentDataGetAllResponse[];
}

export function List({listTournaments}: ListProps) {

    const navigate = useNavigate();

    function access(tournament: ITournamentDataGetAllResponse): void {
        navigate(`${Routes.tournamentLessParam}/${tournament.id}`)
    }

    function configure(tournament: ITournamentDataGetAllResponse): void{
        navigate(Routes.editTournament, { state: { tournament: tournament }});
    }

    return (
        <>
            {listTournaments?.map((d: ITournamentDataGetAllResponse, key: number) => (
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
                                <Button small onClick={() => configure(d)}>Configurar</Button>
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