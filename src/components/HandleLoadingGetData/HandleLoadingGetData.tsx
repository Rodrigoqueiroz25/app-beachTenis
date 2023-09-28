
type Props = {
    isLoading: boolean;
    ok: boolean;
    children: JSX.Element[];
}


export function HandleLoadingGetData({ isLoading, ok, children }: Props) {

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (ok && !isLoading) {
        return (
            <>
                {children.map((child, i) => {
                    return child;
                })}
            </>
        );

    }
    return <></>
}