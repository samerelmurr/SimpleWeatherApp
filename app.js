const express = require('express'); //express package 
const https = require('https'); //https package
const bodyParser = require('body-parser'); //body-parser to recive input from html


const app = express(); //app
const port = 3000; //port number that runs the server

app.use(bodyParser.urlencoded({extended: true})); //line needed to run body-parser

app.get('/', (req, res) => { //.get to send html file

    res.sendFile(__dirname + "/index.html");

});

app.post('/', (req, res) => { //.post what to do after reciving info from .get

    const query = req.body.cityName; //getting the query for city name
    const appID = "f20ae8801a39a03949203bd38da9b506"; //app id

    //url from the api used to get info
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appID + "&units=metric";

    https.get(url, (response) => { //info displayed after getting info
        
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const tempData = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            
            res.write("<p> The weather today is " + weatherDescription + "</p>");
            res.write("<h1>The current temperature is: " + tempData + " Celcius</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    });
});

    

app.listen(port, () => {
    console.log("Server is up");
});










