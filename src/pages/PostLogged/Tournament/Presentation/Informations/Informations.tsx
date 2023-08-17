
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import styles from './Informations.module.css';
import { dateFinalRegistrationFormatted, dateFinalTournamentFormatted, dateStartRegistrationFormatted, dateStartTournamentFormatted, otherInformation } from 'constants/wordsPhrases';

type Props = {
    infoTournament: ITournamentDataGetResponse;
}

export function Informations({infoTournament}: Props) {
    
    return (
        <div className={styles.informations}>
            <h3>Informações do torneio</h3>
            <p>{infoTournament?.[otherInformation]}</p>
            <hr />
            <h3>Cronograma</h3>
            <h4>Início das inscrições</h4>
            <p>{infoTournament?.[dateStartRegistrationFormatted]}</p>
            <h4>Fim das inscrições</h4>
            <p>{infoTournament?.[dateFinalRegistrationFormatted]}</p>
            <h4>Início dos jogos</h4>
            <p>{infoTournament?.[dateStartTournamentFormatted]}</p>
            <h4>Fim dos jogos</h4>
            <p>{infoTournament?.[dateFinalTournamentFormatted]}</p>
            <hr />
            <h3>Patrocínio</h3>
        </div>
    );
}