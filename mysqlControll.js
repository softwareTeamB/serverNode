//load modules
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