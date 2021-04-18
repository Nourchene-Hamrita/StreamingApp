const router = require('express').Router();
const SavedController = require('../Controllers/SavedController');

router.get('/savedvideos/:id',SavedController.SavedList);
router.post('/', SavedController.AddToSave);


module.exports = router;