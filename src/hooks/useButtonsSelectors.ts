import { useState } from "react";

interface ButtonsSelectorsOpts {
    amount: number;
    namesButtons: string[];
}

export default function useButtonsSelectors(opts: ButtonsSelectorsOpts){

    const [inProgress, setInProgress] = useState(true);

    function handleClickInProgress() {
        setInProgress(true);
    }

    function handleClickFinished() {
        setInProgress(false);
    }

    return {
        inProgress,
        ButtonsSelectors
    }


}

export function ButtonsSelectors(){

}