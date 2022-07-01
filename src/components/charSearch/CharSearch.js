import "./CharSearch.scss";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

import useMarvelService from "../../services/MarvelService"
import { NavLink } from "react-router-dom";


const CharSearch = () => {
    const {getCharacterByName, clearError} = useMarvelService();

    useEffect(() => {
        return(() => {
            setChar(null);
        })
    },[])

    const [char, setChar] = useState(null);

    const onSubmit = (charName) => {
        clearError();
        getCharacterByName(charName)
            .then((char) =>  setChar(char));
    }

    const LinkToPage = ({char}) => {
    if(char.name) {
        const {name} = char;

        return(
            <div className="char__form">
                <div className="char-name">That is it! Visit {name} page</div>
                <div className="char__btns">
                    <NavLink end to={`/${name}/char`}>
                        <div className="button button__secondary">
                        <div className="inner">
                                To page
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>

        )
    }

    return <div className="char__error">{char.message}</div>
}

    return(
        <Formik 
            initialValues={{
                name: ''
            }}
            validationSchema={ Yup.object({
                name: Yup.string()
                    .min(2, 'min 2 symbols')
                    .required('Required field')
            })}
            onSubmit={value => onSubmit(value.name)}>
                <Form className="char__search">
                    <h2>Or find a char by name:</h2>
                    <div className="char__form">
                        <Field
                            className="char__field"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name of char" 
                            />
                        <div className="char__btns">
                            <button type="submit" className="button button__main">
                                <div className="inner">Find it!</div>
                            </button>
                        </div>
                    </div>
                    <ErrorMessage className='char__error' name='name' component="div"/>
                    {char && <LinkToPage char={char}/>}
                </Form>
            </Formik>

    )
}

export default CharSearch;