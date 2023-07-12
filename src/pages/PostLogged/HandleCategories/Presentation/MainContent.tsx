
import { ICategoryRegistered } from '@/interfaces/ICategory';
import { Form } from './Form';
import { useState } from 'react';
import styles from '../styles.module.css';
import { PostLogged } from '@/components/PostLogged';
import { Button } from '@/components/Button/Button';


interface MainContentProps {
    listCategories: ICategoryRegistered[];
    removeCategory: any;
    submitForm: (isEdit: boolean, id?: string) => (dataForm: any) => void;
}

export function MainContent({ listCategories, removeCategory, submitForm }: MainContentProps) {

    const [categoryToEdit, setCategoryToEdit] = useState<ICategoryRegistered>();

    function setValueFieldsForm(id: string) {
        const category = listCategories.find((c) => c.id === id) as ICategoryRegistered;
        setCategoryToEdit(category);
    }

    return (
        <>
            <Form
                submit={submitForm(categoryToEdit ? true : false, categoryToEdit?.id)}
                categoryToEdit={categoryToEdit}
            />

            <div className={styles.list}>
                {listCategories?.map((category: ICategoryRegistered, key: number) => (
                    <PostLogged.Item.Wrapper key={key}>
                        <div className={styles.itemList}>
                            <PostLogged.Item.Text text={category.description} />
                            <Button small onClick={() => setValueFieldsForm(category.id)}>Editar</Button>
                            <Button small onClick={() => removeCategory(category.id)}>Excluir</Button>
                        </div>
                    </PostLogged.Item.Wrapper>
                ))}
            </div>
            
        </>
    );
}