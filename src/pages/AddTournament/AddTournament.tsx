/* eslint-disable react-hooks/exhaustive-deps */

import  *  as yup from  "yup";
import { yupResolver } from  "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { useForm } from  "react-hook-form";
import { Navigate } from 'react-router-dom';

import styles from './AddTournament.module.css';
import photo from '@/assets/photo.svg';
import image from '@/assets/image.svg';
import { FooterHome } from '@/components/FooterHome/FooterHome';
import { Button } from '@/components/Button/Button';
import { TextFieldSmall } from '@/components/TextFieldSmall/TextFieldSmall';
import { Combobox } from '@/components/Combobox/Combobox';
import { DataFieldSmall } from '@/components/DataFieldSmall/DataFieldSmall';
import { convertData } from '@/helper/convertData';
import useFetchData from '@/hooks/useFetchData';
import request from '@/helper/request';
import useCookiesSession from '@/hooks/useCookiesSession';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { ICity } from '@/interfaces/ICity';
import { ISport } from '@/interfaces/ISport';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";


export function AddTournament() {

    const { fetchData, data, isLoading, ok, error } = useFetchData<ITournamentRegistered>();
    
    const [sports, setSports] = useState<ISport[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);

    const { getCookieToken } = useCookiesSession();

    useEffect(() =>{
        setTimeout(async () => {
            let sports = await request<ISport[]>(Requests.getSports(getCookieToken()));
            if(sports.ok){
                setSports(sports.data as ISport[]);
            }
            let cities = await request<ICity[]>(Requests.getCities(getCookieToken()));
            if(cities.ok){
                setCities(cities.data as ICity[]);
            }
        }, 200);   
    }, []);

    const schema = yup.object().shape({
        description: yup.string().required("Digite uma descrição"),
        organization: yup.string().required("Digite algo"),
        cityId: yup.string().required("selecione uma opção"),
        sportId: yup.string().required("selecione uma opção"),
        dtStartTournament: yup.date().nullable().min(new Date(), "data deve ser maior que a atual").typeError("digite uma data"),
        dtFinalTournament: yup.date().nullable().min(new Date(), "data deve ser maior que a atual").typeError("digite uma data"),
        dtStartRegistration: yup.date().nullable().min(new Date(), "data deve ser maior que a atual").typeError("digite uma data"),
        dtFinalRegistration: yup.date().nullable().min(new Date(), "data deve ser maior que a atual").typeError("digite uma data"),
        otherInformation: yup.string()   
    });

    const { register, handleSubmit, watch, formState: { errors } } =  useForm({
        resolver: yupResolver(schema)
    });

    function saveDataform(data: any){
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
            { isLoading && 
                <p>isLoading</p>
            }

            { ok &&
                <Navigate to={Routes.addCategories} state={{tournamentId: data?.id}}/>
            }

            <div className={styles.container}>
                
                <header className={styles.title}>
                    <p>Adicione um Torneio</p>
                </header>

                <main>
                    <div className={styles.iconWrapper}>
                        <div className={styles.iconContainer}>
                            <img className={styles.icon} src={image} alt="" />
                            <img className={styles.iconPhoto} src={photo} alt="" />
                        </div>
                        <div className={styles.addBanner}>
                            <p>Adicione um banner</p>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit(saveDataform)}>
                        
                    
                        <TextFieldSmall 
                            label='Descrição' 
                            name='description'
                            type='text'
                            placeholder='Descrição'  
                            register={register}
                            errors={errors}
                        />

                        <TextFieldSmall 
                            label='Organização' 
                            name='organization'
                            type='text'
                            placeholder='Organização' 
                            register={register}
                            errors={errors}
                        />
                        
                        
                        <Combobox
                            label='Esporte'
                            name='sportId'
                            register={register}
                            errors={errors}
                            data={sports.map(s => s.description)}
                            ids={sports.map(s => s.id)}
                            watch={watch('sportId')}
                        />

                        <Combobox
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
                                <DataFieldSmall
                                    label='Data início'
                                    name='dtStartRegistration' 
                                    placeholder='Data início'  
                                    register={register}
                                    errors={errors}
                                />
                            </div>      
                            <div className={styles.input}>
                                <DataFieldSmall
                                    label='Data Final'
                                    name='dtFinalRegistration' 
                                    placeholder='Data Final'  
                                    register={register}
                                    errors={errors}
                                />
                            </div>  
                        </div>

                        <div className={styles.paragraph}>
                            <p >Período do Torneio</p>
                            <hr />
                        </div>
                        
                        <div className={styles.inputDates}>
                            <div className={styles.input}>
                            <DataFieldSmall
                                    label='Data inicial'
                                    name='dtStartTournament' 
                                    placeholder='Data inicial'  
                                    register={register}
                                    errors={errors}
                                />
                            </div>      
                            <div className={styles.input}>
                                <DataFieldSmall
                                    label='Data Final'
                                    name='dtFinalTournament' 
                                    placeholder='Data Final'  
                                    register={register}
                                    errors={errors}
                                />
                            </div>  
                        </div>

                        <textarea className={styles.info} 
                            placeholder='Outras informações'
                            {...register("otherInformation")}
                        ></textarea>

                        <Button>Salvar</Button>
                    </form>

                </main>

                <FooterHome />

            </div>
        </>
    );
}