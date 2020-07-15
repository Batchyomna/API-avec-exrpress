
var express = require('express');
var app = new express()
var fileSystem = require('fs')
app.use(express.urlencoded({ extended: true }));// to understand req.body(urlencoded)
var countries = fileSystem.readFileSync('country.json', 'utf-8')
countries = JSON.parse(countries)
const port = 8000
var teachers = { thomas: "Thomas Jamais", alban: "Alban Meurice" }

app.get('/', (req, res) => {                     //-----------step 1
    res.send('Hello World!')
});
app.get('/teachersName', (req, res) => {            //------step 2 
    res.json(teachers)
})
                                         //--------step 3 create file .json

app.get('/all', (req, res) => {                       //------step 4 tous les pays sur app

    var mycountries = fileSystem.readFileSync('country.json', 'utf-8')
    res.json(mycountries)
})

app.get('/names/all', (req, res) => {              //----step 5 NAME avec loop FOR sur app1
    let listeDeName = []
    for (let i = 0; i < countries.length; i++) {
        listeDeName[i] = countries[i].name;
    }
    res.json(listeDeName)
})
app.get('/names/all', (req, res) => {             //----step 6 NAME avec loop MAP sur app1
    let listeDeName = countries.map(countries => {
        return countries.name;
    })
    res.send(listeDeName)
});
app.get('/capitals/all', (req, res) => {           //----step 7 CAPITAL avec FOR sur le app
    let listeDeCapital = []
    for (let i = 0; i < countries.length; i++) {
        listeDeCapital[i] = countries[i].capital;
    }
    res.json(listeDeCapital)
})
app.get('/capitals/all', (req, res) => {           //----step 8 CAPITAL avec MAP sur le app1
        let listeDeCapitals = countries.map(countries => {
        return countries.capital;
    })
    res.send(listeDeCapitals)
});
app.get('/country/:name', (req, res) => {      //----step 9 afficher le pays specific(je dois le faire avec filter)
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
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

app.get('/regions/:regionName', (req, res) => {    //----step 10 Pays dans même region sur app2
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
    var nomDeRegion = req.params.regionName
    var myPattern = new RegExp(nomDeRegion, "i")
    let result = countries.filter((elem)=>{ // la fonction va return juste true/false et la methode filter qui va afficher les elements qui correspond de true
        if(myPattern.test(elem.region)){
            return true
        }else{
            return false
        }
    })
    if (result) {
        res.json(result)
    } else {
        res.status(404).end("Not Found");
    }
});

app.get('/subregion/:subregionName', (req, res) => {  //----step 11 Pays dans même subregion sur app2
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
    var nomDesubRegion = req.params.subregionName
    var myPattern = new RegExp(nomDesubRegion, "i")
    let result = countries.filter((elem)=>{ // la fonction va return juste true/false et la methode filter qui va afficher les elements qui correspond de true
        if(myPattern.test(elem.subregion)){
            return true
        }else{
            return false
        }
    })
    if (result) {
        res.json(result)
    } else {
        res.status(404).end("Not Found");
    }
});
app.get('/currencies/:currency', (req, res) => {  //----step 12 Pays ont même monaies sur app2
    var countries = fileSystem.readFileSync('country.json', 'utf-8')
    countries = JSON.parse(countries)
    var nameOfCurrency = req.params.currency
    var myPattern = new RegExp(nameOfCurrency, "i")
    let result = countries.filter((elem)=>{ // la fonction va return juste true/false et la methode filter qui va afficher les elements qui correspond de true
        if(myPattern.test(elem.currencies[0].name)){
            return true
        }else{
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

app.put('/countries/:countryName', (req, res) => { //--step 14 uptate a country with specific field 

    // there i s also Object.values(object) 
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

app.delete('/countries/:countryName', (req, res) => { //--step 15 Delete specific country by name 
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

app.post('/countries/:countryName', (req, res) => { //---step 16 CREATE AND INSERT NEW OBJECT

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
    countries.push(newObjet)          //-------step 17 put in order
    var mapped = countries.map(function(e,i){
      return {index:i, name:e.toLowerCase()}
    })
    mapped.sort(function(x,y){
        if (x.name>y.name){
            return 1;
        }
        if(x.name<y.name){
            return -1;
        }
        return 0;
    })
    var result = mapped.map(function(e){  //sort the arrey 
        return countries[e.index]

    })
    fileSystem.writeFileSync('./country.json', JSON.stringify(result), 'utf8')
    return res.send("It's added")


})

app.listen(port);




