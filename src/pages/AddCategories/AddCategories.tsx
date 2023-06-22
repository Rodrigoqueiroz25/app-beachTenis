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

    const [ editMode, setEditMode ] = useState(false);
    const [ idEdited, setIdEdited ] = useState("");

    const [list, setList] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [listCategories, setListCategories] = useState<CategoryRegistered[]>([]);
    const { registerCategory, editCategory, isLoading, isRegistered, response } = useFetchCategory();
    
    const location = useLocation();

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
        numberAthletesRegistration: yup.number().required("selecione uma opção")
    });

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } =  useForm({
        resolver: yupResolver(schema)
    });

    async function submit(data: any){
        console.log(data);
        if(editMode){
            await editCategory({...data, tournamentId: location.state.tournamentId}, idEdited);
        }
        else{
            await registerCategory({...data, tournamentId: location.state.tournamentId});
        }
        reset();
    }

    function removeCategory(id: string){
        console.log(id);
    }

    function editionCategory(id: string){
        console.log(id);
        const category = listCategories.find((c) => c.id === parseInt(id)) as CategoryRegistered;
        setValue("description", category.description);
        setValue("numberAthletes", category.numberAthletes);
        setValue("numberAthletesRegistration", category.numberAthletesRegistration);
        setEditMode(true);
        setIdEdited(id);
    }


    return (       
        <div className={styles.container}>
            
            <header className={styles.title}>
                <p>Adicionar Categorias</p>
            </header>

            <main>

                <form className={styles.form} onSubmit={handleSubmit(submit)}>  
                
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
                
                { typeof response === "string" &&
                    <p>{response}</p>
                }
                <div className={styles.listCategories}>
                    {listCategories.map((c: CategoryRegistered, key: number) => (
                        <Category 
                            key={key} 
                            category={c.description}
                            id={`${c.id}`}
                            edit={editionCategory}
                            del={removeCategory}
                        />
                    ))}
                </div>

            </main>

            <FooterHome />

        </div>
    );
}
