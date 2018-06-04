const admin = require('firebase-admin');
const os = require('os');
const path = require('path');
const {generateUuid} = require('./utils');

module.exports.upload = function(req, res) {

    if (!req.files || !req.files.track) {
        return res.status(400);
    }

    const trackFile = req.files.track;

    const uuid = generateUuid();
    const tmpFilePath = path.join(os.tmpdir(), './track-' + uuid + '.mp3');

    trackFile.mv(tmpFilePath, function(err) {

        if (err) {
            console.log(err);
            res.status(500);
            throw err;
        }

        admin.storage().bucket('functions-demo-206213-tracks').upload(tmpFilePath, {
            destination: uuid + '.mp3',
            metadata: {
                uuid: uuid,
                originalName: trackFile.name,
            },
        }).then(() => {
            res.json({
                uuid: uuid,
                originalName: trackFile.name,
            });
        }).catch(err => {
            console.log(err);
        })
    });
};