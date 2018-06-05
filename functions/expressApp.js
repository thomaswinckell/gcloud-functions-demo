const express = require('express');
const os = require('os');
const cookieParser = require('cookie-parser')();
const {validateFirebaseIdToken} = require('./firebaseMiddleware');
const multer = require("multer");
const {generateUuid} = require('./utils');
const bodyParser = require('body-parser');
const {upload} = require('./upload');
const {trackStream} = require('./trackStream');


const cors = require('cors')({
    origin: true,
});

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, os.tmpdir())
    },
    filename: function (req, file, cb) {
        file.uuid = generateUuid();
        cb(null, 'track-' + file.uuid + '.mp3')
    }
});

app.use(cors);
app.use(cookieParser);
app.use(bodyParser.json());
app.use(multer({storage}).single('track'));

app.post('/upload', validateFirebaseIdToken, upload);
app.get('/track/:uuid', trackStream);

exports.app = app;
