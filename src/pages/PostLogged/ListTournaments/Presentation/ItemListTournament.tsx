
import styles from '../styles.module.css'
import logoTour from 'assets/logoTour.jpg';
import { Button } from 'components/Button/Button';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import { dateFinalTournament, dateStartTournament, description, organization } from 'constants/wordsPhrases';


interface ItemListTournamentProps {
    tournament: ITournamentDataGetResponse;
    funcBtnAccess: (id: number) => void;
    funcBtnConfigure: (tournament: ITournamentDataGetResponse) => void;
}


export function ItemListTournament({ tournament, funcBtnAccess, funcBtnConfigure }: ItemListTournamentProps) {

    return (
        <>
            {/* <div className={styles.list}> */}
                {/* {listTournaments?.map((tournament: ITournamentDataGetResponse, key: number) => ( */}
                    <PostLogged.Item.Wrapper>
                        <div className={styles.itemList}>
                            <img src={logoTour} alt="logo do torneio" />
                            <PostLogged.Item.Period dtInit={tournament[dateStartTournament]} dtFinal={tournament[dateFinalTournament]} />
                            <PostLogged.Item.Photos />
                            <PostLogged.Item.Text text={tournament[organization]} />
                            <PostLogged.Item.Text small text={tournament[description]} />
                            <Button small onClick={() => funcBtnAccess(tournament.id)} >Acessar</Button>
                            {isAdmin() &&
                                <Button small onClick={() => funcBtnConfigure(tournament)}>Configurar</Button>
                            }
                        </div>
                    </PostLogged.Item.Wrapper>
                {/* ))} */}
            {/* </div> */}
        </>
    );
}