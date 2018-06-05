import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";
import Tracks from "./components/Tracks";

class App extends Component {
    render() {
        return (
            <Login render={user => (
                <div>
                    <UploadForm user={user}/>

                    <h3>List of tracks</h3>

                    <Tracks/>
                </div>
            )}/>
        );
    }
}

export default App;
