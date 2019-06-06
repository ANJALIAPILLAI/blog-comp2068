const express = require('express');
const app= express();

//import our page routes
const pageRoutes = require('./routes/pages');
const blogRoutes = require('./routes/blogs');

//register page routes
app.use('/', pageRoutes);
app.use('/blogs', blogRoutes);

//export the changes
module.exports= app;



