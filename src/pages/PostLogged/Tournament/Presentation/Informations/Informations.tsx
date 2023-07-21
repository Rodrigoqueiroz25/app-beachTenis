
import { ITournamentDataGetByIdResponse } from '@/interfaces/ITournament';
import styles from './Informations.module.css';

type Props = {
    infoTournament: ITournamentDataGetByIdResponse;
}

export function Informations({infoTournament}: Props) {
    
    return (
        <div className={styles.informations}>
            <h3>Informações do torneio</h3>
            <p>{infoTournament?.otherInformation}</p>
            <hr />
            <h3>Cronograma</h3>
            <h4>Início das inscrições</h4>
            <p>{infoTournament?.dtStartRegistrationFormatted}</p>
            <h4>Fim das inscrições</h4>
            <p>{infoTournament?.dtFinalRegistrationFormatted}</p>
            <h4>Início dos jogos</h4>
            <p>{infoTournament?.dtStartTournamentFormatted}</p>
            <h4>Fim dos jogos</h4>
            <p>{infoTournament?.dtFinalTournamentFormatted}</p>
            <hr />
            <h3>Patrocínio</h3>
        </div>
    );
}