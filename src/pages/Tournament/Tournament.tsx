
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './Tournament.module.css';
import logo from '@/assets/logoTour.jpg';

import { FooterHome } from '@/components/FooterHome/FooterHome';
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
import { ButtonSwitchScreen } from '@/components/ButtonSwitchScreen/ButtonSwitchScreen';
import { Button } from '@/components/Button/Button';
import { ItemList } from '@/components/ItemList';


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
        <div className={styles.container}>

            <header className={styles.header}>
                <div className={styles.title}>
                    <ButtonSwitchScreen endPoint={Routes.listTournaments} icon={leftArrow} />
                    <p>Torneio</p>
                    <ButtonSwitchScreen endPoint={Routes.addCategories} icon={addImg} />
                </div>
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
                        <ItemList.Wrapper key={key}>
                            <div className={styles.itemList}>
                                <ItemList.Text text={category.description} />
                                <ItemList.Photos />
                                <ItemList.Text small text={category.numberAthletes} />
                                <Button small>Jogos</Button>
                            </div>
                        </ItemList.Wrapper>
                    ))}
                </div>

            }

            {presentation === "Informações" &&

                <Informations infoTournament={dataTournament} />

            }

            <FooterHome />

        </div>

    );
}