const router = require('express').Router();
const VideoController = require('../Controllers/VideoController');
const multer=require('multer');
const upload=multer();
router.get('/', VideoController.listVideo);
//router.get('/:id', VideoController.VideoInfo);
router.get('/:id',VideoController.ChannelVideoList);
router.post('/',upload.single('file'), VideoController.createVideo);
router.put('/:id', VideoController.UpdateVideo);
router.delete('/:id', VideoController.DeleteVideo);
router.patch('/like-video/:id', VideoController.likeVideo);
router.patch('/unlike-video/:id', VideoController.unlikeVideo);
router.patch('/dislike-video/:id',VideoController.dislikeVideo);
router.patch('/note-video/:id',VideoController.noteVideo);
router.patch('/comment-video/:id', VideoController.commentVideo);
router.patch('delete-comment-video/:id', VideoController.DeleteComment);


module.exports = router;