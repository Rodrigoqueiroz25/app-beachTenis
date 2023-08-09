
import styles from '../styles.module.css'

import { ICategoryGetResponse } from 'interfaces/ICategory';
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import { Button } from 'components/Button/Button';
import { PostLogged } from 'components/PostLogged';
import { stringToDate } from 'helper/convertData';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from 'helper/isAdmin';
import { Routes } from 'enums/routes.enum';


interface MainContentProps {
    dataTournament: ITournamentDataGetResponse;
    listCategories?: ICategoryGetResponse[];
    removeCategory: (id: string) => void;
    editCategory: (id: string) => void;
}


export function List({ dataTournament, listCategories, removeCategory, editCategory }: MainContentProps) {

    const navigate = useNavigate();

    return (
        <div className={styles.list}>
            {listCategories && listCategories?.map((category: ICategoryGetResponse, key: number) => (
                <PostLogged.Item.Wrapper key={key}>
                    <div className={styles.itemList}>
                        <PostLogged.Item.Text text={category.description} />
                        <PostLogged.Item.Photos />
                        <PostLogged.Item.Text small text={`${category.numberRegistration} inscrito(s) de ${category.numberAthletes}`} />
                        {!isAdmin() && (stringToDate(dataTournament.dtStartRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() ?
                            <Button small onClick={() => navigate(Routes.registerPlayerCategory, { state: { category: category } })}>Inscrever</Button> : <></>
                        }

                        {!isAdmin() && (stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalTournament) as Date).getTime() ?
                            <Button small>Jogos</Button> : <></>
                        }
                        {isAdmin() &&
                            <>
                                <Button small onClick={() => editCategory(category.id)}>Editar</Button>
                                <Button small onClick={() => removeCategory(category.id)}>Remover</Button>
                            </>
                        }

                    </div>
                </PostLogged.Item.Wrapper>
            ))}
        </div>
    );
}