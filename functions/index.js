const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const {app} = require('./expressApp');
const {onUploadTrackOnBucket} = require('./storageFunctions');

exports.app = functions.https.onRequest(app);

exports.onUploadTrackOnBucket = onUploadTrackOnBucket;