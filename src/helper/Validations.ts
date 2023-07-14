
import *  as yup from "yup";
import { dateDayActual, parseDateString } from "./convertData";


export class Validations {

    public static formCreateProfile = yup.object().shape({
        firstName: yup.string().required("Digite seu nome."),
        lastName: yup.string().required("Digite seu sobrenome."),
        dateBirthday: yup.date().transform(parseDateString).min(new Date('1900-01-01'), "data deve ser maior").required("insira uma data.").typeError("insira uma data."),
    });

    public static radioGroupGender = yup.object().shape({
        gender: yup.string().required("Marque um opção")
    });

    public static formCreateUser = yup.object().shape({
        email: yup.string().email("digite um email válido.").required("Digite um email para entrar."),
        phoneNumber: yup.string().required("digite um número de telefone.").matches(new RegExp('([(][0-9]{2}[)][0-9]{5}[-][0-9]{4}$)'),"número de telefone inválido"),
        passwd: yup.string().required("Digite a nova senha."),
        repPasswd: yup.string().required("digite novamente a nova senha.")
            .test("repeatPasswd", "as duas senhas digitadas devem ser iguais", function (value) {
                return this.parent.passwd === value;
            })
    });

    public static formForgotPasswd = yup.object().shape({
        email: yup.string().email("digite um email válido.").required("Digite um email para entrar.")
    });

    public static formCreatePasswd = yup.object().shape({
        passwd: yup.string().required("Digite a nova senha."),
        repPasswd: yup.string().required("digite novamente a nova senha.")
            .test("repeatPasswd", "as duas senhas digitadas devem ser iguais", function (value) {
                return this.parent.passwd === value;
            })
    });

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
        phone: yup.string().required("digite um número de telefone.").max(14, "numero de telefone inválido").matches(new RegExp('([(][0-9]{2}[)][0-9]{5}$[-][0-9]{4}$)'),"número de telefone inválido"),
        city: yup.string().required("selecione uma opção"),
        dateBirthday: yup.string().required("digite algo")
    });

    public static dateOfBirthFieldForm = yup.object().shape({
        birthday: yup.date().transform(parseDateString).min(new Date('1900-01-01'), "data deve ser maior").typeError("Campo não deve estar em branco")
    });



}