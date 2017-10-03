//load modules
var express = require('express');
var fs = require('fs');
var mysql = require('mysql');

//router
var Router = express.Router();

//laat installLocatie
var bestandLocatie = fs.readFileSync('./temp/installLocatie.txt');

//laat config
var config = JSON.parse(fs.readFileSync(bestandLocatie + '/config.json'));

//tetminal color
var consoleColor = require(bestandLocatie + '/ConsoleColor.js');

//mysql verbinding
var connection = mysql.createConnection({
    host     : config.mysql.localhost,
    user     : config.mysql.username,
    password : config.mysql.password,
    database : config.mysql.dbName
});

//mysql verbinding maken
connection.connect(function(err) {
    if (err) {
        //terminal bericht
        consoleColor.error("Er is een error bij mysql. Error is "+ err.stack);
        return;
    }

    //terminal bericht
    consoleColor.log("Mysql heeft verbinding gemaakt. Connenctie threadId = " + connection.threadId);
});

Router.get('/getMarktNaam', function(req, res){

    //vraag marktnaam op lijst op
    connection.query("SELECT * FROM marktnaamv1;", function (error, results, fields) {
        if (error) {

            //error bericht
            consoleColor.error("Er is een error bij apiIndex. Error is " + error);

            //stuur false terug omdat er een error is
            res.send("false");
        } else {

            //terminal bericht
            consoleColor.log("De router getMarktNaam is opgevraagd.");

            //stuur antwoord terug
            res.send(results);
        }
    });

});

//alle market
Router.get('/getMarktLijst', function(req, res){

    //vraag marktnaam op lijst op
    connection.query("SELECT * FROM marktlijstvolv1;", function (error, results, fields) {
        if (error) {

            //error bericht
            consoleColor.error("Er is een error bij apiIndex. Error is " + error);

            //stuur false terug omdat er een error is
            res.send("false");
        } else {

            //terminal bericht
            consoleColor.log("De router getMarktLijst is opgevraagd.");

            //stuur antwoord terug
            res.send(results);
        }
    });


});

//exchange naam
Router.get('/getExchange', function(req, res){

    //vraag exchange lijst op
    connection.query('SELECT * FROM handelsplaatsv1', function (error, results, fields) {
        if (error) {

            //error bericht
            consoleColor.error("Er is een error bij apiIndex. Error is " + error);

            //stuur false terug omdat er een error is
            res.send("false");
        } else {

            //terminal bericht
            consoleColor.log("De router getExchange is opgevraagd.");

            //stuur antwoord terug
            res.send(results);
        }
    });
});

//deze router zorgt er voor dat alle markt data opgevraagd kan worden
Router.get('/marktDataUpdate', function(req, res){

    //vraag exchange lijst op
    connection.query('SELECT * FROM marktupdate', function (error, results, fields) {
        if (error) {

            //error bericht
            consoleColor.error("Er is een error bij apiIndex. Error is " + error);

            //stuur false terug omdat er een error is
            res.send("false");
        } else {

            //terminal bericht
            consoleColor.log("De router marktDataUpdate is opgevraagd.");

            //stuur antwoord terug
            res.send(results);
        }
    });

})

//module exports
module.exports = Router;

//terminal bericht
consoleColor.log('Alle api routers geladen');