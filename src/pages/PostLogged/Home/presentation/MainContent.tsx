
import styles from '../styles.module.css';
import imgLocation from 'assets/location.svg'
import photoRanking from 'assets/photo_ranking.svg';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { ICity } from 'interfaces/ICity';
import { PostLogged } from 'components/PostLogged';
import { ITournamentDataGetByIdResponse } from 'interfaces/ITournament';
import logoTour from 'assets/logoTour.jpg';
import { Button } from 'components/Button/Button';

interface MainContentProps {
    cities: ICity[];
    tournament?: ITournamentDataGetByIdResponse;
}


export function MainContent({ cities, tournament }: MainContentProps) {

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

                    {tournament &&
                        <>
                            <div className={styles.item}>
                                <img className={styles.logo} src={logoTour} alt="logo do torneio" />
                                <div className={styles.wrapper}>
                                    <PostLogged.Item.Wrapper>
                                        <div className={styles.itemList}>
                                            <PostLogged.Item.Period dtInit={tournament.dtStartTournament} dtFinal={tournament.dtFinalTournament} />
                                            <PostLogged.Item.Photos />
                                            <PostLogged.Item.Text text={tournament.organization} />
                                            <PostLogged.Item.Text small text={tournament.description} />
                                            <Button small>Inscrição</Button>
                                        </div>
                                    </PostLogged.Item.Wrapper>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <img className={styles.logo} src={logoTour} alt="logo do torneio" />
                                <div className={styles.wrapper}>
                                    <PostLogged.Item.Wrapper>
                                        <div className={styles.itemList}>
                                            <PostLogged.Item.Period dtInit={tournament.dtStartTournament} dtFinal={tournament.dtFinalTournament} />
                                            <PostLogged.Item.Photos />
                                            <PostLogged.Item.Text text={tournament.organization} />
                                            <PostLogged.Item.Text small text={tournament.description} />
                                            <Button small>Inscrição</Button>
                                        </div>
                                    </PostLogged.Item.Wrapper>
                                </div>
                            </div>

                        </>
                    }


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
                    <img src={photoRanking} alt="" />
                    <img src={photoRanking} alt="" />
                    <img src={photoRanking} alt="" />
                    <img src={photoRanking} alt="" />
                    <img src={photoRanking} alt="" />
                </div>
            </section>
        </>
    );
}