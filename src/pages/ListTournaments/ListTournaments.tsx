
import { MouseEventHandler, useEffect } from 'react';

import styles from './ListTournaments.module.css';
import { FooterHome } from '@/components/FooterHome/FooterHome';
import leftArrow from '@/assets/set_left.svg';
import addImg from '@/assets/add.svg';
import useFetchData from '@/hooks/useFetchData';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Routes } from '@/enums/routes.enum';
import { Requests } from '@/helper/Requests';
import useCookiesSession from '@/hooks/useCookiesSession';
import { ButtonSwitchScreen } from '@/components/ButtonSwitchScreen/ButtonSwitchScreen';
import logoTour from '@/assets/logoTour.jpg';
import { Button } from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ItemList } from '@/components/ItemList';



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
        <div className={styles.container}>

            <header className={styles.title}>
                <ButtonSwitchScreen endPoint={Routes.home} icon={leftArrow} />
                <p>Torneios</p>
                <ButtonSwitchScreen endPoint={Routes.addTournament} icon={addImg} />
            </header>

            <main className={styles.main}>

                {data?.map((d: ITournamentRegistered, key: number) => (
                    <ItemList.Wrapper key={key}>
                        <div className={styles.itemList}>
                            <img src={logoTour} alt="logo do torneio" />
                            <ItemList.Period dtInit={d.dtStartTournament} dtFinal={d.dtFinalTournament} />
                            <ItemList.Photos />
                            <ItemList.Text text={d.organization} />
                            <ItemList.Text small text={d.description} />
                            {sessionStorage.getItem('isAdmin') === 'true'
                                ?
                                <>
                                    <Button small onClick={() => access(d)} >Acessar</Button>
                                    <Button small >Configurar</Button>
                                </>
                                :
                                <>
                                    <Button small  >Acessar</Button>
                                </>
                            }
                        </div>
                    </ItemList.Wrapper>
                ))}

            </main>

            <FooterHome />

        </div>

    );
}