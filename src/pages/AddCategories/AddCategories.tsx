/* eslint-disable react-hooks/exhaustive-deps */

import { FooterHome } from '../../components/FooterHome/FooterHome';
import styles from './AddCategories.module.css';
import { Button } from '../../components/Button/Button';
import { TextFieldSmall } from '../../components/TextFieldSmall/TextFieldSmall';
import { Combobox } from '../../components/Combobox/Combobox';

import { useForm } from  "react-hook-form";
import { yupResolver } from  "@hookform/resolvers/yup";
import  *  as yup from  "yup";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchCategory from '../../hooks/useFetchCategory';
import { CategoryRegistered } from '../../types/category';
import { Category } from './components/Categories/Category';



export function AddCategories() {

    const [list, setList] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [listCategories, setListCategories] = useState<CategoryRegistered[]>([]);
    const { registerCategory, isLoading, isRegistered, response } = useFetchCategory();
    
    const location = useLocation();
    // console.log(location);

    useEffect(() =>{
        setTimeout(async () => {
            if(isRegistered){
                setListCategories([...listCategories, response as CategoryRegistered]);
            }
        }, 100);
    }, [response]);

    const schema = yup.object().shape({
        description: yup.string().required("Digite uma descrição"),
        numberAthletes: yup.number().required("Digite algo"),
        numberAthletesRegistration: yup.string().required("selecione uma opção")
    });

    const { register, handleSubmit, watch, formState: { errors }, reset } =  useForm({
        resolver: yupResolver(schema)
    });

    async function addCategorie(data: any){
        console.log(data);
        await registerCategory({...data, tournamentId: location.state.tournamentId});
    }

    function removeCategorie(){

    }

    function editCategorie(){

    }


    return (       
        <div className={styles.container}>
            
            <header className={styles.title}>
                <p>Adicionar Categorias</p>
            </header>

            <main>

                <form className={styles.form} onSubmit={handleSubmit(addCategorie)}>  
                
                    <TextFieldSmall 
                        label='Descrição' 
                        name='description'
                        type='text'
                        placeholder='Descrição'  
                        register={register}
                        errors={errors}
                    />

                    <Combobox
                        label='Quantidade de pessoas por inscrição'
                        name='numberAthletesRegistration'
                        register={register}
                        errors={errors}
                        data={list}
                        watch={watch("numberAthletesRegistration")}  
                    />

                    <TextFieldSmall 
                        label='Quantidade máxima de inscritos' 
                        name='numberAthletes'
                        type='number'
                        placeholder='Quantidade máxima de inscritos' 
                        register={register}
                        errors={errors}
                    />
                    <div className={styles.spaceButton}></div>
                    <Button text='Adicionar'/>
                </form>
                
                
                <div className={styles.listCategories}>
                    {listCategories.map((c: CategoryRegistered, key: number) => (
                        <Category key={key} categorie={c.description}/>
                    ))}
                </div>

            </main>

            <FooterHome />

        </div>
    );
}
