import './App.css';
import {Routes, Route} from "react-router-dom";
import {RepositoryCard} from "./components/RepositoryCard/RepositoryCard";
import {MainPage} from "./components/MainPage/MainPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/card/:ownerName/:repoName'} element={<RepositoryCard/>}/>
            </Routes>
        </div>
    );
}

export default App;
