
export function ErrorInfo({ error }: {error: string}) {
    return <div style={{ color: 'red' }}>
        {error.toString()}
        </div>
}