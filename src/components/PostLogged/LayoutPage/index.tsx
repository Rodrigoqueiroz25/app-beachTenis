
//import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { PageBody } from "./PageBody/PageBody";
import { HeaderDiv } from "./HeaderDiv/HeaderDiv";
import { HandleLoadingGetData } from "components/HandleLoadingGetData/HandleLoadingGetData";
import { StateFetchHandle } from "components/StateFetchHandle/StateFetchHandle";
import { Footer } from "./Footer/Footer";


export function layout(){
    return {
        Header: Header,
        Main: Main,
        HandleLoadingGetData: HandleLoadingGetData,
        Body: PageBody,
        HeaderDiv: HeaderDiv,
        StateFetchHandle : StateFetchHandle,
        Footer: Footer
    }
}