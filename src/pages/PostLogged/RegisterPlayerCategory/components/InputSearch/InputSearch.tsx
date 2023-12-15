
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import searchImg from 'assets/searchbx.svg';

type Props = {
    onClickButtonSearch: (str: string) => void;
    isCompleteTeam: boolean;
}

export const InputSearch = ({ onClickButtonSearch, isCompleteTeam }: Props) => {

    const [textSearch, setTextSearch] = useState('');

    useEffect(() => {
        if (isCompleteTeam) {
            setTextSearch('');
        }
    }, [isCompleteTeam])

    return (
        <div className={styles.inputSearch}>
            <input
                className={styles.search}
                type="text"
                placeholder={isCompleteTeam ? 'time está completo' : 'Encontre seu parceiro'}
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                disabled={isCompleteTeam}
            />
            <img onClick={() => onClickButtonSearch(textSearch)} src={searchImg} alt="" />
        </div>
    )
}

