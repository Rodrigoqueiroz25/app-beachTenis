
import { PostLogged } from '@/components/PostLogged';


interface MainContentProps {
    submitForm: (dataForm: any) => void;
}

export function MainContent({ submitForm }: MainContentProps) {
    
    return (
        <>
            <PostLogged.FormCategory
                submit={submitForm}
            />
        </>
    );
}