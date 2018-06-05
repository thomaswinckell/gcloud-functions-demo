const admin = require('firebase-admin');
const {tracksBucket} = require('./config');


exports.trackStream = function(req, res) {

    const uuid = req.params.uuid;

    console.log('trackStream');
    console.log(uuid);

    const blob = admin.storage().bucket(tracksBucket).file(uuid + '.mp3');

    blob.createReadStream().pipe(res);
};