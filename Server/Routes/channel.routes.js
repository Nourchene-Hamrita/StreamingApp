const router = require('express').Router();
const ChannelController=require('../Controllers/ChannelController');
const multer=require('multer');
const upload=multer();
router.get('/', ChannelController.getAllChannel);
router.get('/:id', ChannelController.ChannelInfo);
router.post('/create-channel',ChannelController.createChannel);
router.post('/upload',upload.single('file'),ChannelController.uploadChannel);
router.put('/:id', ChannelController.UpdateChannel);
router.patch('/follow/:id', ChannelController.follow);
router.patch('/unfollow/:id', ChannelController.unfollow);


module.exports=router;