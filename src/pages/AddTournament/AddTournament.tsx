/* eslint-disable react-hooks/exhaustive-deps */

import { FooterHome } from '../../components/FooterHome/FooterHome';
import styles from './AddTournament.module.css';
import photo from '../../assets/photo.svg';
import image from '../../assets/image.svg';
import { Button } from '../../components/Button/Button';
import { TextFieldSmall } from '../../components/TextFieldSmall/TextFieldSmall';
import { Combobox } from '../../components/Combobox/Combobox';
import useGetFetch from '../../hooks/useGetFetch';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { City, Sport } from '../../types/login';

import { useForm } from  "react-hook-form";
import { yupResolver } from  "@hookform/resolvers/yup";
import  *  as yup from  "yup";
import { DataFieldSmall } from '../../components/DataFieldSmall/DataFieldSmall';


export function AddTournament() {

    const { getData, msgFailedGet, error } = useGetFetch();
    const [sports, setSports] = useState<Sport[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() =>{
        setTimeout(async () => {
            setSports(await getData('sports'));
        }, 200);
    }, [msgFailedGet, error]);

    useEffect(() =>{
        setTimeout(async () => {
            setCities(await getData('cities'));
        }, 200);
    }, [msgFailedGet, error]);



    //-----------------------------validator hook-------------------------------------------

    function teste(data: any){
        console.log(data)
        //transformar as datas em strings.
        //fazer requisição aqui.
    }

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

    const { register, handleSubmit, watch, formState: { errors }, reset } =  useForm({
        resolver: yupResolver(schema)
    });


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    return (       
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

                <form className={styles.form} onSubmit={handleSubmit(teste)}>
                    
                
                    <TextFieldSmall 
                        label='Descrição' 
                        name='description'
                        placeholder='Descrição'  
                        register={register}
                        errors={errors}
                    />

                    <TextFieldSmall 
                        label='Organização' 
                        name='organization'
                        placeholder='Organização' 
                        register={register}
                        errors={errors}
                    />
                    
                    
                    <Combobox
                        label='Esporte'
                        field='description'
                        name='sportId'
                        register={register}
                        errors={errors}
                        data={sports}
                        watch={watch('sportId')}
                    />

                    <Combobox
                        label='Cidade'
                        field='name'
                        name='cityId'
                        register={register}
                        errors={errors}
                        data={cities}
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
                        // value={dataForm.otherInformation}
                        // onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {setDataForm({...dataForm, otherInformation: e.target.value})}}
                    ></textarea>

                    <Button text='Salvar'/>
                </form>

            </main>

            <FooterHome />

        </div>
    );
}