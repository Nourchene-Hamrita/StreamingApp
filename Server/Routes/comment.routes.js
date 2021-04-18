const router = require('express').Router();
const CommentController = require('../Controllers/CommentController');

router.get('/:id', CommentController.CommentVideo);


module.exports = router;