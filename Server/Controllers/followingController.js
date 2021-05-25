const morgan = require('morgan');
const ObjectID = require('mongoose').Types.ObjectId;
const FollowingModel = require('../Models/following.model');


module.exports.followingList = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
        
        FollowingModel.find({userId:req.params.id},(err,docs) => {
            if (!err) res.send(docs);
            else return res.status(400).send(err);
    })



   
};