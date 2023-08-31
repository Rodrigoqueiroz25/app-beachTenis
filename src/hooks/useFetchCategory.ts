
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import { ICategory, ICategoryDataWriteResponse, ICategoryGetResponse } from "interfaces/ICategory";


export default function useFetchCategory() {

    const { getCookieToken } = useCookiesSession();
    const fetch = useFetchData();

    const createCategory = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        categoryCreated: fetch.data as ICategoryDataWriteResponse,
        write: (data: ICategory) => fetch.fetchData(Requests.createCategory(data, getCookieToken()))
    };

    const editCategory = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        categoryUpdated: fetch.data as ICategoryDataWriteResponse,
        update: (data: ICategory, id: string) => fetch.fetchData(Requests.updateCategory(data, id, getCookieToken()))
    };


    const deleteCategory = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        delete: (id: string) => fetch.fetchData(Requests.deleteCategory(id, getCookieToken()))
    };


    const getAllCategories = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        categories: fetch.data as ICategoryGetResponse[],
        getAll: (tournamentId: string) => fetch.fetchData(Requests.getCategories(tournamentId,getCookieToken()))
    };


    return {
        createCategory,
        editCategory,
        deleteCategory,
        getAllCategories
    }

}