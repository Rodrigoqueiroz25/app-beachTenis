
import { FooterHome } from '../../components/FooterHome/FooterHome';
import styles from './AddTournament.module.css';
import photo from '../../assets/photo.svg';
import image from '../../assets/image.svg';
import { Button } from '../../components/Button/Button';
import { TextFieldSmall } from '../../components/TextFieldSmall/TextFieldSmall';
import { Combobox } from '../../components/Combobox/Combobox';

export function AddTournament() {

    

    return (
        <div className={styles.container}>
            
            <header className={styles.title}>
                <p>Adicione um Torneio</p>
            </header>

            <main>
                <div className={styles.iconWrapper}>
                    <div className={styles.iconContainer}>
                        <img className={styles.icon} src={image} alt="" />
                        <img className={styles.iconPhoto} src={photo} alt="" />
                    </div>
                    <div className={styles.addBanner}>
                        <p>Adicione um banner</p>
                    </div>
                </div>

                <form className={styles.form}>
                    
                    <TextFieldSmall 
                        label='Descrição' 
                        placeholder='Descrição' 
                        type='text' 
                        value=''
                    />
                    
                    <TextFieldSmall 
                        label='Organização' 
                        placeholder='Organização' 
                        type='text' 
                        value=''
                    />
                    
                    <Combobox
                        label='Esporte'
                        endPoint='sports'     
                    />

                    <Combobox
                        label='Cidade'
                        endPoint='cities'     
                    />

                    <div className={styles.paragraph}>
                        <p >Período de Inscrições</p>
                        <hr />
                    </div>
                    
                    
                    <div className={styles.inputDates}>
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data início' 
                                placeholder='Data início' 
                                type='date' 
                                value=''    
                            />
                        </div>      
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data final' 
                                placeholder='Data final' 
                                type='date' 
                                value=''
                            />  
                        </div>  
                    </div>

                    <div className={styles.paragraph}>
                        <p >Período do Torneio</p>
                        <hr />
                    </div>
                    
                    <div className={styles.inputDates}>
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data início' 
                                placeholder='Data início'
                                type='date' 
                                value=''
                            />
                        </div>      
                        <div className={styles.input}>
                            <TextFieldSmall 
                                label='Data final' 
                                placeholder='Data final' 
                                type='date' 
                                value=''
                            />  
                        </div>  
                    </div>

                    <textarea className={styles.info} placeholder='Outras informações' ></textarea>

                    <Button text='Salvar'/>

                </form>


            </main>


            <FooterHome />
        </div>

    );
}