import './charList.scss';

import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

class CharList extends Component {

    state= {
        list: [],
        loading: false,
        error: false,
        newItemsLoading: false,
        offset: 219,
        showButton: true,
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

    onRequest(offset) {
        this.setState({newItemsLoading: true})
        this.marvelService
            .getAllCharacters(offset)
            .then(list => {this.setState((prevState) => ({ list: [...prevState.list, ...list], newItemsLoading: false, offset: prevState.offset + 9}
            ));
            if(list.length < 9) {this.setState({showButton: false})}
        });
    }


    render() {
        const {list, loading, error, newItemsLoading, offset, showButton} = this.state;
        console.log(this.state);


        return (
            error ? <ErrorMessage/> :
            loading ? <Spinner/> : 
            <div className="char__list">
            <ul className="char__grid">
                {list.map((el) => {
                    return (
                        <li key={el.id} 
                        className="char__item"
                        onClick={() => this.props.onCharSelected(el.id)}>
                        <img src={el.thumbnail} alt="abyss"/>
                        <div className="char__name">{el.name}</div>
                    </li>
                    )
                })}
            </ul>
            {newItemsLoading ? <Spinner /> : null}
            <button disabled={newItemsLoading} style={!showButton ? {display: 'none'} : null} onClick={() => this.onRequest(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>            
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
}

export default CharList;