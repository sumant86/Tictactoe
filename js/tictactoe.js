/*global $:false */
var TickTacToe = TickTacToe || {};
TickTacToe.module = function(){
    var clicks = [];
    var symbol = {
        cross: "x",
        round: "o"
    };
    var solution = {
        results: [
            ["11", "12", "13"],
            ["21", "22", "23"],
            ["31", "32", "33"],
            ["11", "21", "31"],
            ["12", "22", "32"],
            ["13", "23", "33"],
            ["11", "22", "33"],
            ["31", "22", "13"]
        ]
    };
    var init = function () {
        getBoard();
        playerInfo();
        setAction();
        resize();
        window.onresize = function () {
            resize();
        };
    };
    var getBoard = function () {
        $("#ticTacToe")
                .html('')
                .append("<div id='board' class='container well'></div>");
        var rows = [];
        for (var i = 1; i <= 3; i++) {
            var boxes = [];
            for (var j = 1; j <= 3; j++) {
                boxes.push("<div class='sq col-xs-4 col-md-4 text-center text-muted' id='sq" + i + j + "'></div>");
            }
            rows.push(boxes.join(""));
        }
        $("#board")
                .append("<div class='row'><div class='col-xs-12 col-md-12 text-center text-primary h3'>Tic Tac Toe</div></div>")
                .append("<div class='row'>" + rows.join("</div><div class='row'>") + "</div>");
    };
    var playerInfo = function(){
        $("#board").append("<div class='row'><div class='col-xs-12 col-md-12 text-center text-info h4' id='player'>Player 1 Move ("+ symbol.round+")</div></div>");
    };
    var setPlayer = function(){
        if (clicks.length %2 !== 0) {
            $("#player").html("Player 2 Move ("+ symbol.cross+")");
        }
        else{
            $("#player").html("Player 1 Move ("+ symbol.round+")");
        }
        
    };
    var setAction = function () {
        $(".sq").click(function () {
            var clicked = this.id.split("");
            //console.log("Row", clicked[2], "Column", clicked[3]);
            if (clicks.indexOf(clicked[2] + clicked[3]) == -1) {
                clicks.push(clicked[2] + clicked[3]);
                if (clicks.length === 1){
                    $("#" + this.id).html(symbol.round);
                }
                else {
                    if (clicks.length % 2 !== 0) {
                        $("#" + this.id).html(symbol.round);
                        checkSoln(symbol.round);
                    }
                    else {
                        $("#" + this.id).html(symbol.cross);
                        checkSoln(symbol.cross);
                    }
                }
                setPlayer();
            }
            else{
             //   alert("Already Clicked");
            }
        });
    };
    var checkSoln = function (m) {
        if (clicks.length > 4) {
            var count;
            solution.results.forEach(function (sol) {
                count = 0;  
                sol.forEach(function (r) {
                    if ($("#sq" + r).html() == m)
                        count++;
                });
                if(count === 3)
                    done();
            });
            if(clicks.length === 9)
               draw();
        }
    };
    var resize= function () {
        $(".sq").height($("#sq11").width());
    };
    var done= function(){
        if (clicks.length %2 === 0) {
            alert("Player 2 Won");
        }
        else{
            alert("Player 1 Won");
        }
        clicks = [];
        init();
    };
    var draw = function(){
        alert("Game Draw!!! Try Again");
        clicks = [];
        init();
    };
    return {init:init,clicks:clicks,symbol:symbol,solution:solution};
}();
TickTacToe.module.init();
