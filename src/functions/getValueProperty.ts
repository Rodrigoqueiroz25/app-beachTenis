
function getValueProperty<T>(obj: T): <
    P1 extends keyof NonNullable<T>,
    P2 extends keyof NonNullable<NonNullable<T>[P1]>
>(prop1: P1, prop2: P2) => NonNullable<NonNullable<T>[P1]>[P2];


function getValueProperty(obj: any) {
    return function (...props: string[]): any {
        // return obj && props.reduce(
        //     (result, prop) => result == null ? undefined : result[prop],
        //     obj
        // );
        return obj[props[0]][props[1]]
    }
}

export { getValueProperty };