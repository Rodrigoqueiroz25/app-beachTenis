
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './Tournament.module.css';
import logo from '@/assets/logoTour.jpg';

import { FooterHome } from '@/components/FooterHome/FooterHome';
import { ButtonBack } from '@/components/ButtonBack/ButtonBack';
import { ItemListCategories } from './components/ItemListTournaments/ItemListCategories';
import { ICategoryRegistered } from '@/interfaces/ICategory';

import useFetchData from '@/hooks/useFetchData';
import { Request, getRequestArgs } from '@/helper/getRequestArgs';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Informations } from './components/Informations/Informations';
import { categories, informations } from '@/constants/constants';
import { Routes } from '@/enums/routes.enum';


export function Tournament(){

    const { fetchData, data, error, isLoading, ok } = useFetchData<ICategoryRegistered[]>();

    const [presentation, setPresentation] = useState(categories);
    const [dataTournament, setDataTournament] = useState<ITournamentRegistered>({} as ITournamentRegistered);

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if(!location.state?.tournament){
            navigate(Routes.listTournaments);
        }
        else{
            setDataTournament(location.state.tournament);
        }
    }, [location.state.tournament, navigate]);

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
                    <ButtonBack endPoint={Routes.listTournaments}/>
                    <p>Torneio</p>
                </div>
                <div className={styles.tournament}>
                    <img src={logo} alt=""/>
                    <p>{location.state?.tournament.description}</p>
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

                <Informations infoTournament={dataTournament} />

            }

            <FooterHome/>
            
        </div>
        
    );
}