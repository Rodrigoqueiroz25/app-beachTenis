
import *  as yup from "yup";
import { calcAgeFromDate, dateDayActual, stringToDate } from "./convertData";
import { dataDeveSerIgualMaiorQueAtual, dataDeveSerPosteriorPeriodoInscricao, dataFinalRegistroDeveSerIgualMaiorQueInicial, dataFinalTorneioDeveSerIgualMaiorQueInicial, digiteData, digiteDescricao, digiteEmailValido, digiteNome, digiteNomeOrganizacao, digiteNovamenteSenha, digiteNumeroTelefone, digiteSenha, digiteSobrenome, digiteValorNumerico, email, gender, numeroTelefoneInvalido, password, repeatPasswd, selecioneOpcao, senhasDigitadasDiferentes, usuarioMaior18anos, selecioneGenero } from "constants/wordsPhrases";
import { digiteEmail } from "constants/wordsPhrases";
import { FieldsCategory } from "../models/Category";
import { FieldsTournament } from "models/Tournament";
import { FieldsTournamentSponsor } from "models/TournamentSponsor";
import { FieldsCreateUserAccount, FieldsUpdateUserAccount } from "models/UserAccount";

type StringValueKeys<T> = { [P in keyof T]: T[P] extends string ? T[P] : never };
type Key<T> = keyof StringValueKeys<T>;


export class Validations {

    public static radioGroupGender = yup.object().shape({
        [gender]: yup.string().required(selecioneOpcao)
    });

    public static formCreateAccountPartOne: Record<Key<Omit<FieldsCreateUserAccount, 'dateBirthday' | 'gender' | 'firstName' | 'lastName'>>, any> = {
        email: {
            required: {
                value: true,
                message: digiteEmail
            },
            pattern: {
                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/g,
                message: digiteEmailValido
            }
        },
        phoneNumber: {
            required: {
                value: true,
                message: digiteNumeroTelefone
            },
            pattern: {
                value: /[+]55[(][0-9]{2}[)][0-9]{5}[-][0-9]{4}/g,///^[(][0-9]{2}[)][0-9]{5}[-][0-9]{4}$/g,
                message: numeroTelefoneInvalido
            }
        },
        password: {
            required: {
                value: true,
                message: digiteSenha
            },
        },
        repeatPassword: (password: string) => {
            return {
                required: {
                    value: true,
                    message: digiteNovamenteSenha
                },
                validate: {
                    passwordsEquals: (v: string) => v === password || senhasDigitadasDiferentes
                }
            }
        },
    } 

    
    public static formForgotPasswd = yup.object().shape({
        [email]: yup.string().email(digiteEmailValido).required(digiteEmail)
    });


    public static formCreateAccountPartTwo: Record<Key<Omit<FieldsCreateUserAccount, 'password' | 'repeatPassword' | 'email' | 'phoneNumber'>>, any> = {
        firstName: {
            required: {
                value: true,
                message: digiteNome
            }
        },
        lastName: {
            required: {
                value: true,
                message: digiteSobrenome
            }
        },
        dateBirthday: {
            required: {
                value: true,
                message: digiteData
            },
            validate: {
                atLeast18YearsOld: (v: string) => calcAgeFromDate(v) >= 18 || usuarioMaior18anos
            }
        },
        gender: {
            required: {
                value: true,
                message: selecioneGenero
            },
        }
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
        description: yup.string().required(digiteDescricao),
        numberMaxAthletes: yup.string().required(digiteValorNumerico),
        numberAthletesPerRegistration: yup.string().required(selecioneOpcao)
    } as Record<Key<FieldsCategory>, any>);

    
    

    public static formTournament: Record<Key<FieldsTournament>, any> = {
        description: {
            required: {
                value: true,
                message: digiteDescricao
            }
        },
        organization: {
            required: {
                value: true,
                message: digiteNomeOrganizacao
            }
        },
        cityCode: {
            required: {
                value: true,
                message: selecioneOpcao
            },
            validate: {
                selectOption: (v: string) => v !== 'select...' || selecioneOpcao
            }
        },
        sportCode: {
            required: {
                value: true,
                message: selecioneOpcao
            },
            validate: {
                selectOption: (v: string) => v !== 'select...' || selecioneOpcao
            }
        },
        dateStartRegistration: {
            required: {
                value: true,
                message: digiteData
            },
            validate: {
                minDate: (v) => stringToDate(v)! >= dateDayActual() || dataDeveSerIgualMaiorQueAtual
            }
        },
        dateFinalRegistration: (dtStartRegistration: string) => {
            return {
                required: {
                    value: true,
                    message: digiteData
                },
                validate: {
                    biggerOrEqualdtStartRegist: (v: string) => stringToDate(v)! >= stringToDate(dtStartRegistration)! || dataFinalRegistroDeveSerIgualMaiorQueInicial
                }
            }
        },
        dateStartTournament: (dtFinalRegistration: string) => {
            return {
                required: {
                    value: true,
                    message: digiteData
                },
                validate: {
                    biggerdtFinalRegist: (v: string) => stringToDate(v)! > stringToDate(dtFinalRegistration)! || dataDeveSerPosteriorPeriodoInscricao
                }
            }
        },
        dateFinalTournament: (dtStartTournament: string) => {
            return {
                required: {
                    value: true,
                    message: digiteData
                },
                validate: {
                    biggerOrEqualdtStartTour: (v: string) => stringToDate(v)! >= stringToDate(dtStartTournament)! || dataFinalTorneioDeveSerIgualMaiorQueInicial
                }
            }
        },
        otherInformation: {
            required: {
                value: true,
                message: digiteNome
            }
        }
    };


    public static formTournamentSponsor = yup.object().shape({
        name: yup.string().required(digiteNome),
        otherInformation: yup.string().required()
    } as Record<Key<FieldsTournamentSponsor>, any>);

    
    public static formEditProfile: Record<Key<FieldsUpdateUserAccount>, any> = {
        name: {
            required: {
                value: true,
                message: digiteNome
            }
        },
        email: {
            required: {
                value: true,
                message: digiteEmail
            },
            pattern: {
                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/g,
                message: digiteEmailValido
            }
        },
        phoneNumber: {
            required: {
                value: true,
                message: digiteNumeroTelefone
            },
            pattern: {
                value: /^[(][0-9]{2}[)][0-9]{5}[-][0-9]{4}$/g,
                message: numeroTelefoneInvalido
            }
        },
        cityId: {
            required: {
                value: true,
                message: selecioneOpcao
            },
            validate: {
                selectOption: (v: string) => v !== 'select...' || selecioneOpcao
            }
        },
        dateBirthday: {
            required: {
                value: true,
                message: digiteData
            },
            validate: {
                atLeast18YearsOld: (v: string) => calcAgeFromDate(v) >= 18 || usuarioMaior18anos
            }
        },
        gender: {
            required: {
                value: true,
                message: selecioneGenero
            },
        }
    };
}