
import styles from './ButtonBack.module.css';
import setLeft from '@/assets/set_left.svg';
import { useNavigate } from 'react-router-dom';

type Props = {
    endPoint: string;
}

export function ButtonBack({ endPoint }: Props){

    const navigate = useNavigate();

    function handleClick(){
        navigate(endPoint);
    }

    return (
        <div className={styles.button}
             onClick={handleClick}
        >
            <img src={setLeft} alt="" />
        </div>
    );
}