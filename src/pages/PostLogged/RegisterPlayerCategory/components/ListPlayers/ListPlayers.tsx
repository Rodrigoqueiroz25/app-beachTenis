
import { Team } from 'models/Team';
import styles from './styles.module.css';
import image1 from 'assets/image1.svg';
import del from 'assets/delete.svg';
import { PostLogged } from 'components/PostLogged';


interface ListPlayersProps {
    listPlayers: Team[];
    removeTeam: (teamId: number) => void;
}

export function ListPlayers({listPlayers, removeTeam}: ListPlayersProps) {

    return (
        <ul className='list'>
            {listPlayers?.map((team, k) => (
                <PostLogged.Item.Wrapper key={k}>
                    <li key={k} className={styles.item}>
                        {team.athletes?.map((athlete, k) => (
                            <div className={styles.photoName} key={k}>
                                <img className={styles.photo} src={image1} alt="" />
                                <p className={styles.name}>{athlete.name}</p>
                                {athlete.canDeleted ? 
                                    <img src={del} alt="remover time" onClick={() => removeTeam(team.id)}/>
                                : <></>}
                            </div>
                        ))}
                    </li>
                    {/* <div className={styles.line}></div> */}
                </PostLogged.Item.Wrapper>
            ))}
        </ul>
    );
}