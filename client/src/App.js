import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";

class App extends Component {
    render() {
        return (
            <Login render={user => (
                <div>
                    <UploadForm user={user}/>

                    <h3>List of tracks</h3>
                </div>
            )}/>
        );
    }
}

export default App;
