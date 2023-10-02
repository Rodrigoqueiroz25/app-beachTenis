
import styles from './styles.module.css'

import { Button } from 'components/Button/Button';
import { PostLogged } from 'components/PostLogged';
import { dateDayActual, stringBrazilToDate } from 'helper/convertData';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { Category } from 'models/Category';
import { Tournament } from 'models/Tournament';
import { isAdmin } from 'functions/isAdmin';


interface MainContentProps {
    dataTournament: Tournament;
    listCategories: Category[];
    removeCategory: (id: number) => void;
    editCategory: (id: number) => void;
}


export function ListCategories({ dataTournament, listCategories, removeCategory, editCategory }: MainContentProps) {

    const navigate = useNavigate();

    function displayButtons(category: Category) {
        if (!isAdmin() && stringBrazilToDate(dataTournament.periodRegistration?.dateInitial.text).getTime() <= dateDayActual().getTime() && dateDayActual().getTime() <= stringBrazilToDate(dataTournament.periodRegistration?.dateFinal.text).getTime()) {
            return <Button small onClick={() => navigate(`${Routes.registerPlayerCategory}`, { state: { category: category } })}>Inscrever</Button>
        }
        else if (!isAdmin() && stringBrazilToDate(dataTournament.periodRegistration?.dateFinal.text).getTime() <= dateDayActual().getTime() && dateDayActual().getTime() <= stringBrazilToDate(dataTournament.periodTournament?.dateFinal.text).getTime()) {
            return <Button small>Jogos</Button>
        }
        else if (isAdmin()) {
            return (
                <>
                    <Button small onClick={() => editCategory(category.id)}>Editar</Button>
                    <Button small onClick={() => removeCategory(category.id)}>Remover</Button>
                </>
            )
        }
    }


    return (
        <div className={styles.list}>
            {listCategories.map((category: Category, key: number) => (
                <PostLogged.Item.Wrapper key={key}>
                    <div className={styles.itemList}>
                        <PostLogged.Item.Text text={category.description} />
                        <PostLogged.Item.Photos />
                        <PostLogged.Item.Text small text={`${category.numberAthletesRegistered} inscrito(s) de ${category.numberMaxAthletes}`} />
                        {displayButtons(category)}
                    </div>
                </PostLogged.Item.Wrapper>
            ))}
        </div>
    );
}