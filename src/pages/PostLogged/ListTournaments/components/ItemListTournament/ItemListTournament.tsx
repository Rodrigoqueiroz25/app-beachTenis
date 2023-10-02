
import styles from './styles.module.css'
import logoTour from 'assets/logoTour.jpg';
import { Button } from 'components/Button/Button';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'functions/isAdmin';
import { Tournament } from 'models/Tournament';


interface ItemListTournamentProps {
    tournament: Tournament;
    funcBtnAccess: (id: number) => void;
    funcBtnConfigure: (tournament: Tournament) => void;
}


export function ItemListTournament({ tournament, funcBtnAccess, funcBtnConfigure }: ItemListTournamentProps) {

    return (
        <>
            <PostLogged.Item.Wrapper>
                <div className={styles.itemList}>
                    <img src={logoTour} alt="logo do torneio" />
                    <PostLogged.Item.Period dtInit={tournament.periodRegistration.dateInitial.text} dtFinal={tournament.periodRegistration.dateFinal.text} />
                    <PostLogged.Item.Photos />
                    <PostLogged.Item.Text text={tournament.organization} />
                    <PostLogged.Item.Text small text={tournament.description} />
                    <Button small onClick={() => funcBtnAccess(tournament.id!)} >Acessar</Button>
                    {isAdmin() &&
                        <Button small onClick={() => funcBtnConfigure(tournament)}>Configurar</Button>
                    }
                </div>
            </PostLogged.Item.Wrapper>
        </>
    );
}