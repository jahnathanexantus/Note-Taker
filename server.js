const express = require('express');
const apiRoute = require('./routes/apiRoutes');
const htmlRoute = require('./routes/htmlRoutes');
// initialize the app and create port
const app = express();
const PORT = process.env.PORT || 3001;

// todo:set up some body parsing,static,and route the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



app.use("/api",apiRoute);
app.use('/',htmlRoute);


// start the server on thea port
app.listen(PORT, ()=> console.log(`this port is listening at ${PORT}`));