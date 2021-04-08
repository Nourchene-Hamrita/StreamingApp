const morgan = require('morgan');
const ObjectID = require('mongoose').Types.ObjectId;
const UserModel = require('../Models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}
module.exports.userInfo = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown: ' + err);
    }).select('-password');
};
module.exports.UpdateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age,
                    email: req.body.email,
                    login: req.body.login,
                    password: req.body.password,
                    country: req.body.country,
                }

            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).json({ message: err });
            }
        )

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.DeleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
    try {
        await UserModel.remove(
            { _id: req.params.id }).exec();
        res.status(200).json({ message: 'successfully deleted' });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.uploadProfil = async (req, res) => {
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
    const fileName = req.body.userId + Date.now() + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../public/${fileName}`
        )
    );

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture:'http://192.168.1.17:3000/public/' + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

























/*router.get('/', (req, res, next) => {
    UserModel.find((err, docs) => {
        if (!err)
            res.send(docs);
        else
            console.log('Error to get Data: ' + err);
    })
});
router.post('/', (req, res, next) => {
    console.log(req.body);
    const user = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age:req.body.age,
        email:req.body.email,
        login:req.body.login,
        password:req.body.password,
        country:req.body.country,

    });
    user.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new user' + err);

    })
});
router.put('/:id', (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
    else{
        user={
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age:req.body.age,
            email:req.body.email,
            login:req.body.login,
            password:req.body.password,
            country:req.body.country,

    }};
    UserModel.findByIdAndUpdate(
        req.params.id,
        {$set:user},
        {new:true},
        (err,docs)=>{
            if(!err) res.send(docs);
            else console.log('Update failed: '+err);
        }

    )
});
router.delete('/:id', (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)
UserModel.findByIdAndRemove(req.params.id,
    (err,docs)=>{
        if(!err) res.send(docs);
        else console.log('Delete failed '+err);

  })
});


module.exports = router;*/