import { IDataSignUp } from "@/interfaces/IDataSignUp";
import { ReactNode, SetStateAction, createContext, useState } from "react";

type ContextType = {
    state: IDataSignUp
    setState: React.Dispatch<React.SetStateAction<IDataSignUp>>
}

const initialState: IDataSignUp = {
    name: "",
    gender: "",
    password: "",
    email: "",
    cityId: "4709",
    phoneNumber: "",
    dateBirthday: "",
    photo: "",
    role: ""
}

export const ContextSignup = createContext<ContextType>({
    state: initialState,
    setState: (obj: SetStateAction<IDataSignUp>) => null
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