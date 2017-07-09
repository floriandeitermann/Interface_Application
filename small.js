// Johnny-Fife uses stdin, which causes Electron to crash
// this reroutes stdin, so it can be used



var Readable = require("stream").Readable;
var util = require("util");
util.inherits(MyStream, Readable);
function MyStream(opt) {
  Readable.call(this, opt);
}
MyStream.prototype._read = function() {};
// hook in our stream
process.__defineGetter__("stdin", function() {
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});


// integrate libraries

var five = require("johnny-five");
var rotaryEncoder = require('./js/encoder');


// setup board

var board = new five.Board({
  repl: false // does not work with browser console
});

var counter = 0;

// functions

function encoder(){

  const pressButton = new five.Button(13);
  const downButton = new five.Button(12);
  const upButton = new five.Button(11);

  var i = 0;

    var rotate = 0;
    var down = 0;
    var press = true;


  rotaryEncoder({
    upButton,
    downButton,
    pressButton,
    onUp: () => {

          console.log('up');
    if (counter > 0) {
        counter--;
    }
    console.log(counter);
    set()

    },
    onDown: () => {
        console.log('down');
        if (counter < 3) {
            counter++;
        }
        console.log(counter);
        set()

    },
    onPress: () => {
      console.log('press');
    },

  });

}

function set() {
    if (counter == 0) {
        console.log("hallo");
        $('#one').addClass('active');
        $('#two').removeClass('active');
        $('#three').removeClass('active');
        $('#four').removeClass('active');
    }
    if (counter == 1) {
        $('#one').removeClass('active');
        $('#two').addClass('active');
        $('#three').removeClass('active');
        $('#four').removeClass('active');
    }
    if (counter == 2) {
        $('#one').removeClass('active');
        $('#two').removeClass('active');
        $('#three').addClass('active');
        $('#four').removeClass('active');
    }
    if (counter == 3) {
        $('#one').removeClass('active');
        $('#two').removeClass('active');
        $('#three').removeClass('active');
        $('#four').addClass('active');
    }
}





board.on("ready", function() {

  console.log('%cArduino ready', 'color: green;');

  //var led = new five.Led(13);

  // "blink" the led in 500ms
  // on-off phase periods
  //led.blink(500);

  encoder();
  //neoPixel();
  //encodePixel();

  //abstand1();

});







