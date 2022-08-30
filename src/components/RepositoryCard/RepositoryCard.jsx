import React, { useEffect } from "react";
import styles from "./RepositoryCard.module.css"
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRepo, getRepoLanguages} from "../MainPage/RepositoryList/repositoryList-reducer";

export function RepositoryCard(props) {

    const dispatch = useDispatch();

    const repositories = useSelector(state => state.repositoryList.repos)
    const languages = useSelector(state => state.repositoryList.languages)
    const searchValue = useSelector(state => state.repositoryList.searchValue)
    const page = useSelector(state => state.repositoryList.currentPage)
    const params = useSelector(state => state.repositoryList.queryParams)
    const repo = useSelector(state => state.repositoryList.repos[0])

    const {ownerName, repoName} = useParams();

    // const repo = repositories.filter(repo => repo.name === repoName)[0]
    console.log(ownerName)
    console.log(repoName)

    useEffect(() => {
        dispatch(getRepo(ownerName, repoName))
        // dispatch(getRepoLanguages(repo['owner']['login'], repo.name))
    }, [])

    const showLanguages = () => {
        return languages.map((lang, index) => {
            return (
                <li key={index}>{lang}</li>
            )
        })
    }

    if (repo === undefined) {
        return <div>wait</div>
    } else {
        return (
			<div className="container">
				<div className={styles.head}>
					<h2>{repo.full_name}</h2>
					<div className={styles.stars}>
						<svg aria-label="star" role="img" height="18" viewBox="0 0 16 16" version="1.1" width="18" data-view-component="true" className="octicon octicon-star">
							<path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
						</svg>
						<span>{repo["stargazers_count"]}</span>
					</div>
				</div>
				<div className={styles.body}>
					<div className={styles.owner}>
						<img src={`${repo.owner.avatar_url}`} alt="#" className={styles.owner__img} />
						<a className={styles.owner__name} href={`https://github.com/${repo['owner']['login']}`} target="_blank" rel="noopener noreferrer" title="Show github account">{repo.owner.login}</a>
					</div>
					<div>
						<p className={styles.description}> Description:<br />{repo.description}</p>
						<p className={styles.languages}>Languages:</p>
						<ul className={styles.languages__list}>
							{showLanguages()}
						</ul>
						<Link to={'/'}>back to repos</Link>
					</div>
				</div>
	
			</div>
		)
    }


}
