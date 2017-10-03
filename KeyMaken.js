//load modues
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');

//laat locatie bestand
var bestandLocatie = fs.readFileSync('./temp/installLocatie.txt');

//laat consoleColor
var consoleColor = require(bestandLocatie + '/ConsoleColor.js');

//dit maakt een key aan
exports.keyMaken = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 44; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

consoleColor.log("KeyMaken is geladen");