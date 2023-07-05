/* eslint-disable react-hooks/exhaustive-deps */

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import styles from './AddCategories.module.css';

import { Category } from './components/Categories/Category';

import { FooterHome } from '@/components/FooterHome/FooterHome';
import { Button } from '@/components/Button/Button';
import { TextFieldSmall } from '@/components/TextFieldSmall/TextFieldSmall';
import { Combobox } from '@/components/Combobox/Combobox';

import useFetchData from '@/hooks/useFetchData';
import { ICategoryRegistered } from '@/interfaces/ICategory';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import useCookiesSession from "@/hooks/useCookiesSession";
import { PostLogged } from "@/components/PostLogged";
import { ButtonBack } from "@/components/ButtonBack/ButtonBack";


export function AddCategories() {

    const [editMode, setEditMode] = useState(false);
    const [idEdited, setIdEdited] = useState("");

    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [listCategories, setListCategories] = useState<ICategoryRegistered[]>([]);

    const { data, error, fetchData, isLoading, ok } = useFetchData<ICategoryRegistered[]>();

    const location = useLocation();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();


    useEffect(() => {
        if (location?.state?.tournamentId) {
            fetchData(Requests.getCategories(location.state.tournamentId, getCookieToken()))
        }
        else {
            navigate(Routes.home);
        }
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            if (ok && data) {
                if (listCategories.length === 0) {
                    setListCategories([...listCategories].concat(data));
                }
                else {
                    addCategoriesState((data as unknown) as ICategoryRegistered);
                }
            }
        }, 100);
    }, [data]);



    const schema = yup.object().shape({
        description: yup.string().required("Digite uma descrição"),
        numberAthletes: yup.string().required().typeError("digite um valor"),
        numberAthletesRegistration: yup.string().required().typeError("selecione uma opção")
    });

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    async function submit(dataForm: any) {
        if (editMode) {
            fetchData(Requests.updateCategory({ ...dataForm, tournamentId: location.state.tournamentId }, parseInt(idEdited), getCookieToken()));
            setEditMode(false);
        }
        else {
            fetchData(Requests.createCategory({ ...dataForm, tournamentId: location.state.tournamentId }, getCookieToken()));
        }
        reset();
    }

    function addCategoriesState(category: ICategoryRegistered) {
        let arr = listCategories.filter(c => c.id !== category.id);
        arr.push(category);
        setListCategories(arr);
    }

    function removeCategory(id: string) {
        fetchData(Requests.deleteCategory(parseInt(id), getCookieToken()));
        let arr = listCategories.filter(c => c.id !== parseInt(id));
        setListCategories(arr);
    }

    function editCategoryState(id: string) {
        const category = listCategories.find((c) => c.id === parseInt(id)) as ICategoryRegistered;
        setValue("description", category.description);
        setValue("numberAthletes", category.numberAthletes);
        setValue("numberAthletesRegistration", category.numberAthletesRegistration);
        setEditMode(true);
        setIdEdited(id);
    }


    return (
        <div className={styles.container}>

            <PostLogged.Header>
                <ButtonBack onClick={() => navigate(Routes.listTournaments)}/>
                <p>Adicionar Categorias</p>
            </PostLogged.Header>

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
                    <Button>Adicionar</Button>
                </form>

                {error &&
                    <p>{error}</p>
                }

                <div className={styles.listCategories}>
                    {listCategories.map((c: ICategoryRegistered, key: number) => (
                        <Category
                            key={key}
                            category={c.description}
                            id={`${c.id}`}
                            edit={editCategoryState}
                            del={removeCategory}
                        />
                    ))}
                </div>

            </main>

            <FooterHome />

        </div>
    );
}
