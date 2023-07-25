
import { useState } from 'react';

import styles from '../styles.module.css'
import logo from 'assets/logoTour.jpg';

import { ICategoryGetResponse } from 'interfaces/ICategory';
import { ITournamentDataGetByIdResponse } from 'interfaces/ITournament';
import { Informations } from './Informations/Informations';
import { categories, informations } from 'constants/constants';
import { Button } from 'components/Button/Button';
import { PostLogged } from 'components/PostLogged';
import { stringToDate } from 'helper/convertData';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { isAdmin } from 'helper/isAdmin';


interface MainContentProps {
    dataTournament: ITournamentDataGetByIdResponse;
    listCategories?: ICategoryGetResponse[];
    removeCategory: (id: string) => void;
}


export function MainContent({dataTournament, listCategories, removeCategory}: MainContentProps) {

    const [presentation, setPresentation] = useState(categories);

    const navigate = useNavigate();
 

    function handleClickCategories() {
        setPresentation(categories);
    }

    function handleClickInformations() {
        setPresentation(informations);
    }

    function editCategory(id: string){
        let category = listCategories?.find((c) => c.id === id);
        if(category){
            navigate(Routes.editCategory, { state: { category: category }})
        }
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.tournament}>
                    <img src={logo} alt="" />
                    <p>{dataTournament.description}</p>
                </div>
                <div className={styles.buttons}>
                    <button
                        value={categories}
                        onClick={handleClickCategories}
                        className={presentation === categories ? `${styles.focus}` : ""}
                    >Categorias</button>

                    <button
                        value={informations}
                        onClick={handleClickInformations}
                        className={presentation === informations ? `${styles.focus}` : ""}
                    >Informações</button>
                </div>
            </header>

            {presentation === "Categorias" &&
                <div className={styles.list}>
                    { listCategories && listCategories?.map((category: ICategoryGetResponse, key: number) => (
                        <PostLogged.Item.Wrapper key={key}>
                            <div className={styles.itemList}>
                                <PostLogged.Item.Text text={category.description} />
                                <PostLogged.Item.Photos />
                                <PostLogged.Item.Text small text={`${category.numberRegistration} inscrito(s) de ${category.numberAthletes}`} />
                                {!isAdmin() && (stringToDate(dataTournament.dtStartRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() ?
                                    <Button small>Inscrever</Button> : <></>
                                }

                                {!isAdmin() && (stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalTournament) as Date).getTime() ?
                                    <Button small>Jogos</Button> : <></>
                                }
                                { isAdmin() &&
                                    <>
                                        <Button small onClick={() => editCategory(category.id)}>Editar</Button>
                                        <Button small onClick={() => removeCategory(category.id)}>Remover</Button>
                                    </>
                                }
                                
                            </div>
                        </PostLogged.Item.Wrapper>
                    ))}
                </div>
            }

            {presentation === "Informações" &&
                <Informations infoTournament={dataTournament} />
            }
        </>

    );
}