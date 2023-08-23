
import styles from './styles.module.css';
import { PreLoggedin } from 'components/PreLoggedin';
import { FormCreatePassword } from './Presentation/FormCreatePassword';


export function CreatePasswdContainer() {
    
    function handleSubmitForm(dada: any){
        //nothing
    }
    
    return (

        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <p className={styles.title}>Criar Nova Senha</p>
                </div>
            }  
            main={
                <FormCreatePassword
                    submit={handleSubmitForm}
                />
            }
        />
    );
}