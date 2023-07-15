
import { ICategoryRegistered } from '@/interfaces/ICategory';
import { PostLogged } from '@/components/PostLogged';


interface MainContentProps {
    submitForm: (dataForm: any) => void;
    categoryToEdit: ICategoryRegistered;
}

export function MainContent({ submitForm, categoryToEdit }: MainContentProps) {

    return (
        <>
             <PostLogged.FormCategory
                submit={submitForm}
                defaultValues={categoryToEdit}
            />
        </>
    );
}