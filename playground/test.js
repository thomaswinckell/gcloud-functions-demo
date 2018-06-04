var acoustid = require("acoustid");


acoustid("/Users/thomaswinckell/Desktop/test.mp3", {
    key: "NFqOeSUerAg",
    fpcalc: {
        command: "./fpcalc"
    },
}, callback);


function callback(err, results) {
    if (err) throw err;
    const recording = results[0].recordings[0];
    const artists = recording.artists;
    const release = recording.releasegroups[0];
    //console.log(recording);
    console.log(release.releases[0].mediums[0].tracks);

    const model = {
        artists: artists,
        duration: recording.duration,
        id: recording.id,
        title: recording.title,
        release: {
            title: release.title,
            type: release.type,
        },
    };

    console.log('\n\n\nMODEL :\n\n\n');
    console.log(model);
}