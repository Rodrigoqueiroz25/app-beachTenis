
import styles from './Informations.module.css';
import { Tournament } from 'models/Tournament';

type Props = {
    infoTournament: Tournament;
}

export function Informations({infoTournament}: Props) {
    
    return (
        <div className={styles.informations}>
            <h3>Informações do torneio</h3>
            <p>{infoTournament.otherInformation}</p>
            <hr />
            <h3>Cronograma</h3>
            <h4>Início das inscrições</h4>
            <p>{infoTournament.periodRegistration.dateInitial?.formatted}</p>
            <h4>Fim das inscrições</h4>
            <p>{infoTournament.periodRegistration.dateFinal?.formatted}</p>
            <h4>Início dos jogos</h4>
            <p>{infoTournament.periodTournament.dateInitial?.formatted}</p>
            <h4>Fim dos jogos</h4>
            <p>{infoTournament.periodTournament.dateFinal?.formatted}</p>
            <hr />
            <h3>Patrocínio</h3>
        </div>
    );
}