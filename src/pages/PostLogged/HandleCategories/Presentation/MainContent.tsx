
import { ICategoryRegistered } from '@/interfaces/ICategory';
import { Form } from './Form';
import { useState } from 'react';
import styles from '../styles.module.css';
import { Category } from './Category/Category';


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

            <div className={styles.listCategories}>
                {listCategories.map((c: ICategoryRegistered, key: number) => (
                    <Category
                        key={key}
                        category={c.description}
                        id={c.id}
                        edit={setValueFieldsForm}
                        del={removeCategory}
                    />
                ))}
            </div>
        </>
    );
}