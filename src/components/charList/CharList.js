import './charList.scss';

import { useEffect, useRef, useState } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../spinner/Spinner';

const CharList = ({onCharSelected}) => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(219);
    const [showButton, setShowButton] = useState(true);

    const myRef= useRef([]);
    
    const marvelService = new MarvelService();

    const onListLoaded = (list) => {
        setList(list);
        setLoading(false);
    }

    useEffect(() => {
        onLislLoading()
        marvelService.getAllCharacters()
            .then(onListLoaded)
            .catch(error => setError(error));
    }, [])

    const onRequest = (offset) => {
        setNewItemsLoading(true);
        marvelService
            .getAllCharacters(offset)
            .then((list) => {
                setList((newlist) => ([...newlist, ...list ]));
                setNewItemsLoading(false);
                 setOffset(offset + 9);
            });
            if(list.length < 9) {setShowButton(false)}
        };
    

    const focusSelecteChar = (name) => {
        console.log(myRef);
        if(myRef) {
            myRef.current.map(((el) => {
                el.textContent === name ? 
                el.classList.toggle('char__item_selected') : 
                el.classList='char__item'
            }));
        }
    }

    const onLislLoading = () => {
        setLoading(true)
    }

    return (
        error ? <ErrorMessage/> :
        loading ? <Spinner/> : 
        <div className="char__list">
        <ul className="char__grid">
            {list.map((el, i) => {
                return (
                    <li key={el.id} 
                        ref={item => myRef.current[i] = item }
                        className="char__item"
                        tabIndex={0}
                        onClick={() => {
                            onCharSelected(el.id);
                            focusSelecteChar(el.name)}
                    }>
                    <img src={el.thumbnail} alt="abyss"/>
                    <div className="char__name">{el.name}</div>
                </li>
                )
            })}
        </ul>
        {newItemsLoading ? <Spinner /> : null}
        <button disabled={newItemsLoading} style={!showButton ? {display: 'none'} : null} onClick={() => onRequest(offset)} className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
    </div>            
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
}

export default CharList;