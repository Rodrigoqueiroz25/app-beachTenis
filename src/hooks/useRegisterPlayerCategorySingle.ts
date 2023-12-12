/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useSelectorMethodFetch } from "./fetchApi/useSelectorMethodFetch";


export function useRegisterPlayerCategorySingle(){

    const { selector } = useSelectorMethodFetch();

    const registerPlayer = selector('category', 'registerPlayerSingle');
    const unregisterPlayer = selector('category', 'removeTeam');
    const getTeamIdPlayerLoggedByCategory = selector('category', 'getTeamIdPlayerLoggedByCategory');

    useEffect(() => {
        if(getTeamIdPlayerLoggedByCategory.ok){
            unregisterPlayer.fetch(getTeamIdPlayerLoggedByCategory.data);
        }
    }, [getTeamIdPlayerLoggedByCategory.data, getTeamIdPlayerLoggedByCategory.ok]);


    const register = (categoryId: number) => {
        registerPlayer.fetch(categoryId);
    };


    const unregister = (categoryId: number) => {
        getTeamIdPlayerLoggedByCategory.fetch(categoryId);
    };



    return {
        register,
        unregister,
        isPlayerRegistered: registerPlayer.ok,
        isPlayerUnregistered: unregisterPlayer.ok
    }

}