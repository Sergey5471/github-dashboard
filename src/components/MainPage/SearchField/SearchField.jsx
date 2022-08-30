import React from "react";
import logo from "./logo.png"
import styles from './SearchField.module.css'
import '../../../style.css'
import {useDispatch, useSelector} from 'react-redux';
import {setSearchValue} from "../RepositoryList/repositoryList-reducer";

export const SearchField = (props) => {

    const dispatch = useDispatch();

    const searchValue = useSelector(state => state.repositoryList.searchValue)
    const page = useSelector(state => state.repositoryList.currentPage)

    const onChange = (event) => {
        const searchValue = event.currentTarget.value
        dispatch(setSearchValue(searchValue))
        props.setSearchParams({searchValue, page})
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <a href="#">
                        <img className={styles.logo} src={logo} alt=""/>
                    </a>
                    <form action="src/components/MainPage/SearchField/SearchField">
                        <input className={styles.input} type="text" onChange={onChange} value={props.paramsSearchValue ? props.paramsSearchValue : searchValue}/>
                    </form>
                </div>
            </div>
        </header>
    )
}
