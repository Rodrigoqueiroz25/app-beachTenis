
import styles from '../styles.module.css';
import imgCreatePasswd from 'assets/create_passwd.svg';
import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { Validations } from 'helper/Validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { novaSenha, password, repeatPasswd, repitaNovaSenha } from 'constants/wordsPhrases';

interface MainContentProps {
    submit: (data: any) => void;
}

export function MainContent(props: MainContentProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formCreatePasswd)
    });

    return (

        <main className={styles.containerMain}>
            <img className={styles.imgCreatePasswd} src={imgCreatePasswd} alt="" />
            <p className={styles.description}>Sua nova senha deve ser diferente de senhas usadas anteriormente.</p>
            <form className={styles.form} onSubmit={handleSubmit(props.submit)}>
                <PreLoggedin.Input 
                    placeholder={novaSenha}
                    type='password'
                    {...register(password)}
                    msgError={errors[password]?.message}
                    
                />
                <PreLoggedin.Input 
                    placeholder={repitaNovaSenha}
                    type='password' 
                    {...register(repeatPasswd)}
                    msgError={errors[repeatPasswd]?.message}
                    
                />
                <Button>Salvar</Button>
            </form>
        </main>
    );
}