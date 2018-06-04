const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const {validateFirebaseIdToken} = require('./firebaseMiddleware');
const {upload} = require('./upload');

const app = express();


app.use(cors);
app.use(cookieParser);
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10mo is the max upload for a function
}));
app.use(validateFirebaseIdToken);


app.post('/upload', upload);

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);