
import imgMail from 'assets/Mail.svg';
import imgEye from 'assets/eye.svg';
import styles from './styles.module.css';

import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { useForm } from 'react-hook-form';
import { Validations } from 'helper/Validations';
import { email, repitaSenha, senha, telefone } from 'constants/wordsPhrases';
import { FieldsCreateUserAccountPart1 } from 'models/UserAccount';


interface Props {
    submit: (data: any) => void
}

const INPUTS = [
    { component: PreLoggedin.InputMasked, mask: '+55(99)99999-9999', placeholder: telefone, type: 'tel', name: 'phoneNumber' as 'phoneNumber', src: '', prev: 'password' as 'password' },
    { component: PreLoggedin.Input, mask: '', placeholder: email, type: 'text', name: 'email' as 'email', src: imgMail, prev: 'password' as 'password' },
    { component: PreLoggedin.Input, mask: '', placeholder: senha, type: 'password', name: 'password' as 'password', src: imgEye, prev: 'password' as 'password' },
    { component: PreLoggedin.Input, mask: '', placeholder: repitaSenha, type: 'password', name: 'repeatPassword' as 'repeatPassword', src: imgEye, prev: 'password' as 'password'},
]


export function FormCreateAccountPartOne(props: Props) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FieldsCreateUserAccountPart1>();
    const validations = Validations.formCreateAccountPartOne;

    return (
        <form className={styles.form} onSubmit={handleSubmit(props.submit)}>
            {INPUTS.map((input, key) => (
                <input.component
                    key={key}
                    mask={input.mask}
                    placeholder={input.placeholder}
                    type={input.type}
                    src={input.src}
                    msgError={errors[input.name]?.message?.toString()}
                    {...register(input.name, typeof validations[input.name] === 'function' 
                        ? validations[input.name](watch(input.prev)) : validations[input.name])}
                />
            ))}

            <Button>Cadastrar-se</Button>
        </form>
    );
}