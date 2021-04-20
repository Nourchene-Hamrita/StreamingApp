const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema(
    {
        videoId: {type:String
          

        },
        commenterId: {type:String
          

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
            default:"http://192.168.1.14:3000/public/605b0abf022908280c811bca1617801073904.jpg"
        },
      
       


    },
    { Timestamp: true }
);
const CommentModel = mongoose.model('comment', commentSchema)
module.exports = CommentModel;
