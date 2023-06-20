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


    const [dataForm, setDataForm] = useState({
        description: "",
        organization: "",
        cityId: "",
        sportId: "",
        dtStartTournament: "",
        dtFinalTournament: "",
        dtStartRegistration: "",
        dtFinalRegistration: "",
        otherInformation: "",
    });


    function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(dataForm)
    }



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

                <form className={styles.form} onSubmit={handleSubmitForm}>
                    
                    <TextFieldSmall 
                        label='Descrição' 
                        placeholder='Descrição' 
                        type='text' 
                        value={dataForm.description}
                        func={(value: string) => setDataForm({...dataForm, description: value})}
                    />
                    
                    <TextFieldSmall 
                        label='Organização' 
                        placeholder='Organização' 
                        type='text' 
                        value={dataForm.organization}
                        func={(value: string) => setDataForm({...dataForm, organization: value})}
                    />
                    
                    <Combobox
                        label='Esporte'
                        field='description'
                        data={sports}
                        func={(value: string, id: string) => setDataForm({...dataForm, sportId: id})}
                    />

                    <Combobox
                        label='Cidade'
                        field='name'
                        data={cities}
                        func={(value: string, id: string) => setDataForm({...dataForm, cityId: id})}     
                    />

                    <div className={styles.paragraph}>
                        <p >Período de Inscrições</p>
                        <hr />
                    </div>
                     
                    <div className={styles.inputDates}>
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data início' 
                                placeholder='Data início' 
                                type='date' 
                                value={dataForm.dtStartRegistration}
                                func={(value: string) => setDataForm({...dataForm, dtStartRegistration: value})}
                            />
                        </div>      
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data final' 
                                placeholder='Data final' 
                                type='date' 
                                value={dataForm.dtFinalRegistration}
                                func={(value: string) => setDataForm({...dataForm, dtFinalRegistration: value})}
                            />  
                        </div>  
                    </div>

                    <div className={styles.paragraph}>
                        <p >Período do Torneio</p>
                        <hr />
                    </div>
                    
                    <div className={styles.inputDates}>
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data início' 
                                placeholder='Data início'
                                type='date'
                                value={dataForm.dtStartTournament}
                                func={(value: string) => setDataForm({...dataForm, dtStartTournament: value})}
                            />
                        </div>      
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data final' 
                                placeholder='Data final' 
                                type='date' 
                                value={dataForm.dtFinalTournament}
                                func={(value: string) => setDataForm({...dataForm, dtFinalTournament: value})}
                            />  
                        </div>  
                    </div>

                    <textarea className={styles.info} 
                        placeholder='Outras informações'
                        value={dataForm.otherInformation}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {setDataForm({...dataForm, otherInformation: e.target.value})}}
                    ></textarea>

                    <Button text='Salvar'/>
                </form>

            </main>

            <FooterHome />

        </div>
    );
}