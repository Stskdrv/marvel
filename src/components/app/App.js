import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy } from "react";

import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../pages/ComicsPae";
import MainPage from "../pages/MainPage";
import SingleComicPage from "../pages/SingleComicPage/SingleComicPage";
import { Suspense } from "react";
import Spinner from "../spinner/Spinner";
const Page404 = lazy(() => import("../pages/404"));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route exact path='/comics' element={<ComicsPage/>}/>
                            <Route exact path='/comics/:id' element={<SingleComicPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
 
                </main>
            </div>
        </Router>
    )
}

export default App;