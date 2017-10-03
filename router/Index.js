//load modues
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');

//laat locatie bestand
var bestandLocatie = fs.readFileSync('./temp/installLocatie.txt');

//laat config bestand
var config = JSON.parse(fs.readFileSync(bestandLocatie + '/config.json'));

//laat consoleColor
var consoleColor = require(bestandLocatie + '/ConsoleColor.js');

//laat het javascript bestand met een key aanmaakt
var maakKey = require(bestandLocatie + '/KeyMaken.js');

//Router
var Router = express.Router();

//zend exchangeLijst versie
Router.get('/versieCheck', function(req, res){

	//kijk of het bestand bestaat
	fs.exists('./temp/versieCheck.txt',function(exists){
    	if(!exists){

    		//er is geen versieCheck.txt om de db versie te syncen
    		consoleColor.warn("VersieCheck.txt bestaat niet. Het bestand word aangemaakt");

	    	//vraag een nieuwe key op
	    	var key = maakKey.keyMaken();

	    	//sla het bestand op
	    	fs.writeFile(bestandLocatie + '/temp/versieCheck.txt', key, function(err){
	    		if(err){

	    			//terminal bericht
	    			consoleColor.error("Er is een probleem om versieCheck.txt op te slaan");

	    			//redirect
					res.redirect('/error/versieCheck');
	    		} else {

	    			//terminal bericht
	    			consoleColor.log("VersieCheck.txt is aangemaakt");

	    			//send de data terug
	    			res.send(key);
	    		}
	    	});

	    } else {
	    	//terminal bericht
	    	consoleColor.log("VersieCheck.txt is gevonden");

	    	//lees de inhoud van het bestand
	    	var fileData = fs.readFileSync(bestandLocatie + '/temp/versieCheck.txt');

	    	//send de data terug
	    	res.send(fileData);
	    }
	});
});

//error pagina
Router.get('/error/:errorRouter', function(req, res){

	//vraag parmeters
	var errorBericht = req.params.errorRouter;

	//consoleTerminal
	consoleColor.error("Er is een error in het systeem. Error is opgetreden bij router : "+errorBericht);

	//sluit de verbinding
	res.send("Er is een error in het systeem");
});

//maak alle routers toegankelijk
module.exports = Router;

//terminal bericht
consoleColor.log("Alle routers in index.js zijn geladen");