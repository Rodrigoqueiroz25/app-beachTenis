
import styles from './styles.module.css';
import { PreLoggedin } from 'components/PreLoggedin';
import { FormForgotPassword } from 'components/PreLoggedin/FormForgotPassword/FormForgotPassword';

export function ForgotPasswd() {

    function handleSubmitForm(dada: any){
        //nothing
    }

    return (
        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <p className={styles.questForgotPasswd}>Esqueceu Sua Senha?</p>
                </div>
            }
            main={
                <FormForgotPassword
                    submit={handleSubmitForm}
                />
            }
        />
    );
}