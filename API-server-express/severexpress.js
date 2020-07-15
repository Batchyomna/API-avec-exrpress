
var fileSystem = require('fs')
const express = require('express');
var app = new express()
const port = 3000
var teachers = { "thomas": "Thomas Jamais", "alban": "Alban Meurice" }

app.get('/', (req, res) => {                     //-----------step 1
    res.send('Hello World!')
});
app.get('/teachersName', (req, res) => {            //------step 2 
    res.json(teachers)
})
app.get('/all', (req, res) => {                       //------step 4 tous les pays sur app

    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    // on peut dire: var countries = require('./country.json')
    res.json(countries)
})
app.listen(port);