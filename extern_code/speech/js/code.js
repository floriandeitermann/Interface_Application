/**
 * Created by Max on 29.05.17.
 */


if (annyang) {
    console.log("hallo");


    var hello = function() {

        console.log("geht");

        // $('.box').css("background-color", "yellow");


        $('.box').animate({
            transform: 'rotate(90deg)'
        });

        $('.box').animate({
            transform: 'rotate(0deg)'
        });
    };


    var red = function() {
        $('.box').css("background-color", "red");
    };

    var blue = function() {
        $('.box').css("background-color", "blue");
    };

    var green = function() {
        $('.box').css("background-color", "green");
    };

    var commands = {
        'rotate':    hello,
        'red':      red,
        'blue':     blue,
        'green':     green,
    };

    annyang.addCommands(commands);

    annyang.setLanguage('en');

    annyang.start({continuous: false });

    // annyang.start();
    
}
