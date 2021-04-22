const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema(
    {    tag: {type:String
          

    },
        channelId: {type:String
          

        },
        channelname: {type:String
          

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


    },
    { Timestamp: true }
);
const TagModel = mongoose.model('tag', tagSchema)
module.exports = TagModel;
