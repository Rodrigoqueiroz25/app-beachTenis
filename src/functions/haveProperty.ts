
export function haveProperty(prop: string, obj: any) {
    if (prop in obj) {
        return obj[prop];
    }
    return undefined;
}
