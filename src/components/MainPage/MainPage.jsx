import React, {useEffect} from "react";
import {SearchField} from "./SearchField/SearchField";
import {RepositoryList} from "./RepositoryList/RepositoryList";
import {useDispatch, useSelector} from "react-redux";
import {
    getRepositoriesBySearch,
    setCurrentPage,
    setQueryParams,
    setSearchValue
} from "./RepositoryList/repositoryList-reducer";
import useDebounce from "../../hooks/useDebounce";
import {useSearchParams} from "react-router-dom";

export const MainPage = () => {

    const dispatch = useDispatch();

    const searchValue = useSelector(state => state.repositoryList.searchValue)
    const currentPage = useSelector(state => state.repositoryList.currentPage)

    const debouncedValue = useDebounce(searchValue, 1000)

    const [searchParams, setSearchParams] = useSearchParams();

    const paramsSearchValue = searchParams.get('searchValue')
    const page = +searchParams.get('page')
    const params = {searchValue: paramsSearchValue, page}

    useEffect(() => {
        dispatch(getRepositoriesBySearch(paramsSearchValue ? paramsSearchValue : debouncedValue, page ? page : currentPage))
        page && dispatch(setCurrentPage(page))
        paramsSearchValue && dispatch(setSearchValue(paramsSearchValue))
        dispatch(setQueryParams(params))
    }, [debouncedValue])

    return (
        <div className="mainpage">
            <SearchField setSearchParams={setSearchParams} paramsSearchValue={paramsSearchValue}/>
            <RepositoryList setSearchParams={setSearchParams}/>
        </div>
    )
}
