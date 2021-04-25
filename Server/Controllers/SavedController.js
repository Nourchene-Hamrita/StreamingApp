const ObjectID = require('mongoose').Types.ObjectId;
const SavedModel = require('../Models/saved.model');
const UserModel = require('../Models/user.model');
const ChannelModel = require('../Models/channel.model');
const CommentModel = require('../Models/comment.model');

module.exports.SavedList = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    SavedModel.find({ UserId: req.params.id }, (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
    })




};
module.exports.AddToSave = async (req, res) => {
const newSave = new SavedModel({
    UserId: req.body.UserId,
    channelname: req.body.channelname,
    picture:req.body.picture,
    theme: req.body.theme,
    title: req.body.title,
    description:req.body.description,
    category:req.body.category,
    link:req.body.link,
    comments:[],
    tags:[],
  


});
try {
    const save = await newSave.save();
    return res.status(201).json(save);
} catch (err) {
    res.status(200).send(err)
}

};