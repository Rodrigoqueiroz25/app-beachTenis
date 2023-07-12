
import styles from '../styles.module.css';

import { PostLogged } from '@/components/PostLogged';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button/Button';
import { ICity } from '@/interfaces/ICity';
import { ISport } from '@/interfaces/ISport';
import { yupResolver } from '@hookform/resolvers/yup';
import { Validations } from '@/helper/Validations';


interface MainContentProps {
    submit: any;
    cities: ICity[];
    sports: ISport[];
}


export function MainContent({submit, sports, cities}: MainContentProps) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formTournament)
    });

    return (
        <>
            <PostLogged.AddBanner />
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
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
                    msgError={errors.sportId?.message}
                    options={sports.map(s => s.description)}
                    idOptions={sports.map(s => s.id)}
                    isEmpty={watch('sportId') ? false : true}
                />

                <PostLogged.Combobox
                    label='Cidade'
                    name='cityId'
                    register={register}
                    msgError={errors.cityId?.message}
                    options={cities.map(c => c.name)}
                    idOptions={cities.map(s => s.id)}
                    isEmpty={watch('cityId') ? false : true}
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
    );
}