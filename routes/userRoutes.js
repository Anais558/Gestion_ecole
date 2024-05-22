const express = require('express');
const { createAdminUser } = require('../controllers/userController');
const router = express.Router();

router.post('/create-admin', createAdminUser);

module.exports = router;
