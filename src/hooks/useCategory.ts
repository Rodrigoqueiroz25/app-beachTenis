
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import { ICategory, ICategoryDataWriteResponse, ICategoryGetResponse } from "interfaces/ICategory";


export default function useCategory() {

    const { getCookieToken } = useCookiesSession();

    const create = useFetchData<ICategoryDataWriteResponse>();
    const getAll = useFetchData<ICategoryGetResponse[]>();
    const remove = useFetchData<{}>();


    const createCategory = {
        isLoading: create.isLoading,
        ok: create.ok,
        error: create.error,
        categoryCreated: create.data,
        write: (data: ICategory) => create.fetchData(Requests.createCategory(data, getCookieToken()))
    };

    const editCategory = {
        isLoading: create.isLoading,
        ok: create.ok,
        error: create.error,
        categoryUpdated: create.data,
        update: (data: ICategory, id: string) => create.fetchData(Requests.updateCategory(data, id, getCookieToken()))
    };


    const deleteCategory = {
        isLoading: remove.isLoading,
        ok: remove.ok,
        error: remove.error,
        delete: (id: string) => remove.fetchData(Requests.deleteCategory(id, getCookieToken()))
    };


    const getAllCategories = {
        isLoading: getAll.isLoading,
        ok: getAll.ok,
        error: getAll.error,
        categories: getAll.data,
        getAll: (tournamentId: string) => getAll.fetchData(Requests.getCategories(tournamentId,getCookieToken()))
    };


    return {
        createCategory,
        editCategory,
        deleteCategory,
        getAllCategories
    }

}