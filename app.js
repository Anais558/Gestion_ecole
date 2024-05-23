const express = require('express');
const { initDb } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const classRoutes = require('./routes/classRoutes');
const eleveRoutes = require('./routes/eleveRoutes');
const parentRoutes = require('./routes/parentRoutes');
const inscriptionRoutes = require('./routes/inscriptionRoutes');
const presenceRoutes = require('./routes/presenceRoutes');
const personnelRoutes = require('./routes/personnelRoutes');
const matiereRoutes = require('./routes/matiereRoutes');
const professeurRoutes = require('./routes/professeurRoutes');
const noteRoutes = require('./routes/noteRoutes');
const fraisScolariteRoutes = require('./routes/fraisScolariteRoutes');



const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', classRoutes);
app.use('/api', eleveRoutes);
app.use('/api', parentRoutes);
app.use('/api', inscriptionRoutes); 
app.use('/api', presenceRoutes); 
app.use('/api', personnelRoutes); 
app.use('/api', matiereRoutes);
app.use('/api', noteRoutes);
app.use('/api', professeurRoutes);
app.use('/api', fraisScolariteRoutes);



const PORT = process.env.PORT || 3000;

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
