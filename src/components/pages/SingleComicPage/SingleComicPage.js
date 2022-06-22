import './singleComicPage.scss';

import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import useMarvelService from '../../../services/MarvelService';

const SingleComicPage = () => {
    const {id} = useParams();
    const [comic, setComic] = useState({})

    const {loading,error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        if (id) {
            clearError();
            getComics(id)
            .then((comic) => setComic(comic));
        }
    },[id])


    return (
        loading ? <Spinner/> : error ? <ErrorMessage/> : 
        <div className="single-comic">
            <img src={comic.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.name}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pageCount}</p>
                <p className="single-comic__descr">Language: {comic.language}</p>
                <div className="single-comic__price">Price: {comic.price}</div>
            </div>
            <Link to={"/comics/"} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;