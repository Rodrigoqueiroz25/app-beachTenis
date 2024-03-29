

import styles from './styles.module.css';
import { PostLogged } from 'components/PostLogged';
import { Button } from 'components/Button/Button';
import { UserAccount } from 'models/UserAccount';


interface ListResultSearchProps{
    players: UserAccount[];
    handleClick: (player: UserAccount) => void;
}

export function ListResultSearch({players, handleClick}: ListResultSearchProps) {

    return (
        <div className='list'>
            {players?.map((player, k) => (
                <div className={styles.item} key={k}>
                    <PostLogged.Item.Wrapper>
                        <div className={styles.itemList}>
                            <PostLogged.Item.Photo />
                            <PostLogged.Item.Text text={player.name} />
                            <Button small onClick={() => handleClick(player)}>Selecionar</Button>
                        </div>
                    </PostLogged.Item.Wrapper>
                </div>
            ))}
        </div>
    );
}