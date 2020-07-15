
var express = require('express');
var fileSystem = require('fs')
var app2 = new express()
app2.use(express.urlencoded({ extended: true }));// to understand req.body(urlencoded)
const port2 = 8000
var countries = fileSystem.readFileSync('country.json', 'utf-8')
countries = JSON.parse(countries)

app2.get('/country/:name', (req, res) => {      //----step 9 afficher le pays specific(je dois le faire avec filter)

    nomDepays = req.params.name;
    var paysDemande = new RegExp(nomDepays, "i");
    let result = countries.map(countries => {
        if (paysDemande.test(countries.name)) {

            return countries

        } else {
            return null
        }

    })
    if (result === null) {
        res.status(404).end('SORRRY');
    }
    else {
        for (let i = 0; i < result.length; i++) {
            if (result[i] != null) {
                result = result[i]
                res.json(result)
            }
        }

    }
})


app2.get('/regions/:regionName', (req, res) => {    //----step 10 Pays dans même region sur app2

    var nomDeRegion = req.params.regionName
    var myPattern = new RegExp(nomDeRegion, "i")
    let result = countries.filter((elem) => { // la fonction va return juste true/false et la methode filter qui va afficher les elements qui correspond de true
        if (myPattern.test(elem.region)) {
            return true
        } else {
            return false
        }
    })
    if (result) {
        res.json(result)
    } else {
        res.status(404).end("Not Found");
    }
});

app2.get('/subregion/:subregionName', (req, res) => {  //----step 11 Pays dans même subregion sur app2

    var nomDesubRegion = req.params.subregionName
    var myPattern = new RegExp(nomDesubRegion, "i")
    let result = countries.filter((elem) => { // la fonction va return juste true/false et la methode filter qui va afficher les elements qui correspond de true
        if (myPattern.test(elem.subregion)) {
            return true
        } else {
            return false
        }
    })
    if (result) {
        res.json(result)
    } else {
        res.status(404).end("Not Found");
    }
});
app2.get('/currencies/:currency', (req, res) => {  //----step 12 Pays ont même monaies sur app2

    var nameOfCurrency = req.params.currency
    var myPattern = new RegExp(nameOfCurrency, "i")
    let result = countries.filter((elem) => { // la fonction va return juste true/false et la methode filter qui va afficher les elements qui correspond de true
        if (myPattern.test(elem.currencies[0].name)) {
            return true
        } else {
            return false
        }
    })
    if (result) {
        res.json(result)
    } else {
        res.status(404).end("Not Found");
    }
});
//-- step 13 download Postman

app2.put('/countries/:countryName', (req, res) => { //--step 14 uptate a country with specific field 

    //Object.values(object) 


    var countryName = req.params.countryName
    var mycountry = new RegExp(countryName, "i")
    for (let g = 0; g < countries.length; g++) {
        if (mycountry.test(countries[g].name)) { // the country is found
            let keys = Object.keys(req.body) // create an array where all the preoreties which we want to change

            for (let i = 0; i < keys.length; i++) {

                countries[g][keys[i]] = req.body[keys[i]]//put the value correspond the same key

            }
            fileSystem.writeFileSync('./country.json', JSON.stringify(countries), 'utf8')
            return res.send("It's ok")
        }
    }
    res.send("SORRY it's impossible to change the data")

    /* var updateCoun = countries.filter((element) => {
         if (mycountry.test(element.name)) {
             return true
         } else {
             return false
         }
     });
     updateCoun[0].region = "Yomna"
     updateCoun[0].subregion ="BATCH"*/
    //console.log(JSON.stringify(updateCoun))
    // res.send(updateCoun)
})

app2.delete('/countries/:countryName', (req, res) => { //--step 15 Delete specific country by name 
    var countryAsked = req.params.countryName
    var countryDeleted = new RegExp(countryAsked, "i")
    for (let k = 0; k < countries.length; k++) {
        if (countryDeleted.test(countries[k].name)) {
            let x = countries.splice(k, 1)
            fileSystem.writeFileSync('./country.json', JSON.stringify(countries), 'utf-8')
            return res.send("It's deleted: \n" + JSON.stringify(x));
        }
    }
    res.status(404).end("It's not exist");
});

app2.post('/countries/:countryName', (req, res) => { // step 16 CREATE AND INSERT NEW OBJECT

    var countryName = req.params.countryName
    var newCountry = new RegExp(countryName, "i")
    for (let g = 0; g < countries.length; g++) {
        if (newCountry.test(countries[g].name)) { 
          return  res.send("SORRY it's aleardy exist")
        }
    }
    let preproties = Object.keys(req.body) // create an arrey withall the preoreties specified
    let newObjet = {} 

    for (let i = 0; i < preproties.length; i++) {
        newObjet[preproties[i]] = req.body[preproties[i]]
    }
    console.log(newObjet)
    countries.push(newObjet)          // step 17
    fileSystem.writeFileSync('./country.json', JSON.stringify(countries), 'utf8')
    return res.send("It's added")


})
app2.listen(port2);


