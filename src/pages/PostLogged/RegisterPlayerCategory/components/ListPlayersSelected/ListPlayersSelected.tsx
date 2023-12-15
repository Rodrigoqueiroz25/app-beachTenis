
import styles from './styles.module.css';
import image1 from 'assets/image1.svg';
import del from 'assets/delete.svg';
import { PostLogged } from 'components/PostLogged';
import { UserAccount } from 'models/UserAccount';
import { Button } from 'components/Button/Button';
import useCookiesSession from 'hooks/useCookiesSession';


type PlayerProps = {
    id: number;
    name: string | undefined;
    isCurrentUser?: boolean;
    removePlayerSelected?: (idPlayer: number) => void;
}

function Player({ id, name, isCurrentUser = false, removePlayerSelected = () => '' }: PlayerProps) {
    return (
        <li className={styles.item}>
            <div className={styles.photoName}>
                <img className={styles.photo} src={image1} alt="" />
                <p className={styles.name}>{name}</p>
                {!isCurrentUser ?
                    <img src={del} alt="remover player" onClick={() => removePlayerSelected(id)} />
                    : <></>
                }
            </div>
        </li>
    );
}



type ListPlayersProps = {
    playersSelected: UserAccount[];
    onCancel: (str: string) => void;
    onConfirm: () => void;
    removePlayerSelected: (idPlayer: number) => void;
}

export function ListPlayersSelected({ playersSelected, removePlayerSelected, onCancel, onConfirm }: ListPlayersProps) {

    const { getCookieNameUser } = useCookiesSession();

    return (
        <>
            <ul className='list' style={{ marginTop: '4rem' }}>
                <span className={styles.title}>Meu Time</span>
                <PostLogged.Item.Wrapper>
                    <div className={styles.list}>
                        <Player id={0} isCurrentUser name={getCookieNameUser()} />
                        {playersSelected?.map((player, k) => (
                            <Player key={k} id={player.id} name={player.name} removePlayerSelected={removePlayerSelected} />
                        ))}
                    </div>
                </PostLogged.Item.Wrapper>
            </ul>
            <div className={styles.btns}>
                <Button medium onClick={onConfirm}>Confirmar</Button>
                <Button medium onClick={() => onCancel('teamsRegistered')}>Cancelar</Button>
            </div>

        </>
    );
}