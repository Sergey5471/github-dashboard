import {
    fetchLanguages,
    fetchMostRatedRepositories,
    fetchRepositoriesBySearchQuery,
    fetchRepository
} from "../../../services/service";

const initialState = {
    repos: [],
    languages: [],
    queryParams: {},
    searchValue: '',
    reposTotalCount: 0,
    currentPage: 1,
}

export const repositoryListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET-REPOS':
            return {...state, repos: action.repos}
        case 'SET-LANGUAGES':
            return {...state, languages: action.languages}
        case 'SET-QUERY-PARAMS':
            return {...state, queryParams: action.queryParams}
        case 'SET-SEARCH-VALUE':
            return {...state, searchValue: action.searchValue}
        case 'SET-REPOS-TOTAL-COUNT':
            return {...state, reposTotalCount: action.reposTotalCount}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        default:
            return state
    }
}

// actions
export const setRepos = (repos) => ({type: 'SET-REPOS', repos})
export const setLanguages = (languages) => ({type: 'SET-LANGUAGES', languages})
export const setQueryParams = (queryParams) => ({type: 'SET-QUERY-PARAMS', queryParams})
export const setSearchValue = (searchValue) => ({type: 'SET-SEARCH-VALUE', searchValue})
export const setReposTotalCount = (reposTotalCount) => ({type: 'SET-REPOS-TOTAL-COUNT', reposTotalCount})
export const setCurrentPage = (currentPage) => ({type: 'SET-CURRENT-PAGE', currentPage})

// thunks
export const getRepositories = (dispatch) => {
    fetchMostRatedRepositories().then((res) => {
        dispatch(setRepos(res.items))
    })
}

export const getRepositoriesBySearch = (value, page) => (dispatch) => {
    fetchRepositoriesBySearchQuery({searchQuery: value, page}).then((searchRes) => {
        dispatch(setRepos(searchRes.items))
        dispatch(setReposTotalCount(searchRes['total_count']))
    })
}

export const getRepo = (owner, repositoryName) => (dispatch) => {
    fetchRepository(owner, repositoryName).then((res) => {
        // dispatch(setLanguages(Object.keys(res)))
        dispatch(setRepos([res]))
    })
        .then(() => {
            fetchLanguages(owner, repositoryName).then((res) => {
                dispatch(setLanguages(Object.keys(res)))
            })
        })
}

export const getRepoLanguages = (owner, repositoryName) => (dispatch) => {
    fetchLanguages(owner, repositoryName).then((res) => {
        dispatch(setLanguages(Object.keys(res)))
    })
}

