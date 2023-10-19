

import { Team } from 'models/Team';
import styles from './styles.module.css';
import image1 from 'assets/image1.svg';
import { PostLogged } from 'components/PostLogged';


interface ListPlayersProps {
    listPlayers: Team[];
}

export function ListPlayers({listPlayers}: ListPlayersProps) {

    return (
        <ul className='list'>
            {listPlayers?.map((item, k) => (
                <PostLogged.Item.Wrapper key={k}>
                    <li key={k} className={styles.item}>
                        {item.athletes?.map((athlete, k) => (
                            <div className={styles.photoName} key={k}>
                                <img className={styles.photo} src={image1} alt="" />
                                <p className={styles.name}>{athlete.name}</p>
                            </div>
                        ))}
                    </li>
                    {/* <div className={styles.line}></div> */}
                </PostLogged.Item.Wrapper>
            ))}
        </ul>
    );
}