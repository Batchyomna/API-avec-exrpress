var express = require('express');
var app1 = new express()
var fileSystem = require('fs')
const port1 = 8080

app1.get('/names/all', (req, res) => {              //----step 5 NAME avec loop FOR sur app1
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
    let listeDeName = []
    for (let i = 0; i < countries.length; i++) {
        listeDeName[i] = countries[i].name;
    }

    res.json(listeDeName)
})
app1.get('/names/all', (req, res) => {             //----step 6 NAME avec loop MAP sur app1
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
    let listeDeName = countries.map(countries => {
        return countries.name;
    })

    res.send(listeDeName)
});
app.get('/capitals/all', (req, res) => {           //----step 7 CAPITAL avec FOR sur le app
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
    let listeDeCapital = []
    for (let i = 0; i < countries.length; i++) {
        listeDeCapital[i] = countries[i].capital;
    }

    res.json(listeDeCapital)
})
app1.get('/capitals/all', (req, res) => {           //----step 8 CAPITAL avec MAP sur le app1
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
    let listeDeCapitals = countries.map(countries => {
        return countries.capital;
    })

    res.send(listeDeCapitals)
});
app1.listen(port1);