import { Route, BrowserRouter as Router } from "react-router-dom";

import AppBanner from "../appBanner/AppBanner";
import AppHeader from "../appHeader/AppHeader";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import ComicsList from "../comicsList/ComicsList";
import RandomChar from "../randomChar/RandomChar";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    {/* <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={onCharSelected}/>
                        <CharInfo charId={selectedChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/> */}
                    <AppBanner/>
                    <ComicsList/>
                </main>
            </div>
        </Router>
    )
}

export default App;