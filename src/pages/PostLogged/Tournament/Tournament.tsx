
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './Tournament.module.css';
import logo from '@/assets/logoTour.jpg';

import leftArrow from '@/assets/set_left.svg';
import addImg from '@/assets/add.svg';
import { ICategoryRegistered } from '@/interfaces/ICategory';

import useFetchData from '@/hooks/useFetchData';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Informations } from './components/Informations/Informations';
import { categories, informations } from '@/constants/constants';
import { Routes } from '@/enums/routes.enum';
import { Requests } from '@/helper/Requests';
import useCookiesSession from '@/hooks/useCookiesSession';

import { Button } from '@/components/Button/Button';
import { PostLogged } from '@/components/PostLogged';
import { isAdmin } from '@/helper/isAdmin';
import { stringToDate } from '@/helper/convertData';


export function Tournament() {

    const { fetchData, data, error, isLoading, ok } = useFetchData<ICategoryRegistered[]>();

    const [presentation, setPresentation] = useState(categories);
    const [dataTournament, setDataTournament] = useState<ITournamentRegistered>({} as ITournamentRegistered);

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();


    useEffect(() => {
        if (!location.state?.tournament) {
            navigate(Routes.listTournaments);
        }
        else {
            setDataTournament(location.state.tournament);
        }
    }, [location.state.tournament, navigate]);

    useEffect(() => {
        if (params.id) {
            fetchData(Requests.getCategories(parseInt(params.id), getCookieToken()))
        }
    }, [error]);


    function handleClickCategories() {
        setPresentation(categories);
    }

    function handleClickInformations() {
        setPresentation(informations);
    }

    return (
        <>
            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Torneio</p>
                        {isAdmin() &&
                            <PostLogged.ButtonPlus onClick={() => navigate(Routes.addCategories, { state: { tournament: dataTournament } })} />
                        }
                    </>
                }
                main={
                    <>
                        <header className={styles.header}>
                            <div className={styles.tournament}>
                                <img src={logo} alt="" />
                                <p>{location.state?.tournament.description}</p>
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    value={categories}
                                    onClick={handleClickCategories}
                                    className={presentation === categories ? `${styles.focus}` : ""}
                                >Categorias</button>

                                <button
                                    value={informations}
                                    onClick={handleClickInformations}
                                    className={presentation === informations ? `${styles.focus}` : ""}
                                >Informações</button>
                            </div>
                        </header>

                        {presentation === "Categorias" &&

                            <div className={styles.list}>
                                {data?.map((category: ICategoryRegistered, key: number) => (
                                    <PostLogged.Item.Wrapper key={key}>
                                        <div className={styles.itemList}>
                                            <PostLogged.Item.Text text={category.description} />
                                            <PostLogged.Item.Photos />
                                            <PostLogged.Item.Text small text={category.numberAthletes} />
                                            {(stringToDate(dataTournament.dtStartRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() ?
                                                <Button small>Inscrever</Button> : <></>
                                            }

                                            {(stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalTournament) as Date).getTime() ?
                                                <Button small>Jogos</Button> : <></>
                                            }
                                        </div>
                                    </PostLogged.Item.Wrapper>
                                ))}
                            </div>

                        }

                        {presentation === "Informações" &&

                            <Informations infoTournament={dataTournament} />

                        }
                    </>
                }
            />

        </>
    );
}