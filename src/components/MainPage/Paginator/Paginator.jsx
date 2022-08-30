import styles from './Paginator.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getRepositoriesBySearch, setCurrentPage} from "../RepositoryList/repositoryList-reducer";

export const Paginator = (props) => {

    const dispatch = useDispatch();

    const reposTotalCount = useSelector(state => state.repositoryList.reposTotalCount);
    const currentPage = useSelector(state => state.repositoryList.currentPage);
    const searchValue = useSelector(state => state.repositoryList.searchValue);

    const pagesCount = Math.ceil(reposTotalCount / 10);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const from = ((currentPage - 5) < 0) ? 0 : currentPage - 5;
    const to = ((currentPage - 5) < 0) ? 10 : currentPage + 5;
    const renderedPages = pages.slice(from, to);

    const onFirstPageClickHandler = () => {
        dispatch(getRepositoriesBySearch(searchValue, 1))
        dispatch(setCurrentPage(1))
        props.setSearchParams({searchValue, page: 1})
    }

    const onLastPageClickHandler = () => {
        dispatch(getRepositoriesBySearch(searchValue, pagesCount))
        dispatch(setCurrentPage(pagesCount))
        props.setSearchParams({searchValue, page: pagesCount})
    }

    return (
        <div className={styles.pages}>
            {
                pagesCount > 10 && <span
                    onClick={onFirstPageClickHandler}
                    className={styles.page_number}
                >
                first
            </span>
            }
            {
                renderedPages.map((page, index) => {

                    const pageNumberClass = `${styles.page_number} ${currentPage === page && styles.selected}`

                    const onPageChangeHandler = () => {
                        dispatch(getRepositoriesBySearch(searchValue, page))
                        dispatch(setCurrentPage(page))
                        props.setSearchParams({searchValue, page})
                    }

                    return (
                        <span
                            key={index}
                            onClick={onPageChangeHandler}
                            className={pageNumberClass}
                        >
                            {page}
                        </span>
                    )
                })
            }
            {
                pagesCount > 10 && pagesCount < 100 && <span
                    onClick={onLastPageClickHandler}
                    className={styles.page_number}
                >
                last
            </span>
            }

        </div>
    )
}