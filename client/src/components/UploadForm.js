import React, { Component } from 'react';
import firebase from 'firebase';


class UploadForm extends Component {

    state = {
        uploading: false,
    };

    upload(files) {

        if(files.length === 0) {
            return;
        }

        this.setState({uploading: true}, () => {

            const data = new FormData();

            data.append('track', files[0], files[0].name);

            firebase.auth().currentUser.getIdToken(true).then((idToken) => {

                fetch('http://localhost:5000/functions-demo-206213/us-central1/app/upload', {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + idToken,
                    },
                }).then(r => r.json()).then(() => {
                    this.setState({uploading: false});
                }).catch(err => {
                    console.log(err);
                    this.setState({uploading: false});
                })
            });
        });
    }

    render() {
        return (
            <form onSubmit={e => e.preventDefault()}>
                <div className="file btn btn-lg btn-primary file-upload-btn">
                    {this.state.uploading ? 'Uploading...' : 'Upload a track' }
                    {this.state.uploading ? null : <input type="file" name="track" onChange={ (e) => this.upload(e.target.files) }/> }
                </div>
            </form>
        )
    }
}

export default UploadForm;
