import './appHeader.scss';

import {Link, NavLink} from 'react-router-dom';

const AppHeader = () => {
    let activeStyle = {
        textDecoration: "underline",
      };
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end style={({isActive}) => isActive ? activeStyle : null} to='/'>Characters</NavLink></li>
                    /
                    <li><NavLink style={({isActive}) => isActive ? activeStyle : null} to='/comics'>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;