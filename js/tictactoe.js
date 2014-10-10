var app = {
    init: function () {
        app.getBoard();
        app.setAction();
        app.clicks = [];
        app.resize();
        window.onresize = function () {
            app.resize();
        };
    },
    symbol: {
        cross: "x",
        round: "o"
    },
    solution: {
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
    },
    getBoard: function () {
        $("#ticTacToe")
                .html('')
                .append("<div id='board' class='container well'></div>");
        var rows = [];
        for (i = 1; i <= 3; i++) {
            var boxes = [];
            for (j = 1; j <= 3; j++) {
                boxes.push("<div class='sq col-xs-4 col-md-4' id='sq" + i + j + "'></div>");
            }
            rows.push(boxes.join(""));
        }
        $("#board").append("<div class='row'>" + rows.join("</div><div class='row'>") + "</div>");
    },
    setAction: function () {
        $(".sq").click(function () {
            var clicked = this.id.split("");
            //console.log("Row", clicked[2], "Column", clicked[3]);
            if (app.clicks.indexOf(clicked[2] + clicked[3]) == -1) {
                app.clicks.push(clicked[2] + clicked[3]);
                if (app.clicks.length == 1)
                    $("#" + this.id).html(app.symbol.round);
                else {
                    if (app.clicks.length % 2 != 0) {
                        $("#" + this.id).html(app.symbol.round);
                        app.checkSoln(app.symbol.round);
                    }
                    else {
                        $("#" + this.id).html(app.symbol.cross);
                        app.checkSoln(app.symbol.cross);
                    }
                }
            }
            else
                alert("Already Clicked");
        });
    },
    checkSoln: function (m) {
        if (app.clicks.length > 4) {
            app.solution.results.forEach(function (sol) {
                count = 0;
                sol.forEach(function (r) {
                    if ($("#sq" + r).html() == m)
                        count++;
                });
                if(count == 3)
                    app.done();
            });
            if(app.clicks.length == 9)
                app.draw();
        }
    },
    resize: function () {
        $(".sq").height($("#sq11").width());
    },
    done: function(){
        alert("Won");
        app.init();
    },
    draw: function(){
        alert("Draw");
        app.init();
    }
};