
export interface IError{
    error?: string;
}

export function isError(obj: any): obj is IError{
    return 'error' in obj;
}