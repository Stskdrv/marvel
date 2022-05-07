import './charList.scss';

import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

class CharList extends Component {

    state= {
        list: [],
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    onLislLoading() {
        this.setState({loading: true})
    }

    onListLoaded = (list) => {
        this.setState({list, loading: false,})
    }

    componentDidMount() {
        this.onLislLoading()
        this.marvelService.getAllCharacters()
            .then(this.onListLoaded)
            .catch(error => this.setState({error}));
    }


    render() {
        const {list, loading} = this.state;
        console.log(this.state);


        return (
            loading ? <Spinner/> : 
            <div className="char__list">
            <ul className="char__grid">
                {list.map((el) => {
                    return (
                        <li key={el.name} className="char__item">
                        <img src={el.thumbnail} alt="abyss"/>
                        <div className="char__name">{el.name}</div>
                    </li>
                    )
                })}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>            
        )
    }
}

export default CharList;