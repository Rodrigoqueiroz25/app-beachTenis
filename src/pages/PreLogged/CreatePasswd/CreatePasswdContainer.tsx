
import styles from './styles.module.css';
import { PreLoggedin } from '@/components/PreLoggedin';
import { MainContent } from './Presentation/MainContent';


export function CreatePasswdContainer() {
    return (

        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <p className={styles.title}>Create New Password</p>
                </div>
            }  
            main={
                <MainContent/>
            }
        />
    );
}