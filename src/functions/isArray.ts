export function isArray<T>(obj: any): obj is T[]{
    return (obj as Array<T>).map !== undefined;
}