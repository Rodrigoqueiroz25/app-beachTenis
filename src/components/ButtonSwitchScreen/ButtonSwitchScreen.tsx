
import styles from './ButtonSwitchScreen.module.css';
import { useNavigate } from 'react-router-dom';

type Props = {
    endPoint: string;
    icon: string;
}

export function ButtonSwitchScreen({ endPoint, icon }: Props){

    const navigate = useNavigate();

    function handleClick(){
        navigate(endPoint);
    }

    return (
        <div className={styles.button}
             onClick={handleClick}
        >
            <img src={icon} alt="" />
        </div>
    );
}