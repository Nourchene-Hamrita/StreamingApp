const morgan = require('morgan');
const ObjectID = require('mongoose').Types.ObjectId;
const CommentModel = require('../Models/comment.model');
const UserModel = require('../Models/user.model');
const VideoModel=require('../Models/video.model');

module.exports.CommentVideo = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
        
        CommentModel.find({videoId:req.params.id},(err,docs) => {
            if (!err) res.send(docs);
            else return res.status(400).send(err);
    })



   
};