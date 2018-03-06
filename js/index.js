$(document).ready(function(){
  var players = 0,
      player1 = "",
      player2 = "",
      win = [[1,2,3],
             [4,5,6],
             [7,8,9],
             [1,4,7],
             [2,5,8],
             [3,6,9],
             [1,5,9],
             [3,5,7]],
      player1choice = [],
      player2choice = [],
      currentPlayer = 0,
      score1 = 0,
      score2 = 0;


  function reset(){
    players = 0;
    player1 = "";
    player2 = "";
    player1choice = [];
    player2choice = [];
    currentPlayer = 0,
    score1 = 0,
    score2 = 0;
  }
  
  function drawBoard() {
    $("#game").fadeIn();
    //Reason for using [0] http://stackoverflow.com/questions/11574038/why-canvas-doesnt-work-with-jquery-selector
    var canvas = $("#game")[0].getContext("2d");
    canvas.lineWidth = 1;
    canvas.strokeStyle = "#fff";
    //vertical lines
    canvas.beginPath();
    canvas.moveTo(100, 0);
    canvas.lineTo(100, 146.5);
    canvas.closePath();
    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(200, 0);
    canvas.lineTo(200, 146.5);
    canvas.closePath();
    canvas.stroke();

    // horizontal lines
    canvas.lineWidth = .5;

    canvas.beginPath();
    canvas.moveTo(4, 48.5);
    canvas.lineTo(296, 48.5);
    canvas.closePath();
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(4, 98.5);
    canvas.lineTo(296, 98.5);
    canvas.closePath();
    canvas.stroke();  
  }
  
  function checkDraw(){
    if (($("#box1").text() == "X" || $("#box1").text() == "O") && ($("#box2").text() == "X" || $("#box2").text() == "O") && ($("#box3").text() == "X" || $("#box3").text() == "O") && ($("#box4").text() == "X" || $("#box4").text() == "O") && ($("#box5").text() == "X" || $("#box5").text() == "O") && ($("#box6").text() == "X" || $("#box6").text() == "O") && ($("#box7").text() == "X" || $("#box7").text() == "O") && ($("#box8").text() == "X" || $("#box8").text() == "O") && ($("#box9").text() == "X" || $("#box9").text() == "O")){
      return true;
    }
    
    return false;
  }
  
  function checkWin(allChoices) {
    for (var x = 0; x < win.length; x++){
      var z = win[x].every(function(y){
        return allChoices.indexOf(y) !== -1;
      });
      if (z === true){
        return true;
      }
    }	
    return false;
  }

  function playWin(winner){
    $("#game").fadeOut();
    $("#boxes").fadeOut();
    $("#top").fadeOut();
    $(".turns").fadeOut();
    $("#results").fadeIn();
    $("#draw").fadeIn();
  }
  
  function playWin(winner){
    $("#game").fadeOut();
    $("#boxes").fadeOut();
    $("#top").fadeOut();
    $(".turns").fadeOut();
    if (winner == "player1"){
      $("#results").fadeIn();
      $("#win").fadeIn();
    } else if (winner == "player2"){
      $("#results").fadeIn();
      $("#lose").fadeIn();
    } else if (winner == "draw"){
      $("#results").fadeIn();
      $("#draw").fadeIn();
    }
  }
   
  function computerPlay(){
    $("#console").append("computerPlay");
    $("#turn2").fadeIn();
    var choice = Math.floor(Math.random()*9)+1;
    while (player2choice.indexOf(choice) !== -1 || player1choice.indexOf(choice) !== -1){
      choice = Math.floor(Math.random()*9)+1;
    }
    
    var choiceBox = "#box" + choice.toString();
    $(choiceBox).html(player2);    
    player2choice.push(choice);
    $("#turn2").fadeOut();
    if (checkWin(player2choice)){
      $("#console").append("p2win");
      score2++;
      $("#s2").html(score2);
      resetAll();
      if (score2 == 3 || (score2 == 2 && score1 == 1)){
        playWin("player2");
      } else {
        currentPlayer = 1;
        youPlay();
      }
    } else if (checkDraw()){
      resetAll();
      currentPlayer = 1;
      youPlay();
    } else {
      currentPlayer = 1;
      youPlay();
    }
  }
  
  function youPlay(){
    currentPlayer == 1 ? $("#turn").fadeIn() : $("#turn2").fadeIn();  
    $(".box").click(function(){
      if ($(this).text() == "X" || $(this).text() == "O"){
        return;
      }
      if (currentPlayer == 1){
        $(this).html(player1);
        $("#turn").fadeOut()
        player1choice.push(parseInt($(this).attr("value")));
        if (checkWin(player1choice)){
          score1++;
          $("#s1").html(score1);
          resetAll();
          if (score1 == 3 || (score1 == 2 && score2 == 1)){
            playWin("player1");
          } else if (score1 == 2 && score2 == 2){
            playDraw();
          } else {
            players == 1 ? computerPlay() : (currentPlayer = 2, youPlay());
          }
        } else if (checkDraw()){
          resetAll();
          if (players == 1) {
            $("#turn").fadeOut();
            computerPlay();
          } else {
            currentPlayer = 2;
            youPlay();
          }
        } else if (players == 1) {
          $("#turn").fadeOut();
          computerPlay();
        } else {
          currentPlayer = 2;
          youPlay();
        }
      } else if (currentPlayer == 2) {
        $(this).html(player2);
        player2choice.push(parseInt($(this).attr("value")));
        $("#turn2").fadeOut()
        if (checkWin(player2choice)){
          score2++;
          $("#s2").html(score2);
          resetAll();
          if (score1 == 3 || (score1 == 2 && score2 == 1)){
            playWin("player1");
          } else if (score1 == 2 && score2 == 2){
            playDraw();
          } else {
            currentPlayer = 1;
            youPlay();
          }
        } else {
          currentPlayer = 1;
          youPlay();
        }
      }
    });    
  }
  
  function playGame(){
    if (players == 1){
      $("#turn").html("Your Turn!"); 
      $("#turn2").html("Computer's Turn!");
      $("#win").html("You Win!"); 
      $("#lose").html("Computer Wins!");
      $("#draw").html("It's a draw!");
    } else if (players == 2){
      $("#turn").html("Player 1's Turn!");
      $("#turn2").html("Player 2's Turn!");
      $("#win").html("Player 1 Wins!"); 
      $("#lose").html("Player 2 Wins!");
      $("#draw").html("It's a draw!");
    }
    
    var firstPlayer = Math.floor(Math.random()*2)+1;
    if (firstPlayer == 1){
      currentPlayer = 1;
      youPlay();
    } else if (firstPlayer == 2) {
      players == 1 ? computerPlay() : (currentPlayer = 2, youPlay());
    }
    
  }
  
  $(".players").click(function(){
    players = $(this).text() == "One Player" ? 1 : 2;
    $("#starting").fadeOut();
    $("#starting2").fadeIn();
  });
  
  $("#back").click(function(){
    $("#starting2").fadeOut();
    $("#starting").fadeIn();
    reset();
  });
  
  $(".XO").click(function(){
    player1 = $(this).text(); 
    player2 = player1 == "O" ? "X" : "O";
    $("#starting2").fadeOut();
    $("#top").fadeIn();
    $("#boxes").fadeIn();
    drawBoard();
    playGame();
  });
  
  function resetAll(){
    player1choice = [],
    player2choice = [];
    for (var x = 1; x < 10; x++){
      var boxID = "#box" + x.toString();
      $(boxID).html("");
    }    
  }
  
  $("#reset").click(function(){
    resetAll();
  });

  
});