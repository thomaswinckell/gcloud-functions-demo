import React, { Component } from 'react';
import firebase from 'firebase';


export default class Tracks extends Component {

    state = {
        tracks: [],
        trackToPlay: undefined,
    };

    componentDidMount() {
        firebase.database().ref('/tracks').on('value', snapshot => {
            const data = snapshot.val();
            console.log('data');
            const tracks = Object.keys(data).reduce((acc, curr) => [...acc, data[curr]], []);
            this.setState({tracks});
        })
    }

    renderPlayer() {
        if(!this.state.trackToPlay) {
            return null;
        }

        return (
            <audio controls autoPlay>
                <source src={`http://localhost:5000/functions-demo-206213/us-central1/app/track/${this.state.trackToPlay.uuid}`} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        );
    }

    renderTrack(track) {
        return (
            <div key={track.uuid}>
                UUID : {track.uuid}
                <button onClick={() => this.setState({trackToPlay: track})}>Play</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderPlayer()}
                {this.state.tracks.map(t => this.renderTrack(t))}
            </div>
        )
    }
}