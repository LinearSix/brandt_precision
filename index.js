const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2181;
const bodyParser = require('body-parser');

// set the folder for ejs files
app.set('views', path.join(__dirname, 'views'));

// Set the folder for public content
app.use(express.static(path.join(__dirname, 'public')))

// set the folder for npm packages
app.use(express.static(path.join(__dirname, 'node_modules')))

// Set the view engine to ejs
app.set('view engine', 'ejs')

// set express routes
const index = require('./routes');
const about = require('./routes/about');

// use express routes
app.use(index);
app.use(about);

// set redirect for users adding a /
app.get('/', function(req, res){ res.redirect('index')});

app.use((_req, res) => {
    res.sendStatus(404);
});
  
app.use((err, _req, res, _next) => {
if (err.status) {
    return res
    .status(err.status)
    .set('Content-Type', 'text/plain')
    .send(err.message);
}

console.error(err.stack);
res.sendStatus(500);
});
  
// start server
app.listen(PORT, function() {
console.log("listening on port: ", PORT);
});

module.exports = app;