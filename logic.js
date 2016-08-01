$( document ).ready(function() {

    var table = [ [], [], [] ];
    var tableConverter = [[1,2,3],
                          [4,5,6],
                          [7,8,9]];
    var state ;
    var jucator;
    var ai;

    var primaPos = '';


    //on choose side
    $("#X , #O").click(function () {
      $(".game").css("display", "block");
      $('.choose').hide();
      jucator = this.id;
      if(jucator == 'X') {
        ai = 'O';

      }else{
        ai = 'X';
        //AiMoveFirst
      }
      firstAiMove();
    });
    //end choose part

    $('.box-game').click(function () {
      var id = this.id;
      console.log(table);
      if($('#'+id+'>h1').text()==''){
        placeElement(id,jucator);
        AiMove();


      }

    })

    function AiMove() {
      var posToBlock = checkTwoBlocks(jucator);
      var posToWin = checkTwoBlocks(ai);

      if (posToWin !=undefined){
        console.log('1');
        var posId = tableConverter[posToWin[0]][posToWin[1]];
        posId = posId.toString();
        placeElement(posId,ai);
        alert('You Lost');
        backToZero();
      }else if (posToBlock !=undefined){
        console.log('2');
        var AiId = tableConverter[posToBlock[0]][posToBlock[1]];
        AiId = AiId.toString();
        placeElement(AiId,ai);

      }else if(table[1][1] == undefined) {
        console.log('3');
        placeElement('5',ai);
      }else if (returnCorner() != undefined){
        console.log('4');
        var corner = returnCorner();
        var cornerId = tableConverter[corner[0]][corner[1]];
        cornerId = cornerId.toString();
        placeElement(cornerId,ai);
      }else if (returnNonCorner() != undefined){
        console.log('5');
        var nonCorner = returnNonCorner();
        var nonCornerId = tableConverter[nonCorner[0]][nonCorner[1]];
        nonCornerId = nonCornerId.toString();
        placeElement(nonCornerId,ai);
      }
      if (checkIfTableFull()){
        alert('Tie');
        backToZero();
      }

    }
    function checkTwoBlocks(who) {
      var check1 = checkHorizontally(who);
      var check2 = checkVertically(who);
      var check3 = checkDiagonally(who);
      if (check1 !=undefined){
        return check1;
      }else if(check2 != undefined){
        return check2;
      }else {
        return check3;
      }
    }
    function checkHorizontally(who) {
      for (var i = 0 ; i <3 ; i++){
        var count = 0;
        for (var j = 0 ; j <3;j++){
          if (table[i][j]==who ){
            count++;
          }
        }

        if (count ==2){
          var pos = [i,undefined];
          for(var j=0;j<3;j++){
            if (table[i][j] ==undefined){
              pos[1] = j;

              return pos;
            }
          }
        }
      }
      return undefined;
    }
    function checkVertically(who) {
      for (var j = 0 ;j<3;j++){
        var count = 0;
        for (var i = 0 ; i <3;i++){
          if (table[i][j]==who ){
            count++;
          }
        }
        if (count ==2){
          var pos = [undefined,j];
          for(var i=0;i<3;i++){
            if (table[i][j] ==undefined){
              pos[0] = i;

              return pos;
            }
          }
        }
      }
      return undefined;
    }
    function checkDiagonally(who) {
      //check diagonala principala
      var countPrincipal = 0;
      for (var i = 0;i <3 ;i++){
        if (table[i][i] ==who){
          countPrincipal++;
        }
        if (countPrincipal ==2){
          for (var j = 0;j<3;j++){
            if (table[j][j] == undefined){
              var pos = [j,j];
              return pos;
            }
          }
        }
      }
      //end check diagonala principala

      //check diagonala secundara
      var countSecundar = 0;
      var j = 2;
      for (var i = 0 ; i <3;i++){
        if (table[i][j] == who){
          countSecundar++;
        }
        j--;
        if (countSecundar ==2) {
          j = 2;
          for (var i = 0;i<3;i++){
            if (table[i][j] == undefined){
              var pos = [i,j];
              return pos;
            }
            j--;
          }
        }
      }
      //end check diagonala ssecundara
      return undefined;
    }

    function returnCorner() {
      var corners = [ [0,0] , [0,2] , [2,0] , [2,2]];
      corners = corners.filter(function (corner) {
        if (table[corner[0]][corner[1]] == undefined){
          return true;
        }else {
          return false;
        }
      });
      var choosenCorner = corners.randomFromList();
      return choosenCorner;
    }
    function returnNonCorner() {
      var nonCorners = [ [0,1] , [1,0] , [1,1] , [1,2] , [2,1] ];
      nonCorners = nonCorners.filter(function (obj) {
        if (table[obj[0]][obj[1]] == undefined){
          return true;
        }else {
          return false;
        }
      });
      var choosenNonCorner = nonCorners.randomFromList();
      return choosenNonCorner;
    }

    function backToZero() {
      table = [ [], [], [] ];
      for (var i = 1 ; i <=9;i++){
        $('#'+i+'>h1').text('');
      }
      firstAiMove();
    }
    function firstAiMove() {
      var firstBlock = Math.floor(Math.random() * (10 - 1)) + 1;
      firstBlock = firstBlock.toString();

      placeElement(firstBlock,ai);
    }
    function placeElement(id,who) {
      switch (id) {
        case '1': table[0][0] = who; break;
        case '2': table[0][1] = who; break;
        case '3': table[0][2] = who; break;
        case '4': table[1][0] = who; break;
        case '5': table[1][1] = who; break;
        case '6': table[1][2] = who; break;
        case '7': table[2][0] = who; break;
        case '8': table[2][1] = who; break;
        case '9': table[2][2] = who; break;

      }
      $('#'+id+'>h1').text(who);
    }
    function checkIfTableFull() {
      for (var i = 0 ; i <3 ;i++){
        for (var j = 0; j <3 ;j++){
          if (table[i][j] == undefined){
            return false;
          }
        }
      }
      return true;
    }

});
// prototype def
Array.prototype.randomFromList = function(){
  return this[Math.floor(Math.random()*this.length)];
}
