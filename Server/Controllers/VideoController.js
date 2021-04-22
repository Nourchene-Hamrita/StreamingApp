const ObjectID = require('mongoose').Types.ObjectId;
const VideoModel = require('../Models/video.model');
const UserModel = require('../Models/user.model');
const ChannelModel = require('../Models/channel.model');
const CommentModel = require('../Models/comment.model');
const { uploadErrors } = require("../utils/errors.util");
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

module.exports.listVideo = (req, res) => {
    VideoModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get Data: ' + err);
    }).sort({ createdAt: -1 });

}
module.exports.VideoInfo = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
    VideoModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown: ' + err);
    });
};
module.exports.createVideo = async (req, res) => {
    let fileName;
    if (req.file != null) {
        try {
            if (
                req.file.detectedMimeType != "video/mp4"

            )
                throw Error("invalid file");
            if (req.file.size > 500000000) throw Error("max size");

        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
        fileName = req.body.channelId + Date.now() + ".mp4";
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../public/${fileName}`
            )
        );
    }
    const newVideo = new VideoModel({
        channelId: req.body.channelId,
        channelname: req.body.channelname,
        theme: req.body.theme,
        picture: req.body.picture,
        title: req.body.title,
        description: req.body.description,
        tag:req.body.tag,
        link: req.file != null ? 'http://192.168.1.14:3000/public/' + fileName : "",
        likers: [],
        dislikers: [],
        comments: [],
        note: [],
        tags:[]
    });
    try {
        console.log(req.body.channelId)

       await ChannelModel.findByIdAndUpdate(req.body.channelId, {
            $addToSet: { videos: newVideo }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);


            })

    
              
        const video = await newVideo.save();
        return res.status(201).json(video);
        

    } catch (err) {
        return res.status(400).send(err);
    }

};
module.exports.UpdateVideo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
    const VideoUpdate = {
        title: req.body.title,
        description: req.body.description,

    }
    VideoModel.findByIdAndUpdate(
        req.params.id,

        { $set: VideoUpdate }
        ,
        { new: true },

        (err, docs) => {
            if (!err) return res.send(docs);
            else console.log('Update Error: ' + err);
        }
    )


}
module.exports.DeleteVideo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
    try {
        await VideoModel.findByIdAndRemove(req.params.id,
            (err, docs) => {
                if (!err) res.status(200).json({ message: 'successfully deleted' });
                else console.log('Delete Error: ' + err);
            });
    } catch (err) {
        res.status(400).send(err);

    }
};
module.exports.likeVideo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id);
    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $addToSet: { likers: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);


            }
        );
        await UserModel.findOneAndUpdate(req.params.id, {
            $addToSet: { likes: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);


            });
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $pull: { dislikers: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);


            }
        );
        await UserModel.findOneAndUpdate(req.params.id, {
            $pull: { dislikes: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);


            })

    } catch (err) {
        res.status(400).send(err);

    }

};
module.exports.dislikeVideo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id);
    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $addToSet: { dislikers: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);


            }
        );
        await UserModel.findOneAndUpdate(req.params.id, {
            $addToSet: { dislikes: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);


            });
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $pull: { likers: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);


            }
        );
        await UserModel.findOneAndUpdate(req.params.id, {
            $pull: { likes: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);


            })

    } catch (err) {
        res.status(400).send(err);

    }

};
module.exports.unlikeVideo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id);
    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $pull: { likers: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);


            }
        );
        await UserModel.findOneAndUpdate(req.params.id, {
            $pull: { likes: req.body.id }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);


            })

    } catch (err) {
        res.status(400).send(err);

    }


};
module.exports.noteVideo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id);
    try {
        return VideoModel.findByIdAndUpdate(req.params.id, {
            $push: {
                note: {
                    Id: req.body.Id,
                    Pseudo: req.body.Pseudo,
                    val: req.body.val,
                    Timestamp: new Date().getTime()
                }
            }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            })

    } catch (err) {
        res.status(400).send(err);
    }

};
module.exports.commentVideo = async (req, res) => {
    const newComment = new CommentModel({
        videoId: req.params.id,
        commenterId: req.body.commenterId,
        commenterPseudo: req.body.commenterPseudo,
        text: req.body.text,
        picture: req.body.picture

    });
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id);

    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $addToSet: {
                comments: {
                    commenterId: req.body.commenterId,
                    commenterPseudo: req.body.commenterPseudo,
                    text: req.body.text,
                    Timestamp: new Date().getTime()
                }
            }
        },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            })
        const comment = await newComment.save();
        return res.status(201).json(comment);


    } catch (err) {
        res.status(400).send(err);
    }

};
module.exports.ChannelVideoList = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    VideoModel.find({ channelId: req.params.id }, (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
    })




};

module.exports.DeleteComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id);
    try {
        return VideoModel.findByIdAndUpdate(req.params.id, {
            $pull: {
                comments: {
                    _id: req.body.commentId,
                }
            }
        }, { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        )

    } catch (err) {
        return res.status(400).send(err);
    }

};
module.exports.SearchVideo = async (req, res) => {
  
    console.log(req.query.tag);
       try{
        VideoModel.find({"tag":'#'+req.query.tag},(err,docs) => {
            if (!err) res.send(docs);
            else return res.status(400).send(err);
    })
} catch (err) {
    return res.status(400).send(err);
}


   
};



