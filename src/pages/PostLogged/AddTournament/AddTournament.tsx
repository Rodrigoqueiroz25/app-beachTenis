/* eslint-disable react-hooks/exhaustive-deps */

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';

import styles from './AddTournament.module.css';
import { Button } from '@/components/Button/Button';
import { convertData } from '@/helper/convertData';
import useFetchData from '@/hooks/useFetchData';
import request from '@/helper/request';
import useCookiesSession from '@/hooks/useCookiesSession';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { ICity } from '@/interfaces/ICity';
import { ISport } from '@/interfaces/ISport';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import { PostLogged } from "@/components/PostLogged";
import { Validations } from "@/helper/Validations";


export function AddTournament() {

    const { fetchData, data, isLoading, ok, error } = useFetchData<ITournamentRegistered>();

    const [sports, setSports] = useState<ISport[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);

    const { getCookieToken } = useCookiesSession();

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formTournament)
    });


    useEffect(() => {
        setTimeout(async () => {
            let sports = await request<ISport[]>(Requests.getSports(getCookieToken()));
            if (sports.ok) {
                setSports(sports.data as ISport[]);
            }
            let cities = await request<ICity[]>(Requests.getCities(getCookieToken()));
            if (cities.ok) {
                setCities(cities.data as ICity[]);
            }
        }, 200);
    }, []);


    function saveDataform(data: any) {
        fetchData(Requests.createTournament({
            description: data.description,
            cityId: data.cityId,
            sportId: data.sportId,
            dtStartTournament: convertData(data.dtStartTournament),
            dtFinalTournament: convertData(data.dtFinalTournament),
            dtStartRegistration: convertData(data.dtStartRegistration),
            dtFinalRegistration: convertData(data.dtFinalRegistration),
            otherInformation: data.otherInformation,
            organization: data.organization
        }, getCookieToken()));
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {ok &&
                <Navigate to={Routes.addCategories} state={{ tournament: data }} />
            }

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um torneio</p>
                    </>
                }
                main={
                    <>
                        <PostLogged.AddBanner />
                        <form className={styles.form} onSubmit={handleSubmit(saveDataform)}>
                            <PostLogged.Input
                                label='Descrição'
                                name='description'
                                type='text'
                                placeholder='Descrição'
                                register={register}
                                msgError={errors.description?.message}
                            />

                            <PostLogged.Input
                                label='Organização'
                                name='organization'
                                type='text'
                                placeholder='Organização'
                                register={register}
                                msgError={errors.organization?.message}
                            />


                            <PostLogged.Combobox
                                label='Esporte'
                                name='sportId'
                                register={register}
                                errors={errors}
                                data={sports.map(s => s.description)}
                                ids={sports.map(s => s.id)}
                                watch={watch('sportId')}
                            />

                            <PostLogged.Combobox
                                label='Cidade'
                                name='cityId'
                                register={register}
                                errors={errors}
                                data={cities.map(c => c.name)}
                                ids={cities.map(s => s.id)}
                                watch={watch('cityId')}
                            />


                            <div className={styles.paragraph}>
                                <p >Período de Inscrições</p>
                                <hr />
                            </div>

                            <div className={styles.inputDates}>
                                <div className={styles.input}>
                                    <PostLogged.Input
                                        label='Data início'
                                        name='dtStartRegistration'
                                        placeholder='Data início'
                                        type="date"
                                        register={register}
                                        msgError={errors.dtStartRegistration?.message}
                                    />
                                </div>
                                <div className={styles.input}>
                                    <PostLogged.Input
                                        label='Data Final'
                                        name='dtFinalRegistration'
                                        placeholder='Data Final'
                                        type="date"
                                        register={register}
                                        msgError={errors.dtFinalRegistration?.message}
                                    />
                                </div>
                            </div>

                            <div className={styles.paragraph}>
                                <p >Período do Torneio</p>
                                <hr />
                            </div>

                            <div className={styles.inputDates}>
                                <div className={styles.input}>
                                    <PostLogged.Input
                                        label='Data inicial'
                                        name='dtStartTournament'
                                        placeholder='Data inicial'
                                        type="date"
                                        register={register}
                                        msgError={errors.dtStartTournament?.message}
                                    />
                                </div>
                                <div className={styles.input}>
                                    <PostLogged.Input
                                        label='Data Final'
                                        name='dtFinalTournament'
                                        placeholder='Data Final'
                                        type="date"
                                        register={register}
                                        msgError={errors.dtFinalTournament?.message}
                                    />
                                </div>
                            </div>

                            <textarea className={styles.info}
                                placeholder='Outras informações'
                                {...register("otherInformation")}
                            ></textarea>

                            <Button>Salvar</Button>
                        </form>
                    </>
                }

            />
        </>
    );
}