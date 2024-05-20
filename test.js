const express = require('express');
const app = express();

const router = express.Router();
router.get('/test', (req, res) => {
    res.send('Test route working!');
});

app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
