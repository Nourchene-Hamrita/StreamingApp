const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = new Schema(
    {
        trainerId: {
            type: String,
            required: true

        },
        channel: {
            type: [{
                channelId: String,
                channelname: String,
                username:String,
                picture:String
            }],

        },
        title: {
            type: String,


        },
        description: {
            type: String,

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
            require: true
        },


    },
    { Timestamp: true }
);
const VideoModel = mongoose.model('video', videoSchema)
module.exports = VideoModel;
