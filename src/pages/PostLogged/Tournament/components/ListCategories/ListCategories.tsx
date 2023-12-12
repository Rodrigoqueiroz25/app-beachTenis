
import styles from './styles.module.css'

import { Button } from 'components/Button/Button';
import { PostLogged } from 'components/PostLogged';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { Category } from 'models/Category';
import { Tournament } from 'models/Tournament';
import { isAdmin } from 'functions/isAdmin';
import { isInPeriodRegistration, isInPeriodTournament } from 'functions/dataCalendar';


type ListCategoriesProps = {
    dataTournament: Tournament;
    listCategories: Category[];
    removeCategory: (id: number) => void;
    editCategory: (id: number) => void;
    registration: (categoryId: number) => void;
    unregister: (categoryId: number) => void;
}


export function ListCategories({ dataTournament, listCategories, removeCategory, editCategory, registration, unregister }: ListCategoriesProps) {

    const navigate = useNavigate();

    function displayButtons(category: Category) {
        if (!isAdmin()) {
            if (isInPeriodRegistration(dataTournament)) {
                if(category.userLoggedRegistered && Number(category.numberAthletesPerRegistration) === 1){
                    return <Button small onClick={() => unregister(category.id)}>Remover inscrição</Button>
                }
                else{
                    if(Number(category.numberAthletesPerRegistration) === 1){
                        return <Button small onClick={() => registration(category.id)}>Inscrição</Button>
                    }
                    else if(Number(category.numberAthletesPerRegistration) === 2){
                        return <Button medium onClick={() => navigate(`${Routes.registerPlayerCategory}`, { state: { category: category } })}>Escolher dupla</Button>
                    }
                    else{
                        return <Button medium onClick={() => navigate(`${Routes.registerPlayerCategory}`, { state: { category: category } })}>Escolher time</Button>
                    }
                }
            }
           else if (isInPeriodTournament(dataTournament)) {
                return <Button small>Jogos</Button>
            }
        }
        else {
            return (
                <>
                    <Button small onClick={() => editCategory(category.id)}>Editar</Button>
                    <Button small onClick={() => removeCategory(category.id)}>Remover</Button>
                </>
            )
        }

    }

  

    return (
        <div className='list'>
            {listCategories.map((category: Category, key: number) => (
                <PostLogged.Item.Wrapper key={key}>
                    <div className={styles.itemList}>
                        <PostLogged.Item.Text text={category.description} />
                        <PostLogged.Item.Photos />
                        <PostLogged.Item.Text small text={`${category.numberAthletesRegistered} inscrito(s) de ${category.numberMaxAthletes}`} />
                        {!dataTournament.isFinished() ? displayButtons(category) : null}
                    </div>
                </PostLogged.Item.Wrapper>
            ))}
        </div>
    );
}