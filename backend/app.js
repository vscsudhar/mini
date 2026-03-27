const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');



dotenv.config({path:path.join(__dirname, 'config', 'config.env')});

app.use(express.json());

// optional (for form data)
app.use(express.urlencoded({ extended: true }));

const user = require('./routes/user');
const products = require('./routes/product');
const vehicles = require('./routes/vehicle');
const categories = require('./routes/category');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const dashboardRoutes = require('./routes/dashboard');




connectDatabase();
app.use('/api/v1', user)
app.use('/api/v1', categories)
app.use('/api/v1', products)
app.use('/api/v1', vehicles)
app.use('/api/v1', cartRoutes)
app.use('/api/v1', orderRoutes)
app.use('/api/v1', dashboardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server listening port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})