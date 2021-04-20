const router = require('express').Router();
const followingController = require('../Controllers/followingController');

router.get('/:id', followingController.followingList);


module.exports = router;