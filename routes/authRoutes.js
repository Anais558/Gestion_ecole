const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example protected route
router.get('/protected', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: 'This is a protected route accessible only by admin' });
});

module.exports = router; // Ensure the router is exported correctly
