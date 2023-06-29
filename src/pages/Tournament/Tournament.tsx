
import styles from './Tournament.module.css';
import logo from '../../assets/logoTour.jpg';
import { FooterHome } from '../../components/FooterHome/FooterHome';
import { useEffect, useState } from 'react';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';
import { useLocation, useParams } from 'react-router-dom';
import { CategoryRegistered } from '../../types/category';
import { ItemListCategories } from './components/ItemListTournaments/ItemListCategories';
import useFetchData from '@/hooks/useFetchData';
import { ICategoryRegistered } from '@/interfaces/ICategory';

const categories = "Categorias";
const informations = "Informações";

export function Tournament(){

    const { fetchData, data, error, isLoading, ok } = useFetchData<ICategoryRegistered[]>();

    const [presentation, setPresentation] = useState(categories);

    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        if(params.id){
            fetchData('GET', `category/loadByTournament?tournamentId=${params.id}`);
        }
    }, [error]);

    function handleClickCategories(){
        setPresentation(categories);
    }

    function handleClickInformations(){
        setPresentation(informations);
    }


    return (    
        <div className={styles.container}>
            
            <header className={styles.header}>
                <div className={styles.title}>
                    <ButtonBack endPoint='/list-tournaments'/>
                    <p>{presentation}</p>
                </div>
                <div className={styles.tournament}>
                    <img src={logo} alt=""/>
                    <p>{location.state.tournament.description}</p>
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
            
            { presentation === "Categorias" &&

                <div className={styles.list}>
                    {data?.map((category: CategoryRegistered, key: number) => (
                        <ItemListCategories dataCategory={category} key={key}/>
                    ))}
                </div>

            }

            { presentation === "Informações" &&

                <div></div>

            }

            <FooterHome/>
            
        </div>
        
    );
}