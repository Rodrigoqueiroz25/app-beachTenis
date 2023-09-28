/* eslint-disable react-hooks/exhaustive-deps */

import { useSelectorMethodFetch } from "hooks/fetchApi/useSelectorMethodFetch";
import { useEffect } from "react";

export function useHome() {

    const { selector } = useSelectorMethodFetch();
    const cities = selector('city', 'getAll');
    const tournaments = selector('tournament', 'getAll');

    useEffect(() => {
        cities.fetch();
        tournaments.fetch();
    }, []);

    return {
        isLoading: cities.isLoading || tournaments.isLoading,
        ok: cities.ok && tournaments.ok,
        cities: cities.data,
        tournaments: tournaments.data.opened
    }

}