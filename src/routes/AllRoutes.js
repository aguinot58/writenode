import { Routes, Route } from 'react-router-dom'
import { Home, PageNotFound, CreatePost } from './../pages/index'

// auth firebase
import { auth } from '../firebase/firebaseConfig'

const AllRoutes = () => {

    const isAuth = () => {
        let user = auth.currentUser;  // user object || null
        if (!user) return '/'; // return vers le chemin souhaité (en l'occurrence l'accueil mais sinon vers page de sign-in)
        return true;
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/create" element={<CreatePost/>}/>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </>
    )
}

export default AllRoutes