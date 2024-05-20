const express = require('express');
const { initDb } = require('./models');
const authRoutes = require('./routes/authRoutes'); // Correctly import the router

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes); // Use the router

const PORT = process.env.PORT || 3000;

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
