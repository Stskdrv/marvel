import './charList.scss';

import { useEffect, useRef, useState } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const CharList = ({onCharSelected}) => {

    const [list, setList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(219);
    const [showButton, setShowButton] = useState(true);

    const myRef= useRef([]);
    
    const {loading,error,getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(210, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
            getAllCharacters(offset)
            .then((list) => {
                setList((newlist) => ([...newlist, ...list ]));
                setNewItemsLoading(false);
                 setOffset(offset + 9);
                 console.log(list.length);
                 if(list.length < 8) {setShowButton(false)}
            });
        };
    

    const focusSelecteChar = (name) => {
        if(myRef) {
            myRef.current.map(((el) => {
                el.textContent === name ? 
                el.classList.toggle('char__item_selected') : 
                el.classList='char__item'
            }));
        }
    }

    return (
        error ? <ErrorMessage/> :
        (loading && !newItemsLoading)  ? <Spinner/> : 
        <div className="char__list">
        <ul className="char__grid">
            <TransitionGroup component={null}>
                {list.map((el, i) => {
                    return (
                        <CSSTransition classNames="char__item" key={el.id} timeout={500}>
                            <li  
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
                        </CSSTransition>                   
                    )
                })}
            </TransitionGroup>
        </ul>
        {newItemsLoading ? <Spinner /> : null}
        <button disabled={newItemsLoading} style={!showButton ? {display: 'none'} : null} onClick={() => onRequest(offset,false)} className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
    </div>            
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
}

export default CharList;