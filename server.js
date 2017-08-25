const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleWear

app.use(function (request, response, next) {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', function (error) {
        if (error) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use(function(request, response, next) {
//     response.render('maintenance');
// })

//--end middleWear

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
})

app.get('/', function (request, response) {
    response.render('home', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to the home page'
    })
});

app.get('/about', function (request, response) {
    response.render('about', {
        pageTitle: "About page",
    })
});

app.get('/bad', function (request, response) {
    response.send({ errorMessage: "Unable to handle request" });
})

app.get('/projects', function (request, response) {
    response.render('projects', {
        pageTitle: 'Projects page',
        welcomeMessage: 'Portfolio page here'
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server is up on port ${PORT}`);
});