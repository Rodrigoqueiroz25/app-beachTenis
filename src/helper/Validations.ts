
import *  as yup from "yup";
import { dateDayActual, parseDateString } from "./convertData";


export class Validations {


    public static formLogin = yup.object().shape({
        email: yup.string().email("digite um email válido.").required("Digite um email para entrar."),
        passwd: yup.string().required("digite a senha para entrar."),
    });


    public static formCategories = yup.object().shape({
            description: yup.string().required("Digite uma descrição"),
            numberAthletes: yup.string().required("digite um valor"),
            numberAthletesRegistration: yup.string().required("selecione uma opção")
    });
    
    
    public static formTournament = yup.object().shape({
            description: yup.string().required("Digite uma descrição"),
            organization: yup.string().required("Digite algo"),
            cityId: yup.string().required("selecione uma opção"),
            sportId: yup.string().required("selecione uma opção"),
            dtStartRegistration: yup.date().min(dateDayActual(), "data deve ser igual ou posterior a atual").nullable().typeError("digite uma data"),
            dtFinalRegistration: yup.date().nullable().min(dateDayActual(), "data deve ser igual ou posterior a atual").typeError("digite uma data")
                .test("dateTest", "data final de registro deve ser igual ou posterior a inicial", function (value) {
                    return this.parent.dtStartRegistration <= (value as Date);
                }),
            dtStartTournament: yup.date().nullable().min(dateDayActual(), "data deve ser igual ou posterior a atual").typeError("digite uma data")
                .test("dateTest", "data deve ser posterior ao periodo de inscrição.", function (value) {
                    return this.parent.dtFinalRegistration < (value as Date);
                }),
            dtFinalTournament: yup.date().nullable().min(dateDayActual(), "data deve ser igual ou posterior a atual").typeError("digite uma data")
                .test("dateTest", "data final deve ser igual ou posterior a data inicial do torneio", function (value) {
                    return this.parent.dtStartTournament <= (value as Date);
                }),
            otherInformation: yup.string()
    });


    public static formTournamentSponsor = yup.object().shape({
        name: yup.string().required("Digite um nome"),
        otherInformation: yup.string()
    });


    public static formEditProfile = yup.object().shape({
        name: yup.string().required("campo nome não pode ser vazio"),
        email: yup.string().email().required("campo email não pode ser vazio"),
        phone: yup.string().min(14, "numero de telefone inválido").required("digite um número para contato"),
        city: yup.string().required("selecione uma opção"),
        dateBirthday: yup.string().required("digite algo")
    });

    public static dateOfBirthFieldForm = yup.object().shape({
        birthday: yup.date().transform(parseDateString).min(new Date('1900-01-01'), "data deve ser maior").typeError("Campo não deve estar em branco")
    });



}