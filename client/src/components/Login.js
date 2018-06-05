import React, { Component } from 'react';
import firebase from 'firebase';

class Login extends Component {

    state = {
        token: null,
        user: null,
        signInDisabled: false,
    };

    componentDidMount() {
        this.initApp();
    }

    /**
     * Function called when clicking the Login/Logout button.
     */
    toggleSignIn() {
        if (!firebase.auth().currentUser) {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithRedirect(provider);
        } else {
            firebase.auth().signOut();
        }
        this.setState({signedInDisabled: true});
    }


    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
     *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
     */
    initApp() {

        firebase.auth().getRedirectResult().then((result) => {

            let token = null;

            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                token = result.credential.accessToken;
            }

            const user = result.user;

            this.setState({token, user});

        }).catch((error) => {

            // Handle Errors here.
            const errorCode = error.code;
            //const errorMessage = error.message;

            // The email of the user's account used.
            //const email = error.email;

            // The firebase.auth.AuthCredential type that was used.
            //const credential = error.credential;

            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }

        });


        // Listening for auth state changes.
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                /*const displayName = user.displayName;
                const email = user.email;
                const emailVerified = user.emailVerified;
                const photoURL = user.photoURL;
                const isAnonymous = user.isAnonymous;
                const uid = user.uid;
                const providerData = user.providerData;*/
            }

            this.setState({user, signedInDisabled: false});
        });
    }

    render() {
        console.log(this.state.user);
        if(this.state.user) {
            return this.props.render(this.state.user);
        } else {
            return (
                <div>
                    <button onClick={() => this.toggleSignIn()}>
                        Sign in with Google
                    </button>
                </div>
            )
        }
    }
}

export default Login;
