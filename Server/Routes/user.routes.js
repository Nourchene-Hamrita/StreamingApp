const router = require('express').Router();
const authController = require('../Controllers/authController');
const UserController = require('../Controllers/UserController');
const multer = require('multer');
const upload = multer();

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.userInfo);
router.put('/:id', UserController.UpdateUser);
router.post('/upload', upload.single('file'), UserController.uploadProfil);
router.delete('/:id', UserController.DeleteUser);

module.exports = router;