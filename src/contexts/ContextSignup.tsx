import { ReactNode, SetStateAction, createContext, useState } from "react";

type StateType = {
    firstName: string
    lastName: string
    password: string
    gender: "M" | "F" | ""
    email: string
    cityId: string
    phoneNumber: string
    photo?: string
    dateBirthday: string
}

type ContextType = {
    state: StateType
    setState: React.Dispatch<React.SetStateAction<StateType>>
}

const initialState: StateType = {
    firstName: "",
    lastName: "",
    gender: "",
    password: "",
    email: "",
    cityId: "4709",
    phoneNumber: "",
    dateBirthday: "",
    photo: ""
}

export const ContextSignup = createContext<ContextType>({
    state: initialState,
    setState: (obj: SetStateAction<StateType>) => null
});


type Props = {
    children: ReactNode;
}

export function ContextSignupProvider({ children }: Props){
    
    const [ state, setState ] = useState(initialState);
    
    return (
        <ContextSignup.Provider value={{state, setState}}>
            {children}
        </ContextSignup.Provider>
    );
}