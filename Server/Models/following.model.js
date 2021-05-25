const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const followingSchema = new Schema(
    {
        channelId: {
            type: String
        },
        userId: {
            type: String
        },
        channelname: {
            type: String,

        },
        theme: {
            type: String,
        },

        followers: {
            type: [String],
            required: true
        },

        picture: {
            type: String,
        },




    },
    { Timestamp: true }
);
const FollowingModel = mongoose.model('following', followingSchema)
module.exports = FollowingModel;
