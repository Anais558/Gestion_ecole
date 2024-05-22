const express = require('express');
const { initDb } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const classRoutes = require('./routes/classRoutes');
const eleveRoutes = require('./routes/eleveRoutes');
const parentRoutes = require('./routes/parentRoutes');
const inscriptionRoutes = require('./routes/inscriptionRoutes'); // New route for inscriptions
const presenceRoutes = require('./routes/presenceRoutes'); // New route for presences




const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', classRoutes);
app.use('/api', eleveRoutes);
app.use('/api', parentRoutes);
app.use('/api', inscriptionRoutes); // Use the new route
app.use('/api', presenceRoutes); // Use the new route







const PORT = process.env.PORT || 3000;

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
