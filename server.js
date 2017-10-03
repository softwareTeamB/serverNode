//load modules
var express = require("express");
var fs = require("fs");

//var app
var app = express();

//laat config bestand
var config = JSON.parse(fs.readFileSync("config.json"));

//laat consoleColor
var consoleColor = require('./ConsoleColor.js');

//kijk of temp bestanden bestaat
fs.exists('./temp/installLocatie.txt',function(exists){
    if(!exists){

    	//laat de installer
    	var Installer = require('./Installer.js');

    	//terminal bericht
    	consoleColor.warn("InstallLocatie.txt is niet gevonden");

    	//roep file maker methoden aan
        Installer.folderCheck();
    } else {

        //terminal bericht
    	consoleColor.log("InstallLocatie.txt is gevonden");
    }
});

//laat index.js router
var getRouter = require('./router/Index.js');
var getApiRouter = require('./router/api/apiIndex.js');

//app.use
app.use('/', getRouter);
app.use('/api', getApiRouter);

//vraag poort nummer op
var poortNummer = config.poortNummer;

//start server
app.listen(poortNummer, function(){
	consoleColor.log("Server is aan");
});