
import *  as yup from "yup";
import { calcAgeFromDate, dateDayActual, parseDateString, stringToDate2 } from "./convertData";
import { city, dataDeveSerIgualMaiorQueAtual, dataDeveSerMaiorQue, dataDeveSerPosteriorPeriodoInscricao, dataFinalRegistroDeveSerIgualMaiorQueInicial, dataFinalTorneioDeveSerIgualMaiorQueInicial, dateBirthday, description, digiteData, digiteDescricao, digiteEmailValido, digiteNome, digiteNomeOrganizacao, digiteNovamenteSenha, digiteNumeroTelefone, digiteSenha, digiteSobrenome, digiteValorNumerico, dateFinalRegistration, dateFinalTournament, dateStartRegistration, dateStartTournament, email, firstName, gender, lastName, nameUser, maxNumberAthletesCategory, numberAthletesPerRegistration, numeroTelefoneInvalido, organization, otherInformation, password, phoneNumber, repeatPasswd, selecioneOpcao, senhasDigitadasDiferentes, sport, usuarioMaior18anos } from "constants/wordsPhrases";
import { digiteEmail } from "constants/wordsPhrases";


export class Validations {

    // public static formCreateProfile = yup.object().shape({
    //     [firstName]: yup.string().required(digiteNome),
    //     [lastName]: yup.string().required(digiteSobrenome),
    //     [dateBirthday]: yup.date().transform(parseDateString).min(new Date('1900-01-01'), dataDeveSerMaiorQue).required(digiteData).typeError(digiteData),
    //     [gender]: yup.string().required(selecioneOpcao),
    // });

    public static radioGroupGender = yup.object().shape({
        [gender]: yup.string().required(selecioneOpcao)
    });

    public static formCreateUser = yup.object().shape({
        [email]: yup.string().email(digiteEmailValido).required(digiteEmail),
        [phoneNumber]: yup.string().required(digiteNumeroTelefone).matches(new RegExp('([(][0-9]{2}[)][0-9]{5}[-][0-9]{4}$)'), numeroTelefoneInvalido),
        [password]: yup.string().required(digiteSenha),
        [repeatPasswd]: yup.string().required(digiteNovamenteSenha)
            // .test("repeatPasswd", senhasDigitadasDiferentes, function (value) {
            //     return this.parent.passwd === value;
            // })
    });

    public static formForgotPasswd = yup.object().shape({
        [email]: yup.string().email(digiteEmailValido).required(digiteEmail)
    });

    public static formCreateProfile = {
        [firstName]: {
            required: {
                value: true,
                message: digiteNome
            }
        },
        [lastName]: {
            required: {
                value: true,
                message: digiteSobrenome
            }
        },
        [dateBirthday]: {
            required: {
                value: true,
                message: digiteData
            },
            validate: {
                atLeast18YearsOld: (v: string) => calcAgeFromDate(v) >= 18 || usuarioMaior18anos
            }
        },
        [gender]: {
            required: {
                value: true,
                message: selecioneOpcao
            },
        },
    };

  
    public static formCreatePasswd = {
        [password]: {
            required: {
                value: true,
                message: digiteSenha
            }
        },
        [repeatPasswd]: (password: string) => {
            return {
                required: {
                    value: true,
                    message: digiteNovamenteSenha
                },
                validate: {
                    fieldsDiff: (v: string) => v === password || senhasDigitadasDiferentes
                }
            }
        }
    }


    public static formLogin = yup.object().shape({
        [email]: yup.string().email(digiteEmailValido).required(digiteEmail),
        [password]: yup.string().required(digiteSenha),
    });


    public static formCategories = yup.object().shape({
        [description]: yup.string().required(digiteDescricao),
        [maxNumberAthletesCategory]: yup.string().required(digiteValorNumerico),
        [numberAthletesPerRegistration]: yup.string().required(selecioneOpcao)
    });


    public static formTournament = {
        [description]: {
            required: {
                value: true,
                message: digiteDescricao
            }
        },
        [organization]: {
            required: {
                value: true,
                message: digiteNomeOrganizacao
            }
        },
        [city]: {
            required: {
                value: true,
                message: selecioneOpcao
            }
        },
        [sport]: {
            required: {
                value: true,
                message: selecioneOpcao
            }
        },
        [dateStartRegistration]: {
            required: {
                value: true,
                message: digiteData
            },
            validate: {
                minDate: (v) => stringToDate2(v)! >= dateDayActual() || dataDeveSerIgualMaiorQueAtual
            }
        },
        [dateFinalRegistration]: (dtStartRegistration: string) => {
            return {
                required: {
                    value: true,
                    message: digiteData
                },
                validate: {
                    biggerOrEqualdtStartRegist: (v: string) => stringToDate2(v)! >= stringToDate2(dtStartRegistration)! || dataFinalRegistroDeveSerIgualMaiorQueInicial
                }
            }
        },
        [dateStartTournament]: (dtFinalRegistration: string) => {
            return {
                required: {
                    value: true,
                    message: digiteData
                },
                validate: {
                    biggerdtFinalRegist: (v: string) => stringToDate2(v)! > stringToDate2(dtFinalRegistration)! || dataDeveSerPosteriorPeriodoInscricao
                }
            }
        },
        [dateFinalTournament]: (dtStartTournament: string) => {
            return {
                required: {
                    value: true,
                    message: digiteData
                },
                validate: {
                    biggerOrEqualdtStartTour: (v: string) => stringToDate2(v)! >= stringToDate2(dtStartTournament)! || dataFinalTorneioDeveSerIgualMaiorQueInicial
                }
            }
        },
        [otherInformation]: {
            required: {
                value: true,
                message: digiteNome
            }
        }
    };


    public static formTournamentSponsor = yup.object().shape({
        [nameUser]: yup.string().required(digiteNome),
        [otherInformation]: yup.string()
    });

    public static formEditProfile = {
        [nameUser]: {
            required: {
                value: true,
                message: digiteNome
            }
        },
        [email]: {
            required: {
                value: true,
                message: digiteEmail
            },
            pattern: {
                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/g,
                message: digiteEmailValido
            }
        },
        [phoneNumber]: {
            required: {
                value: true,
                message: digiteNumeroTelefone
            },
            pattern: {
                value: /^[(][0-9]{2}[)][0-9]{5}[-][0-9]{4}$/g,
                message: numeroTelefoneInvalido
            }
        },
        [city]: {
            required: {
                value: true,
                message: selecioneOpcao
            }
        },
        [dateBirthday]: {
            required: {
                value: true,
                message: digiteData
            },
            validate: {
                atLeast18YearsOld: (v: string) => calcAgeFromDate(v) >= 18 || usuarioMaior18anos
            }
        },
        [gender]: {
            required: {
                value: true,
                message: selecioneOpcao
            },
        },
    };
}