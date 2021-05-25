const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = new Schema(
    {
        channelId: {
            type: String


        },
        channelname: {
            type: String


        },
        picture: {
            type: String,
        },
        theme: {
            type: String,

        },
        title: {
            type: String,


        },
        description: {
            type: String,

        },
        tags: {
            type: [String],
            required: true

        },

        link: {
            type: String,
        },
        PublishedAt: {
            type: Date,
            default: Date.now,
            required: true

        },
        likers: {
            type: [String],
            required: true
        },
        dislikers: {
            type: [String],
            required: true
        },
        note: {
            type: [{
                Id: String,
                Pseudo: String,
                val: Number,
                Timestamp: Number
            }],
            required: true
        },
        comments: {
            type: [{
                commenterId: String,
                commenterPseudo: String,
                text: String,
                Timestamp: Number
            }],
            required: true
        },
        category: {
            type: String,

        },


    },

    { Timestamp: true }
);
const VideoModel = mongoose.model('video', videoSchema)
module.exports = VideoModel;
