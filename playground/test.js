var acoustid = require("acoustid");


acoustid("/Users/thomaswinckell/Desktop/test.mp3", {
    key: "REPLACE_ME",
    fpcalc: {
        command: "./fpcalc"
    },
}, function (err, results) {

    if (err) {
        throw err;
    }

    const recording = results[0].recordings[0];
    const artists = recording.artists;
    const releaseGroup = recording.releasegroups[0];
    const release = releaseGroup.releases[0];
    const year = release.date.year;

    const model = {
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

    console.log('\n\n\nMODEL :\n\n\n');
    console.log(model);
});


