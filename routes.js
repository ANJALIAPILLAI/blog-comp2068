const express = require('express');
const app= express();

//import our page routes
const pageRoutes = require('./routes/pages');
const blogRoutes = require('./routes/blogs');
const authorRoutes = require('./routes/authors');
const sessionsRoutes = require('./routes/sessions');

//register page routes
app.use('/', pageRoutes);
app.use('/blogs', blogRoutes);
app.use('/authors', authorRoutes);
app.use('/', sessionsRoutes);

//export the changes
module.exports= app;



