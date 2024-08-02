import { useTitle } from '../hooks/useTitle'

export const PageNotFound = () => {

    useTitle('404')

    return (
        <main>
            <div>404, Page not found</div>
        </main> 
    )
}