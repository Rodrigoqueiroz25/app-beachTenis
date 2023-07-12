
import { useState } from 'react';

import styles from '../styles.module.css'
import logo from '@/assets/logoTour.jpg';

import { ICategoryRegistered } from '@/interfaces/ICategory';

import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Informations } from './Informations/Informations';
import { categories, informations } from '@/constants/constants';

import { Button } from '@/components/Button/Button';
import { PostLogged } from '@/components/PostLogged';
import { stringToDate } from '@/helper/convertData';


interface MainContentProps {
    dataTournament: ITournamentRegistered;
    listCategories?: ICategoryRegistered[];
}

export function MainContent({dataTournament, listCategories}: MainContentProps) {

    const [presentation, setPresentation] = useState(categories);
 

    function handleClickCategories() {
        setPresentation(categories);
    }

    function handleClickInformations() {
        setPresentation(informations);
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
                    {listCategories?.map((category: ICategoryRegistered, key: number) => (
                        <PostLogged.Item.Wrapper key={key}>
                            <div className={styles.itemList}>
                                <PostLogged.Item.Text text={category.description} />
                                <PostLogged.Item.Photos />
                                <PostLogged.Item.Text small text={category.numberAthletes} />
                                {(stringToDate(dataTournament.dtStartRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() ?
                                    <Button small>Inscrever</Button> : <></>
                                }

                                {(stringToDate(dataTournament.dtFinalRegistration) as Date).getTime() <= new Date().getTime() && new Date().getTime() <= (stringToDate(dataTournament.dtFinalTournament) as Date).getTime() ?
                                    <Button small>Jogos</Button> : <></>
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