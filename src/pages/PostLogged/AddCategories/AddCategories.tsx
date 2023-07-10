/* eslint-disable react-hooks/exhaustive-deps */

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import styles from './AddCategories.module.css';

import { Category } from './components/Categories/Category';

import { Button } from '@/components/Button/Button';

import useFetchData from '@/hooks/useFetchData';
import { ICategoryRegistered } from '@/interfaces/ICategory';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import useCookiesSession from "@/hooks/useCookiesSession";
import { PostLogged } from "@/components/PostLogged";
import { ButtonBack } from "@/components/PostLogged/ButtonBack/ButtonBack";
import { ITournamentRegistered } from "@/interfaces/ITournament";


export function AddCategories() {

    const [editMode, setEditMode] = useState(false);
    const [idEdited, setIdEdited] = useState("");

    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [listCategories, setListCategories] = useState<ICategoryRegistered[]>([]);
    const [dataTournament, setDataTournament] = useState<ITournamentRegistered>({} as ITournamentRegistered);
    const { data, error, fetchData, isLoading, ok } = useFetchData<ICategoryRegistered[]>();

    const location = useLocation();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();


    useEffect(() => {
        if (location?.state?.tournament) {
            fetchData(Requests.getCategories(location.state.tournament.id, getCookieToken()));
            setDataTournament(location.state.tournament);
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
        numberAthletes: yup.string().required("digite um valor"),
        numberAthletesRegistration: yup.string().required("selecione uma opção")
    });

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    async function submit(dataForm: any) {
        if (editMode) {
            fetchData(Requests.updateCategory({ ...dataForm, tournamentId: dataTournament.id }, parseInt(idEdited), getCookieToken()));
            setEditMode(false);
        }
        else {
            fetchData(Requests.createCategory({ ...dataForm, tournamentId: dataTournament.id }, getCookieToken()));
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
        <>
            <PostLogged.Layout
                header={
                    <>
                        <ButtonBack onClick={() => navigate(`${Routes.tournamentLessParam}/${location.state.tournament.id}`, { state: { tournament: location.state.tournament } })} />
                        <p>Adicionar Categorias</p>
                    </>
                }
                main={
                    <>
                        <form className={styles.form} onSubmit={handleSubmit(submit)}>
                            <PostLogged.Input
                                label='Descrição'
                                name='description'
                                type='text'
                                placeholder='Descrição'
                                register={register}
                                msgError={errors.description?.message}
                            />

                            <PostLogged.Combobox
                                label='Quantidade de pessoas por inscrição'
                                name='numberAthletesRegistration'
                                register={register}
                                errors={errors}
                                data={list}
                                watch={watch("numberAthletesRegistration")}
                            />

                            <PostLogged.Input
                                label='Quantidade máxima de inscritos'
                                name='numberAthletes'
                                type='number'
                                placeholder='Quantidade máxima de inscritos'
                                register={register}
                                msgError={errors.numberAthletes?.message}
                            />
                            <div className={styles.spaceButton}></div>
                            <Button>{editMode ? "Alterar" : "Adicionar"}</Button>
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
                    </>
                }
            />
            {/* <PostLogged.Header>
                <ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                <p>Adicionar Categorias</p>
            </PostLogged.Header>
            <PostLogged.Main>
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
                    <Button>{editMode ? "Alterar" : "Adicionar"}</Button>
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

            </PostLogged.Main>
            <FooterHome /> */}
        </>
    );
}
