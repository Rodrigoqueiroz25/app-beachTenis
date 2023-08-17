
import styles from '../styles.module.css';
import imgLocation from 'assets/location.svg'
import { useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { ICity } from 'interfaces/ICity';
import { PostLogged } from 'components/PostLogged';
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import logoTour from 'assets/logoTour.jpg';
import { Button } from 'components/Button/Button';
import { isAdmin } from 'helper/isAdmin';
import { dateFinalTournament, dateStartTournament, description, organization } from 'constants/wordsPhrases';

interface MainContentProps {
    cities: ICity[];
    tournaments?: ITournamentDataGetResponse[];
}


export function MainContent({ cities, tournaments }: MainContentProps) {

    const navigate = useNavigate();

    function handleClickViewAllTournaments() {
        navigate(Routes.listTournaments);
    }

    function handleClickViewAllRanking() {
        //nothing
    }

    return (
        <>
            <div className={styles.location}>
                <img src={imgLocation} alt="" />
                <select className={styles.list}>
                    {cities?.map((citie, key) => (
                        <option value={citie.id} key={key}>{citie.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.buttonsChoiceSport}>
                <button className={styles.btnBeachTenis}>Beach Tennis</button>
                <button className={styles.btnHockey}>Hockey</button>
                <button className={styles.btnTenis}>Tennis</button>
            </div>

            <section className={styles.tournaments}>
                <div className={styles.headerSection}>
                    <p className={styles.title}>Torneios</p>
                    <p className={styles.link}
                        onClick={handleClickViewAllTournaments}
                    >Ver todos</p>
                </div>

                <div className={styles.tournament}>

                    {tournaments?.map((tournament, key) => (
                        <div className={styles.item} key={key}>
                            <img className={styles.logo} src={logoTour} alt="logo do torneio" />
                            <div className={styles.wrapper}>
                                <PostLogged.Item.Wrapper>
                                    <div className={styles.itemList}>
                                        <PostLogged.Item.Period dtInit={tournament[dateStartTournament]} dtFinal={tournament[dateFinalTournament]} />
                                        <PostLogged.Item.Photos />
                                        <PostLogged.Item.Text small text="3.2 km" />
                                        <PostLogged.Item.Text text={tournament[organization]} />
                                        <PostLogged.Item.Text small text={tournament[description]} />
                                        <PostLogged.Item.Text small text="Fee: Free" />
                                        {!isAdmin() &&
                                            <Button small onClick={() => navigate(`${Routes.tournamentLessParam}/${tournament.id}`)}>Inscrição</Button>
                                        }
                                        
                                    </div>
                                </PostLogged.Item.Wrapper>
                            </div>
                        </div>
                    ))}


                </div>

            </section>

            <section className={styles.ranking}>
                <div className={styles.headerSection}>
                    <p className={styles.title}>Ranking</p>
                    <p className={styles.link}
                        onClick={handleClickViewAllRanking}
                    >Ver todos</p>
                </div>

                <div className={styles.peoples}>
                    
                </div>
            </section>
        </>
    );
}