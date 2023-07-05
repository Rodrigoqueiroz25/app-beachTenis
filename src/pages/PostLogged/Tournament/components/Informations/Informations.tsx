
import { ITournamentRegistered } from '@/interfaces/ITournament';
import styles from './Informations.module.css';

type Props = {
    infoTournament: ITournamentRegistered;
}

export function Informations({infoTournament}: Props) {

    return (
        <div className={styles.informations}>
            <h3>Informações do torneio</h3>
            <p>{infoTournament?.otherInformation}</p>
            <hr />
            <h3>Cronograma</h3>
            <h4>Início das inscrições</h4>
            <p>{infoTournament?.dtStartRegistration}</p>
            <h4>Fim das inscrições</h4>
            <p>{infoTournament?.dtFinalRegistration}</p>
            <h4>Início dos jogos</h4>
            <p>{infoTournament?.dtStartTournament}</p>
            <h4>Fim dos jogos</h4>
            <p>{infoTournament?.dtFinalTournament}</p>
            <hr />
            <h3>Patrocínio</h3>
        </div>
    );
}