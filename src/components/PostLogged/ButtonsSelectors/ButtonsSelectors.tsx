

import styles from './styles.module.css';

type DataButton = {
    name: string;
    value: string;
}


interface ButtonsSelectorsProps {
    onClick: (value: string) => void;
    btnSel: string;
    buttons: DataButton[];

}

export function ButtonsSelectors({ onClick, btnSel, buttons }: ButtonsSelectorsProps) {


    return (
        <div className={styles.buttons}>
            {buttons?.map((btn, key) => (
                <button
                    key={key}
                    onClick={() => onClick(btn.value)}
                    className={btnSel === btn.value ? `${styles.focus}` : ""}
                >
                {btn.name}
                </button>
            ))}
        </div>      
    );
}
