const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema(
    {
        videoId: {
            type: String


        },
        commenterId: {
            type: String


        },

        commenterPseudo: {
            type: String,

        },
        text: {
            type: String,


        },
        PublishedAt: {
            type: Date,
            default: Date.now,
            required: true

        },
        picture: {
            type: String,
        },




    },
    { Timestamp: true }
);
const CommentModel = mongoose.model('comment', commentSchema)
module.exports = CommentModel;
