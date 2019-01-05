"use strict";

var Upload = {};

Upload.processUpload = function(payload, callback) {
    //console.log(payload);
    callback(null, {id:'path'});
    
     /*if (payload.type.startsWith('audio/')) {
        var id = path.basename(payload.path),
            uploadPath = path.join(nconf.get('upload_path'), 'audio-embed', id);

        async.waterfall([
            async.apply(mv, payload.path, uploadPath),
            async.apply(db.setObject, 'audio-embed:id:' + id, {
                name: payload.name,
                size: payload.size
            }),
            async.apply(db.sortedSetAdd, 'audio-embed:date', +new Date(), id)
        ], function(err) {
            if (err) {
                return callback(err);
            }

            callback(null, {
                id: id
            });
        });
    } else {
        callback(new Error('invalid-file-type'));
    }*/
};

module.exports = Upload;