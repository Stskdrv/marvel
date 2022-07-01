import './singlePage.scss';

import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import useMarvelService from '../../../services/MarvelService';

const SinglePage = ({type}) => {
    const {id, name} = useParams();
    const [content, setContent] = useState({})

    const {loading,error, getComics, getCharacterByName, clearError} = useMarvelService();

    useEffect(() => {
        if(type === 'comic'){
            if (id) {
                clearError();
                getComics(id)
                .then((comic) => setContent(comic));
            }
        } else if(type === 'char') {
            if (name) {
                clearError();
                getCharacterByName(name)
                .then((char) => setContent(char));
            }
        }
        
    },[id, name])

    const ReturnLink = () =>  type === 'comic' ? <Link to={"/comics/"} className="single-comic__back">Back to all</Link> 
                       : <Link to={"/"} className="single-comic__back">Back to main</Link>;



    return (
        loading ? <Spinner/> : error ? <ErrorMessage/> : 
        <div className="single-comic">
            <img src={content.thumbnail} alt="img" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{content.name}</h2>
                <p className="single-comic__descr">{content.description}</p>
                { content.pageCount && <p className="single-comic__descr">{content.pageCount}</p>}
                {content.language && <p className="single-comic__descr">Language: {content.language}</p>}
                {content.price && <div className="single-comic__price">Price: {content.price}</div>}
            </div>
            <ReturnLink/>
        </div>
    )
}

export default SinglePage;