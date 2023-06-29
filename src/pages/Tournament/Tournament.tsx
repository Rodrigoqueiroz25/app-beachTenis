
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './Tournament.module.css';
import logo from '@/assets/logoTour.jpg';

import { FooterHome } from '@/components/FooterHome/FooterHome';
import { ButtonBack } from '@/components/ButtonBack/ButtonBack';
import { ItemListCategories } from './components/ItemListTournaments/ItemListCategories';
import { ICategoryRegistered } from '@/interfaces/ICategory';

import useFetchData from '@/hooks/useFetchData';
import { Request, getRequestArgs } from '@/helper/getRequestArgs';

const categories = "Categorias";
const informations = "Informações";

export function Tournament(){

    const { fetchData, data, error, isLoading, ok } = useFetchData<ICategoryRegistered[]>();

    const [presentation, setPresentation] = useState(categories);

    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        if(params.id){
            fetchData(getRequestArgs(Request.getCategories, params.id))
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
                    {data?.map((category: ICategoryRegistered, key: number) => (
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