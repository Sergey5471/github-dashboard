import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import {repositoryListReducer} from "../components/MainPage/RepositoryList/repositoryList-reducer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    repositoryList: repositoryListReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

window.store = store

