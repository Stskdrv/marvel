import './charInfo.scss';

import { useEffect, useState } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (charId) {
            marvelService
            .getCharacter(charId)
            .then(setLoading(true))
            .then((res) => {
                setChar(res);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            })
        }
    }, [charId])

    const marvelService = new MarvelService();


    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({char}) => {
    const comicsList = () => {
        const res = char.comics;
        if (res.length > 10) {
            res.splice(10);
        }

       return res.map((el) => {
            return (
                <li key={el.name}
                    className="char__comics-item">
                    {el.name}
                </li>
            )
        })
    };

    return(
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki}  className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {(char.comics.length > 0) ? comicsList() : 'no one comics, sorry:('}
            </ul>
        </> 
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;