const router = require('express').Router();
const ChannelController=require('../Controllers/ChannelController');
const multer=require('multer');
const upload=multer();

router.post('/create-channel',upload.single('file'),ChannelController.createChannel);
router.put('/:id', ChannelController.UpdateChannel);
router.patch('/follow/:id', ChannelController.follow);
router.patch('/unfollow/:id', ChannelController.unfollow);


module.exports=router;