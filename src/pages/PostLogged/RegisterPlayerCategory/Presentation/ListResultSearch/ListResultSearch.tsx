
import { IUserAccount } from 'interfaces/IUserAccount';
import styles from './styles.module.css';
import { PostLogged } from 'components/PostLogged';
import { Button } from 'components/Button/Button';


interface ListResultSearchProps{
    players: IUserAccount[];
    handleClick: (idPlayer: string) => void;
}

export function ListResultSearch({players, handleClick}: ListResultSearchProps) {

    return (
        <div className={styles.list}>
            {players?.map((player, k) => (
                <div className={styles.item}>
                    <PostLogged.Item.Wrapper key={k}>
                        <div className={styles.itemList}>
                            <PostLogged.Item.Photo />
                            <PostLogged.Item.Text text={player.name} />
                            <Button small onClick={() => handleClick(player.id!)}>Inscrever</Button>
                        </div>
                    </PostLogged.Item.Wrapper>
                </div>
            ))}
        </div>
    );
}