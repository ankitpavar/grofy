const express = require('express');
const router = express.Router();
const { authUser,registerUser, getUserProfile } = require('../controllers/userControllers');
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile)

module.exports = router;
