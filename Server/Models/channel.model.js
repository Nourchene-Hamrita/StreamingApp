const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const channelSchema = new Schema(
    {
        trainerId: {
            type: String,
            required: true

        },
        channelname: {
            type: String,


        },
        theme: {
            type: String,

        },

        picture: {
            type: String,
        },
        CreatedAt: {
            type: Date,
            default: Date.now,
            required: true

        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        },


    },
    { Timestamp: true }
);
const ChannelModel = mongoose.model('channel', channelSchema)
module.exports = ChannelModel;
