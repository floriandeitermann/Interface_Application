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

var dPoint;


line.curve = svg.getElementById("curve");


$(function () {
    $(".draggable").draggable();

    //erstellt beim Draggen eine transparente Kopie
    $( ".draggable2" ).draggable({
        cursor: "move",
        cursorAt: { top: 10, left: 10 },
        helper: function( event ) {
            return $("<div class='helper'></div>");
        }
    });

});


$(document).mousemove(function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;


    // Speichert die gedraggten Elemente in point[i] ab
    $('.dragpoint').each(function(i) {

        if ($(this).parent().hasClass("ui-draggable-dragging")) {

            // Blendet die Dragpoints ein und aus
            if (mouseX > width / 100 * 12 && mouseX < width / 100 * 88) {
                $("#d"+i).css({"opacity": "1"});
            } else {
                $("#d"+i).css({"opacity": "0"});
            }
        }
        point[i] = $(this).offset();
    });





    $(".helper").mousemove(function() {

        $("#curve").css({"opacity": "1"});

        // console.log($(this).offset().left);

        $(".dragpoint").mouseover(function() {
            // console.log($(this).attr('id').slice(1,2));
            dPoint = $(this).attr('id').slice(1,2);
        });

        d =
            "M" + (point[dPoint].left + 10) + "," + (point[dPoint].top + 10) + " C" + (point[dPoint].left + 50) + "," + point[dPoint].top + " " +
            (mouseX - 50) + "," + (mouseY + 10) +' '+ (mouseX) + "," + (mouseY);
        line.curve.setAttributeNS(null, "d", d);

        $(".helper").mouseup(function() {
            $("#curve").css({"opacity": "0"});
        });

    });


    // d =
    //     "M" + Math.round(point[0].left + 10) + "," + (point[0].top + 10) + " C" + (point[0].left + 50) + "," + point[0].top + " " +
    //     (point[1].left - 50) + "," + (point[1].top + 50) +' '+ (point[1].left + 10) + "," + (point[1].top + 10);
    // line.curve.setAttributeNS(null, "d", d);

    //
    // $(".draggable").mousemove(function (event) {
    //     var offset = $(this).offset();
    //     // event.stopPropagation();
    //     console.log(this.id + " x:" + offset.left + " y:" + offset.top + " )");
    // });


    // Morph Elements when moving to Canvas
    if (mouseX > width / 100 * 12 && mouseX < width / 100 * 88) {
        $(".ui-draggable-dragging.element1").css({"width": "110", "height": "110"});
        $(".ui-draggable-dragging.element2").css({"width": "110", "height": "110"});
    } else {
        $(".ui-draggable-dragging.element1").css({"width": "40", "height": "40"});
        $(".ui-draggable-dragging.element2").css({"width": "40", "height": "40"});
    }

    // Disable draggable bei Dragpoints
    if ($('.dragpoint:hover').length != 0) {
        $('.element1').draggable("disable")
    } else {
        $('.element1').draggable("enable")
    }

});



