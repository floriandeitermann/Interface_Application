/**
 * Created by Max on 29.06.17.
 */

var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;


var output = document.getElementById('output');
var progress = document.getElementById('progress');
var background = document.getElementById("bg");


var controllerTest = Leap.loop(function (frame) {

    console.log(HandIn);

    if (HandIn && soundIn) {

        soundIn = false;
    }
    else if (!HandIn && !soundIn) {

        soundIn = true;
    }

    HandIn = false;

});


// Sobald die Hand über der Leap ist, wird die Funktion ausgeführtund wiederholt
Leap.loop({background: true}, {

    hand: function (hand) {
        console.log("handincheck" + HandIn)
        HandIn = true;


        //TAP
        if (hand.pinchStrength <= 0.90 && pressed) {

            $('.box').css("background-color", "#5299FF");

            pressed = false;
        }


        if (hand.pinchStrength > 0.90 && !pressed) {

            $('.box').css("background-color", "red");

            toggle();
            pressed = true;
        }

        function toggle() {

            if (light) {
                light = false;
            }
            else {
                light = true;
            }
        }

    }
});
