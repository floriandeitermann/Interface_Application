
// VARIABLEN    --------------------------------------------------------------------------------

var width = $(document).width();
var height = $(document).height();


var mouseX,
    mouseY,
    line = {};
    point = [];

// Curve Draw
var d;

var savedCurveP1, savedCurveP2;

var dPoint;

var downPoint, upPoint;


var settingToggle = true;


line.curve = svg.getElementById("curve");

// --------------------------------------------------------------------------------------------



// Adjust SVG Canvas when document is ready
$( document ).ready(function() {
    width = $(document).width();
    height = $(document).height();

    $('svg').removeAttr('viewBox');
    $('svg').removeAttr('width');
    $('svg').removeAttr('height');
    $('svg').each(function () { $(this)[0].setAttribute('viewBox', '0 0' + ' ' + width + ' ' + height) });
    $('svg').each(function () { $(this)[0].setAttribute('width', width) });
    $('svg').each(function () { $(this)[0].setAttribute('height', height) });

    toggle();
});

// Resize SVG Canvas when resizing window
$(window).resize(function() {
    width = $(document).width();
    height = $(document).height();

    $('svg').removeAttr('viewBox');
    $('svg').removeAttr('width');
    $('svg').removeAttr('height');
    $('svg').each(function () { $(this)[0].setAttribute('viewBox', '0 0' + ' ' + width + ' ' + height) });
    $('svg').each(function () { $(this)[0].setAttribute('width', width) });
    $('svg').each(function () { $(this)[0].setAttribute('height', height) });
});






// init Drag & Drop
$(function () {
    $(".draggable").draggable({ grid: [ 1, 1 ] });

    $( "#speed" ).selectmenu();

    //erstellt beim Draggen eine transparente Kopie
    $(".draggable2").draggable({
        cursor: "move",
        cursorAt: { top: 10, left: 10 },
        helper: function( event ) {
            return $("<div class='helper'></div>");
        }
    });

});


$(".dragpoint").mousedown(function() {
    downPoint = $(this).attr('id').slice(1,2);
    console.log("down_" + downPoint);
});

$(".dragpoint").mouseup(function() {
    upPoint = $(this).attr('id').slice(1,2);
    console.log("up_" + upPoint);

    if (upPoint != downPoint) {

        savedCurveP1 = $("#d" + downPoint);
        savedCurveP2 = $("#d" + upPoint);

        console.log(savedCurveP1.offset().top);
    }
});



// curveDraw(savedCurveP1[0].offset().left, savedCurveP1[0].offset().top, savedCurveP2[0].offset().left, savedCurveP2[0].offset().top);

$(document).mousemove(function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
    if(savedCurveP1 != undefined){
        curveDraw(savedCurveP1.offset().left, savedCurveP1.offset().top, savedCurveP2.offset().left, savedCurveP2.offset().top);
    }
    // Speichert die gedraggten Elemente in point[i] ab
    $('.dragpoint').each(function(i) {

        if ($(this).parent().hasClass("ui-draggable-dragging")) {

            // // Blendet die Dragpoints ein und aus
            // if (mouseX > width / 100 * 12 && mouseX < width / 100 * 88) {
            //     $("#d"+i).css({"opacity": "1"});
            // } else {
            //     $("#d"+i).css({"opacity": "0"});
            // }
        }
        point[i] = $(this).offset();
    });



    $(".helper").mousemove(function() {

        $("#curve").css({"opacity": "1"});
        savedCurveP1 = undefined;
        savedCurveP2 = undefined;
        // console.log($(this).offset().left);

        $(".dragpoint").mouseover(function() {
            // console.log($(this).attr('id').slice(1,2));
            dPoint = $(this).attr('id').slice(1,2);
        });


        curveDraw(point[dPoint].left, point[dPoint].top, mouseX, mouseY);

        // d =
        //     "M" + (point[dPoint].left + 5) + "," + (point[dPoint].top + 5) + " C" +
        //     (point[dPoint].left - 100) + "," + (point[dPoint].top - 10) + " " +
        //     (mouseX + 100) + "," + (mouseY + 10) +' '+ (mouseX) + "," + (mouseY);
        // line.curve.setAttributeNS(null, "d", d);

        $(".helper").mouseup(function() {
            $("#curve").css({"opacity": "0"});
        });


    });






    //
    // $(".draggable").mousemove(function (event) {
    //     var offset = $(this).offset();
    //     // event.stopPropagation();
    //     console.log(this.id + " x:" + offset.left + " y:" + offset.top + " )");
    // });


    // Morph Elements when moving to Canvas
    if (mouseY > 100) {
        $(".ui-draggable-dragging > .dragpoint_blocks").css({"display": "block"});
        $(".ui-draggable-dragging > .block").css({"width": "159", "height": "40", "border-radius": "3px"});
        $(".ui-draggable-dragging > .block  > .block_name").css({"top": "50%", "left": "16px", "transform": "translate(0%, -50%)"});
        $(".ui-draggable-dragging > .block  > .block_toggle").css({"display": "block"});

    } else {
        $(".ui-draggable-dragging > .dragpoint_blocks").css({"display": "none"});
        $(".ui-draggable-dragging > .block").css({"width": "74", "height": "26", "border-radius": "3px"});
        $(".ui-draggable-dragging > .block  > .block_name").css({"top": "50%", "left": "50%", "transform": "translate(-50%, -50%)"});
        $(".ui-draggable-dragging > .block  > .block_toggle").css({"display": "none"});



        $(".ui-draggable-dragging.block_element > .states").css({"display": "none"});
        $(".ui-draggable-dragging > .block > .block_dropdown").css({"display": "none"});
        $(".ui-draggable-dragging > .block > .block_speech_setting").css({"display": "none"});
    }

    if (mouseX > width / 100 * 12 && mouseX < width / 100 * 88) {
        $(".ui-draggable-dragging > .block_list").css({"width": "159", "height": "159"});
        $(".ui-draggable-dragging > .list_block").css({"background-color": "rgba(60, 60, 60, 1.0 )"});
        $(".ui-draggable-dragging > .block_list  > .block_name_list").css({"top": "16px", "left": "16px", "transform": "translate(0%, -00%)", "opacity": "1" });
        $(".ui-draggable-dragging > .block_list  > .block_toggle").css({"display": "block"});
        $(".ui-draggable-dragging > .block_list  > .list_dropdown").css({"display": "block"});
        $(".ui-draggable-dragging > .block_list  > .list_speech_setting").css({"display": "block"});
        $(".ui-draggable-dragging > .list_elements").css({"display": "block"});
        $(".ui-draggable-dragging > .block_list > .list_active_passive").css({"display": "block"});


    } else {
        $(".ui-draggable-dragging > .block_list").css({"width": "74", "height": "26"});
        $(".ui-draggable-dragging > .list_block").css({"background-color": "rgba(20, 20, 20, 0.0 )"});
        $(".ui-draggable-dragging > .block_list  > .block_name_list").css({"top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "opacity": "0" });
        $(".ui-draggable-dragging > .block_list  > .block_toggle").css({"display": "none"});
        $(".ui-draggable-dragging > .block_list  > .list_dropdown").css({"display": "none"});
        $(".ui-draggable-dragging > .block_list  > .list_speech_setting").css({"display": "none"});
        $(".ui-draggable-dragging > .list_elements").css({"display": "none"});
        $(".ui-draggable-dragging > .block_list > .list_active_passive").css({"display": "none"});

    }

    // Disable draggable bei Dragpoints
    if ($('.dragpoint:hover').length != 0) {
        $('.element1').draggable("disable")
    } else {
        $('.element1').draggable("enable")
    }

});


$(".block_toggle").click(function() {
    toggleSettings();
});


// Functions ------------------------------------------------------------

function curveDraw (p1X,p1Y,p2X,p2Y) {

    d =
        "M" + (p1X + 5) + "," + (p1Y + 5) + " C" +
        (p1X - 100) + "," + (p1Y - 10) + " " +
        (p2X + 100) + "," + (p2Y + 10) +' '+ (p2X) + "," + (p2Y);

    line.curve.setAttributeNS(null, "d", d);
}

function toggleSettings () {
    if (settingToggle == true) {

        $(".gesture_block").css({"width": "159", "height": "159"});
        $(".gesture_block > .block_name").css({"top": "16px", "left": "16px", "transform": "translate(0%, 0%)"});
        $(".gesture_block > .block_toggle").css({"top": "16px", "right": "16px", "transform": "translate(0%, 0%)"});

        $(".states").css({"display": "block"});
        $(".block_dropdown").css({"display": "block"});
        $(".block_speech_setting").css({"display": "block"});

        settingToggle = false;

    } else {

        $(".gesture_block").css({"width": "159", "height": "40"});
        $(".gesture_block > .block_name").css({"top": "50%", "left": "16px", "transform": "translate(0%, -50%)"});
        $(".gesture_block > .block_toggle").css({"top": "50%", "right": "16px", "transform": "translate(0%, -50%)"});

        $(".states").css({"display": "none"});
        $(".block_dropdown").css({"display": "none"});
        $(".block_speech_setting").css({"display": "none"});

        settingToggle = true;
    }
}



// Electron --------------------------------------------------------------


const {remote, ipcRenderer} = require('electron');





function toggle(){

    $("#run_rotate").click(function(){

        ipcRenderer.send('toggleSmall');

    })

    $("#run_gesture").click(function(){

        ipcRenderer.send('toggleGesture');

    })

}
















