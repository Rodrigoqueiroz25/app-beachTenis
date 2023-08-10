
import { IRegistrationGetResponse } from 'interfaces/IRegistrations';
import styles from './styles.module.css';
import image1 from 'assets/image1.svg';


interface ListPlayersProps {
    listPlayers: IRegistrationGetResponse[];
}

export function ListPlayers({listPlayers}: ListPlayersProps) {

    return (
        <ul className={styles.list}>
            {listPlayers?.map((item, k) => (
                <>
                    <li key={k} className={styles.item}>
                        {item.athletes.map((athlete, k) => (
                            <div className={styles.photoName} key={k}>
                                <img className={styles.photo} src={image1} alt="" />
                                <p className={styles.name}>{athlete.name}</p>
                            </div>
                        ))}
                    </li>
                    <div className={styles.line}></div>
                </>
            ))}
        </ul>
    );
}