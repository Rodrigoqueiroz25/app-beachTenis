
import styles from './styles.module.css';
import { PreLoggedin } from '@/components/PreLoggedin';
import { MainContent } from './Presentation/MainContent';


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
                <MainContent
                    submit={handleSubmitForm}
                />
            }
        />
    );
}