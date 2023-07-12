
import styles from './styles.module.css';
import { PreLoggedin } from '@/components/PreLoggedin';
import { MainContent } from './Presentation/MainContent';

export function ForgotPasswdContainer() {

    return (
        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <p className={styles.questForgotPasswd}>Forgot Your Password?</p>
                </div>
            }
            main={
                <MainContent/>
            }
        />
    );
}