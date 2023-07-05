/* eslint-disable react-hooks/exhaustive-deps */

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useFetchData from '@/hooks/useFetchData';
import useCookiesSession from '@/hooks/useCookiesSession';

import styles from './AddTournamentSponsor.module.css';

import { FooterHome } from '@/components/FooterHome/FooterHome';
import { Button } from '@/components/Button/Button';
import { TextFieldSmall } from '@/components/TextFieldSmall/TextFieldSmall';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import { PostLogged } from "@/components/PostLogged";
import { ButtonBack } from "@/components/ButtonBack/ButtonBack";
import { AddBanner } from "@/components/AddBanner/AddBanner";
import { ITournamentSponsorRegistered } from "@/interfaces/ITournamentSponsor";


export function AddTournamentSponsor() {

    const { fetchData, data, isLoading, ok, error } = useFetchData<ITournamentSponsorRegistered>();

    const { getCookieToken } = useCookiesSession();

    const navigate = useNavigate();
    const params = useParams();


    const schema = yup.object().shape({
        name: yup.string().required("Digite um nome"),
        otherInformation: yup.string()
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function saveDataform(data: any) {
        fetchData(Requests.createTournamentSponsor({
            name: data.name,
            otherInformation: data.otherInformation,
            tournamentId: params.tournamentId as string,
        }, getCookieToken()));
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {/* {ok &&
                <Navigate to={Routes.} state={} />
            } */}

            <div className={styles.container}>

                <PostLogged.Header>
                    <ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                    <p>Adicione um Patrocínio</p>
                </PostLogged.Header>
                <main>
                    <AddBanner />
                    <form className={styles.form} onSubmit={handleSubmit(saveDataform)}>
                        <TextFieldSmall
                            label='Nome'
                            name='name'
                            type='text'
                            placeholder='Nome'
                            register={register}
                            errors={errors}
                        />

                        <textarea className={styles.info}
                            placeholder='Outras informações'
                            {...register("otherInformation")}
                        ></textarea>
                        <div className={styles.button}>
                            <Button>Salvar</Button>
                        </div>
                    </form>

                </main>

                <FooterHome />

            </div>
        </>
    );
}