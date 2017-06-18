var mouseX,
    mouseY;

var $draggable = $('.draggable').draggabilly();
var draggie = $draggable.data('draggabilly');

var width = $(document).width();


var $drag = $(".drag");

var id;

(function () {

    var container, svg, cType, code, point = {}, line = {}, fill = false, drag = null, dPoint, maxX, maxY;

    // define initial points
    function Init() {

        var c = svg.getElementsByTagName("circle");
        for (var i = 0; i < c.length; i++) {
            point[c[i].getAttributeNS(null, "id")] = {
                x: parseInt(c[i].getAttributeNS(null, "cx"), 10),
                y: parseInt(c[i].getAttributeNS(null, "cy"), 10)
            };
        }

        // lines
        // line.l1 = svg.getElementById("l1");
        // line.l2 = svg.getElementById("l2");
        line.curve = svg.getElementById("curve");

        // code
        code = document.getElementById("code");

        // event handlers
        svg.onmousedown = svg.onmousemove = svg.onmouseup = Drag;
        svg.ontouchstart = svg.ontouchmove = svg.ontouchend = Drag;

        DrawSVG();
    }


    // draw curve
    function DrawSVG() {

        mouseX = event.pageX;
        mouseY = event.pageY;
        
        console.log(id);

        if (mouseX > width / 100 * 15 && id=="p1") {
            $("#p1").css({"r": "40"});

            $("#a1").css({"display": "block", "cx": point.p1.x+40, "cy": point.p1.y+40});

        } else if (mouseX < width / 100 * 15 && id=="p1") {
            $("#p1").css({"r": "16"});

            $("#a1").css({"display": "none"});
        }

        if (mouseX > width / 100 * 15 && id=="p2") {
            $("#p2").css({"r": "40"});

            $("#a2").css({"display": "block", "cx": point.p2.x+40, "cy": point.p2.y+40});

        } else if (mouseX < width / 100 * 15 && id=="p2") {
            $("#p2").css({"r": "16"});

            $("#a2").css({"display": "none"});
        }

        if (id=="a1") {
            $("#curve").css({"display": "block"});
        }

        // // control line 1
        // line.l1.setAttributeNS(null, "x1", point.p1.x);
        // line.l1.setAttributeNS(null, "y1", point.p1.y);
        // line.l1.setAttributeNS(null, "x2", point.c1.x);
        // line.l1.setAttributeNS(null, "y2", point.c1.y);
        //
        // // control line 2
        // var c2 = (point.c2 ? "c2" : "c1");
        // line.l2.setAttributeNS(null, "x1", point.p2.x);
        // line.l2.setAttributeNS(null, "y1", point.p2.y);
        // line.l2.setAttributeNS(null, "x2", point[c2].x);
        // line.l2.setAttributeNS(null, "y2", point[c2].y);

        // curve
        var d =
            "M" + point.p1.x + "," + point.p1.y + " " + cType +
            (point.p1.x + 150) + "," + point.p1.y + " " +
            (point.c2 ? (point.p2.x - 150) + "," + point.p2.y + " " : "") +
            point.p2.x + "," + point.p2.y +
            (fill ? " Z" : "");
        line.curve.setAttributeNS(null, "d", d);

        // show code
        if (code) {
            code.textContent = '<path d="' + d + '" />';
        }

    }

    // drag event handler
    function Drag(e) {

        e.stopPropagation();
        var t = e.target,
            et = e.type,
            m = MousePos(e);

        id = t.id;

        // // toggle fill class
        // if (!drag && et == "mousedown" && id == "curve") {
        //     fill = !fill;
        //     t.setAttributeNS(null, "class", (fill ? "fill" : ""));
        //     DrawSVG();
        // }

        // start drag
        if (!drag && typeof(point[id]) != "undefined" && (et == "mousedown" || et == "touchstart")) {
            drag = t;
            dPoint = m;

            if(!drag && typeof(point[0])) {
                console.log("1");
            }
        }

        // drag
        if (drag && (et == "mousemove" || et == "touchmove")) {
            id = drag.id;
            point[id].x += m.x - dPoint.x;
            point[id].y += m.y - dPoint.y;
            dPoint = m;
            drag.setAttributeNS(null, "cx", point[id].x);
            drag.setAttributeNS(null, "cy", point[id].y);
            DrawSVG();
        }

        // stop drag
        if (drag && (et == "mouseup" || et == "touchend")) {
            drag = null;
        }

    }

    // mouse position
    function MousePos(event) {
        return {
            x: Math.max(0, Math.min(maxX, event.pageX)),
            y: Math.max(0, Math.min(maxY, event.pageY))
        }
    }


    // start
    document.addEventListener('DOMContentLoaded', function () {
        container = document.getElementById("container");
        if (container) {
            cType = container.className;
            maxX = container.offsetWidth - 1;
            maxY = container.offsetHeight - 1;
            svg = document.getElementById("svg");
            Init();
        }
    });

})();