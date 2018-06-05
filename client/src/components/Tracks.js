import React, { Component } from 'react';
import firebase from 'firebase';


export default class Tracks extends Component {

    state = {
        tracks: [],
        trackToPlay: undefined,
    };

    componentDidMount() {
        firebase.database().ref('/tracks').on('value', snapshot => {
            const data = snapshot.val() || {};
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

    renderArtists(track) {
        if(track.artists && track.artists.length > 0) {
            return (
                <div>
                    Artists : {track.artists.map(a => a.name).join(', ')}
                </div>
            )
        }
    }

    renderTrack(track) {
        return (
            <li key={track.uuid} className="list-group-item">
                <div>
                    Original name : {track.originalName}
                </div>
                {track.title && (
                    <div>
                        Title : {track.title}
                    </div>
                )}
                {this.renderArtists(track)}
                {track.release && (
                    <div>
                        Album : {track.release.title}
                    </div>
                )}
                {track.release && (
                    <div>
                        Year : {track.release.year}
                    </div>
                )}
                {track.error && (
                    <div>
                        Error : {track.error}
                    </div>
                )}
                <button onClick={() => this.setState({trackToPlay: track})}>Play</button>
            </li>
        )
    }

    render() {
        return (
            <div>
                {this.renderPlayer()}
                <ul className="list-group">
                    {this.state.tracks.map(t => this.renderTrack(t))}
                </ul>
            </div>
        )
    }
}