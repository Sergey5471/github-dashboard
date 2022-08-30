import React from "react";
import styles from "./repositoryList.module.css"
import {Repositories} from "./Repositories/Repositories";
import {Paginator} from "../Paginator/Paginator";

export const RepositoryList = (props) => {
    return (
        <div className="container">
            <h1 className={styles.title}>Repository search list</h1>
			<Repositories />
			<Paginator setSearchParams={props.setSearchParams}/>
        </div>

    )
}
