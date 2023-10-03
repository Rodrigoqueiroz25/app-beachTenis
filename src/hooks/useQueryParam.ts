/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export function useQueryParam(key: string, defaultVal: string): [string, (val: string) => void] {

    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get(key) || defaultVal);


    useEffect(() => {
        setSearchParams(prev => {
            prev.set(key, defaultVal)
            return prev
        });
    }, []);

    function updateUrl(value: string){
        setSearchParams(prev => {
            prev.set(key, value);
            return prev
        });
        setQuery(searchParams.get(key)!);
    }


    return [query, updateUrl];
  };
