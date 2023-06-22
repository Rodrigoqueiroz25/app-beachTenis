/* eslint-disable react-hooks/exhaustive-deps */

import { FooterHome } from '../../components/FooterHome/FooterHome';
import styles from './AddCategories.module.css';
import { Button } from '../../components/Button/Button';
import { TextFieldSmall } from '../../components/TextFieldSmall/TextFieldSmall';
import { Combobox } from '../../components/Combobox/Combobox';

import { useForm } from  "react-hook-form";
import { yupResolver } from  "@hookform/resolvers/yup";
import  *  as yup from  "yup";
import { useState } from 'react';
import { Categories } from './components/Categories/Categories';
import { Categorie } from '../../types/login';
import { useLocation } from 'react-router-dom';


export function AddCategories() {

    const [list, setList] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [listCategories, setListCategories] = useState<Categorie[]>([]);
    
    const location = useLocation();

    const schema = yup.object().shape({
        description: yup.string().required("Digite uma descrição"),
        numberAthletes: yup.number().required("Digite algo"),
        numberAthletesRegistration: yup.string().required("selecione uma opção")
    });

    const { register, handleSubmit, watch, formState: { errors }, reset } =  useForm({
        resolver: yupResolver(schema)
    });

    function addCategorie(data: any){
        console.log(data)
        setListCategories([...listCategories, data as Categorie]);
        //fazer requisição aqui.
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
                    {listCategories.map((c: Categorie, key: number) => (
                        <Categories key={key} categorie={c.description}/>
                    ))}
                </div>

            </main>

            <FooterHome />

        </div>
    );
}
