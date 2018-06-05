const path = require('path');
const os = require('os');
const admin = require('firebase-admin');
const {tracksBucket} = require('./config');

exports.upload = function(req, res) {

    console.log('upload');

    if (!req.file) {
        console.log('bad');
        console.log('file:' + req.file);
        return res.status(400).json({});
    }

    console.log('ok')
    const trackFile = req.file;

    console.log('uuid')
    const uuid = req.file.uuid;
    console.log('uuid generated')
    const tmpFilePath = path.join(os.tmpdir(), './track-' + uuid + '.mp3');

    console.log('move to tmp')

    const data = {
        uuid: uuid,
        originalName: trackFile.originalname,
    };

    console.log('move to storage')

    return admin.storage().bucket(tracksBucket).upload(tmpFilePath, {
        destination: uuid + '.mp3',
        metadata: {
            uuid: uuid,
            originalName: trackFile.originalname,
        },
    }).then(() => {
        console.log('push to firebase');
        res.json(data);
        return admin.database().ref('/tracks/' + uuid).set(data);
    }).catch(err => {
        console.log(err);
    })
};