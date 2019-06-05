const express = require('express');
const app= express();

//import our page routes
const pageRoutes = require('./routes/pages');

//register page routes
app.use('/', pageRoutes);

//export the changes
module.exports= app;



