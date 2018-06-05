const functions = require('firebase-functions');
const admin = require('firebase-admin');
const os = require('os');
const path = require('path');
const {tracksBucket, acoustidKey} = require('./config');
const acoustid = require("acoustid");


exports.onUploadTrackOnBucket = functions.storage.bucket(tracksBucket).object().onFinalize(object => {

    console.log('onUploadTrackOnBucket');
    console.log(object);
    console.log(path.join(__dirname, './bin/linux-fpcalc'));

    const filePath = object.name;
    const tempLocalFile = path.join(os.tmpdir(), filePath);

    console.log(fs.existsSync(path.join(os.tmpdir(), filePath)));

    const uuid = object.name.replace('.mp3', '');
    const selfLink = object.selfLink;
    const mediaLink = object.mediaLink;

    return admin.database().ref('/tracks/' + uuid).once('value').then(snapshot => {
        console.log('metadata');
        console.log(snapshot.val());
        const originalName = snapshot.val().originalName;

        return admin.storage().bucket(object.bucket).file(filePath).download({destination: tempLocalFile}).then(() => {

            return new Promise((resolve, reject) => {

                acoustid(tempLocalFile, {
                    key: acoustidKey,
                    fpcalc: {
                        command: path.join(__dirname, './bin/linux-fpcalc'),
                    },
                }, function (err, results) {

                    let model;

                    try {

                        if (!err) {

                            const recording = results[0].recordings[0];
                            const artists = recording.artists;
                            const releaseGroup = recording.releasegroups[0];
                            const release = releaseGroup.releases[0];
                            const year = release.date.year;

                            model = {
                                uuid: uuid,
                                originalName: originalName,
                                selfLink: selfLink,
                                mediaLink: mediaLink,
                                artists: artists,
                                duration: recording.duration,
                                id: recording.id,
                                title: recording.title,
                                release: {
                                    title: release.title,
                                    type: releaseGroup.type,
                                    year: year,
                                },
                            };

                            console.log(model);

                        } else {
                            console.error(err);
                        }

                    } catch(e) {
                        console.error(e);
                    }

                    if(model) {
                        admin.database().ref('/tracks/' + uuid).set(model).then(resolve).catch(reject);
                    } else {
                        return admin.database().ref('/tracks/' + uuid).set({
                            uuid: uuid,
                            selfLink: selfLink,
                            mediaLink: mediaLink,
                            originalName: originalName,
                            error: 'No metadata found'
                        });
                    }
                });
            })
        });
    });
});