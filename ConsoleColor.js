//load color module
var colors = require('colors');
 
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'white',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

function date(type){
    var date = new Date();
    
    //maand
    if (date.getMonth() < 10){
        var maand = ""+date.getMonth();
    } else {
        var maand = (date.getMonth())+11;
    }
    
    //dag
    if (date.getDate() < 10){
        var dag = "0"+date.getDate();
    } else {
        var dag = date.getDate();
    }
    
    //uur
    if (date.getHours()  < 10){
        var uur = "0"+date.getHours();
    } else {
        var uur = date.getHours();
    }
    
    //minut
    if (date.getMinutes()  < 10){
        var minut = "0"+date.getMinutes();
    } else {
        var minut = date.getMinutes();
    }
    
    //sec
    if (date.getSeconds()  < 10){
        var sec = "0"+date.getSeconds();
    } else {
        var sec = date.getSeconds();
    }


    //type errror
    if(type == 'error'){
        var str = "["+date.getFullYear() + "-" + maand + "-" + dag + " " +  uur + ":" + minut + ":" + sec+"] [ERROR] ";
        return str;  
    }

    //log
    if(type == 'log'){
        var str = "["+date.getFullYear() + "-" + maand + "-" + dag + " " +  uur + ":" + minut + ":" + sec+"] [INFO] ";
        return str;  
    }

    //warn
    if(type == 'warn'){
        var str = "["+date.getFullYear() + "-" + maand + "-" + dag + " " +  uur + ":" + minut + ":" + sec+"] [WARN] ";
        return str;  
    } 
}

//export modules
module.exports = {
    
    //error
    error: function(bericht){
        console.error(date('error').error + bericht);
    },  
    //log
    log: function(bericht){
        console.log(date('log').info + bericht);
    },
    
    warn: function(bericht){
        console.log(date('warn').warn + bericht);
    }
};