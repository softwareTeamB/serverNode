//load modules
var fs = require('fs');

//consolecolor
var consoleColor = require('./ConsoleColor.js');

//kijken of folder bestaat
function folderCheck(){

	//dir wat na gekeken moet worden
	var dir = __dirname + '/temp/';

	//kijk of folder bestaat
	if (!fs.existsSync(dir)) {

		consoleColor.warn("Folder niet gevonden");
    	
    	//maak folder aan
		fs.mkdirSync(dir);

		//run mainInstaller
		mainInstaller();
	} else {

		//run mainInstaller
		mainInstaller();
	}

}

//kijk maakFolderBestandAan
function maakFolderBestandAan(){

	//schrijf bestand met de folder locatie
	fs.writeFile(__dirname + '/temp/installLocatie.txt', __dirname, function(err) {

		//als het een error is
		if(err) {
			//bericht in de terminal
			consoleColor.log("Er is een error bij het schrijven van het bestand");		
		} else {
			//bericht in de terminal
			consoleColor.log("Folder is aangemaakt");
		}
	});
}

//als de folder niet bestaat moet deze methoden gedraait worden
function mainInstaller(){

	//rope funties aan
	maakFolderBestandAan();
}


//module export
module.exports = {
	folderCheck: function(){
		folderCheck()
	}
}