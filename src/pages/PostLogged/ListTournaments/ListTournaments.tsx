
import { useEffect } from 'react';

import styles from './ListTournaments.module.css';
import useFetchData from '@/hooks/useFetchData';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Routes } from '@/enums/routes.enum';
import { Requests } from '@/helper/Requests';
import useCookiesSession from '@/hooks/useCookiesSession';
import logoTour from '@/assets/logoTour.jpg';
import { Button } from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';

import { PostLogged } from '@/components/PostLogged';
import { isAdmin } from '@/helper/isAdmin';



export function ListTournaments() {

    const { fetchData, data, error, isLoading, ok } = useFetchData<ITournamentRegistered[]>();
    const { getCookieToken } = useCookiesSession();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(Requests.getTournaments(getCookieToken()));
    }, [error]);

    function access(tournament: ITournamentRegistered): void {
        navigate(`${Routes.tournamentLessParam}/${tournament.id}`, { state: { tournament: tournament } })
    }

    return (

        <PostLogged.Layout
            header={
                <>
                    <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                    <p>Torneios</p>
                    {isAdmin() &&
                        <PostLogged.ButtonPlus onClick={() => navigate(Routes.addTournament)} />
                    }
                </>
            }
            main={
                <>
                    {data?.map((d: ITournamentRegistered, key: number) => (
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
            }
        />
    );
}