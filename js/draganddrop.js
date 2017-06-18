/**
 * Created by Max on 12.06.17.
 */


var width = $(document).width();

var mouseX,
    mouseY,
    line = {};
    point = [];

// Curve
var d;

var fill = "#fff";

line.curve = svg.getElementById("curve");



$(function () {
    $(".draggable").draggable();
});


$(document).mousemove(function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;


    // Speichert die gedraggten Elemente in point[i] ab
    $('.dragpoint').each(function(i) {

        if ($(this).parent().hasClass("ui-draggable-dragging")) {
            console.log($(this).offset());

            // Blendet die Dragpoints ein und aus
            if (mouseX > width / 100 * 12 && mouseX < width / 100 * 88) {
                $("#d"+i).css({"opacity": "1"});
            } else {
                $("#d"+i).css({"opacity": "0"});
            }
        }
        point[i] = $(this).offset();
    });


    d =
        "M" + Math.round(point[0].left + 10) + "," + (point[0].top + 10) + " C" + (point[0].left + 50) + "," + point[0].top + " " +
        (point[1].left - 50) + "," + (point[1].top + 50) +' '+ (point[1].left + 10) + "," + (point[1].top + 10);
    line.curve.setAttributeNS(null, "d", d);

    //
    // $(".draggable").mousemove(function (event) {
    //     var offset = $(this).offset();
    //     // event.stopPropagation();
    //     console.log(this.id + " x:" + offset.left + " y:" + offset.top + " )");
    // });


    if (mouseX > width / 100 * 12) {
        $(".element1.ui-draggable-dragging").css({"width": "100", "height": "100"});
        $("#curve").css({"display": "none"});
    }
    if (mouseX < width / 100 * 12) {
        $(".element1.ui-draggable-dragging").css({"width": "40", "height": "40"});
        $("#curve").css({"display": "none"});
    }




});



