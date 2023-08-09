
import { PostLogged } from 'components/PostLogged';
import styles from './styles.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';

export function RegisterPlayerCategoryContainer() {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <PostLogged.LayoutPage.Layout
            header={
                <PostLogged.LayoutPage.Header>
                    <PostLogged.ButtonBack onClick={() => navigate(`${Routes.tournamentLessParam}/${location.state.category.tournamentId}`)} />
                    <p>{location.state.category.description}</p>
                </PostLogged.LayoutPage.Header>
            }
            main={
                <></>
            }
        />
    )
}