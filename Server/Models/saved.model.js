const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const savedSchema = new Schema(
    {
        UserId: {
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

        link: {
            type: String,
        },
        likers: {
            type: [String],
            required: true
        },
        tags: {
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
const SavedModel = mongoose.model('save', savedSchema)
module.exports = SavedModel;
