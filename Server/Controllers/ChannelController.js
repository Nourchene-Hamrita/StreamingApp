const morgan = require('morgan');
const ObjectID = require('mongoose').Types.ObjectId;
const ChannelModel = require('../Models/channel.model');
const UserModel = require('../Models/user.model');
const VideoModel = require('../Models/video.model');
const FollowingModel = require('../Models/following.model');
const { uploadErrors } = require("../utils/errors.util");
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);
let endPoint = 'http://192.168.1.14:3000/public/'

module.exports.getAllChannel = async (req, res) => {
    ChannelModel.find((err, docs) => {
        if (!err) return res.send(docs);
        else console.log('Error to get Data: ' + err);
    }).sort({ createdAt: -1 });

}
module.exports.ChannelInfo = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
    ChannelModel.findById(req.params.id, (err, docs) => {
        if (!err) return  res.send(docs);
        else console.log('ID unknown: ' + err);
    });
};
module.exports.UserChannelInfo = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    ChannelModel.find({ trainerId: req.params.id }, (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
    })




};
module.exports.createChannel = async (req, res) => {
    const newChannel = new ChannelModel({
        trainerId: req.body.trainerId,
        theme: req.body.theme,
        channelname: req.body.channelname,
        videos: [],
        followers: [],



    });
    try {
        const channel = await newChannel.save();
        return res.status(201).json(channel);
    } catch (err) {
        return res.status(400).send(err);
    }

}
module.exports.uploadChannel = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        )
            throw Error("invalid file");

        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }
    const fileName = req.body.channelId + Date.now() + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../public/${fileName}`
        )
    );

    try {
        await ChannelModel.findByIdAndUpdate(
            req.body.channelId,
            { $set: { picture:  `${endPoint}` + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        );
       /* await VideoModel.findByIdAndUpdate(
            req.body.videoId,
            { $set: { picture:  `${endPoint}` + fileName } },
            { new: true },
            (err, docs) => {
                return res.status(500).send({ message: err });
            }
        );*/
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

module.exports.UpdateChannel = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
    const ChannelUpdate = {
        channelname: req.body.channelname,
        theme: req.body.theme,

    }
    ChannelModel.findByIdAndUpdate(
        req.params.id,

        { $set: ChannelUpdate }
        ,
        { new: true },

        (err, docs) => {
            if (!err) return res.send(docs);
            else console.log('Update Error: ' + err);
        }
    )


};
module.exports.follow = async (req, res) => {
    const newFollowing = new FollowingModel({
        userId: req.params.id,
        channelId: req.body.idToFollow,
        channelname: req.body.channelname,
        picture:req.body.picture,
        theme:req.body.theme,

    });
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToFollow)
    )
        return res.status(400).send("ID unknown : " + req.params.id);



    try{
        
        // add to the following list
        await ChannelModel.findByIdAndUpdate(
            req.body.idToFollow, {
            $addToSet: { followers: req.params.id }
        },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) return res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        const following = await newFollowing.save();
        return res.status(201).json(following);
        
        
       


    } catch (err) {
        return res.status(500).json({ message: err});
    }




}


module.exports.unfollow = async (req, res) => {
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToUnFollow)
    )
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        // remove from the following list
        await ChannelModel.findByIdAndUpdate(
            req.body.idToUnFollow, {
            $pull: { followers: req.params.id }
        },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) return res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        await FollowingModel.findOneAndRemove(
            { channelId: req.body.idToUnFollow,userId: req.params.id },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );


    } catch (err) {
        return res.status(500).json({ message: err });
    }

};
