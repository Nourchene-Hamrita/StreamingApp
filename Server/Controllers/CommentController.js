const morgan = require('morgan');
const ObjectID = require('mongoose').Types.ObjectId;
const CommentModel = require('../Models/comment.model');

module.exports.CommentVideo = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
        
        CommentModel.find({videoId:req.params.id},(err,docs) => {
            if (!err) res.send(docs);
            else return res.status(400).send(err);
    }) 
};
module.exports.DeleteComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
    try {
        await CommentModel.findByIdAndRemove(req.params.id,
            (err, docs) => {
                if (!err) return res.status(200).json({ message: 'successfully deleted' });
                else console.log('Delete Error: ' + err);
            });
    } catch (err) {
        res.status(400).send(err);

    }
};