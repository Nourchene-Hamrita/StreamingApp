const morgan = require('morgan');
const ObjectID = require('mongoose').Types.ObjectId;
const ChannelModel = require('../Models/channel.model');
const UserModel = require('../Models/user.model');
const { uploadErrors } = require("../utils/errors.util");
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

module.exports.createChannel = async (req, res) => {
    let fileName;
    if (req.file != null) {
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
        fileName = req.body.trainerId + Date.now() + ".jpg";
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../public/${fileName}`
            )
        );
    }
    console.log(req.body);
    const channel = await new ChannelModel({
        trainerId: req.body.trainerId,
        channelname: req.body.channelname,
        theme: req.body.theme,
        picture: req.file != null ? 'http://192.168.1.11:3000/public/' + fileName : "",
    });
    channel.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new channel' + err);

    })
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
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToFollow)
    )
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        // add to the follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // add to the following list
        await ChannelModel.findByIdAndUpdate(
            req.body.idToFollow, {
            $addToSet: { followers: req.params.id }
        },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                if (err) return res.status(400).jsos(err);
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.unfollow = async (req, res) => {
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToUnFollow)
    )
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        // remove from the follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // remove from the following list
        await ChannelModel.findByIdAndUpdate(
            req.body.idToUnFollow, {
            $pull: { followers: req.params.id }
        },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                if (err) return res.status(400).jsos(err);
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
   
};
