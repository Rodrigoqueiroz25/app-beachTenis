
import styles from './styles.module.css';
import imgCreatePasswd from 'assets/create_passwd.svg';
import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { Validations } from 'helper/Validations';
import { useForm } from 'react-hook-form';
import { novaSenha, password, repeatPasswd, repitaNovaSenha } from 'constants/wordsPhrases';

interface FormCreatePasswordProps {
    submit: (data: any) => void;
}

export function FormCreatePassword({submit}: FormCreatePasswordProps) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({});

    const validations = Validations.formCreatePasswd;

    return (
        <main className={styles.containerMain}>
            <img className={styles.imgCreatePasswd} src={imgCreatePasswd} alt="" />
            <p className={styles.description}>Sua nova senha deve ser diferente de senhas usadas anteriormente.</p>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <PreLoggedin.Input
                    placeholder={novaSenha}
                    type='password'
                    {...register(password, validations[password])}
                    msgError={errors[password]?.message?.toString()}

                />
                <PreLoggedin.Input
                    placeholder={repitaNovaSenha}
                    type='password'
                    {...register(repeatPasswd, validations[repeatPasswd](watch(password)))}
                    msgError={errors[repeatPasswd]?.message?.toString()}

                />
                <Button>Salvar</Button>
            </form>
        </main>
    );
}