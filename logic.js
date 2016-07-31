$( document ).ready(function() {

    var table = [ [], [], [] ];

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
    });
    //end choose part

    $('.box-game').click(function () {
      var id = this.id;
      if($('#'+id+'>h1').text()==''){
        placeElement(id,jucator);
        AiMove();
        console.log(checkDiagonally());

      }

    })

    function AiMove() {

    }
    function checkToBlock() {

    }
    function checkHorizontally() {
      for (var i = 0 ; i <3 ; i++){
        var count = 0;
        for (var j = 0 ; j <3;j++){
          if (table[i][j]==jucator ){
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
    function checkVertically() {
      for (var j = 0 ;j<3;j++){
        var count = 0;
        for (var i = 0 ; i <3;i++){
          if (table[i][j]==jucator ){
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
    function checkDiagonally() {
      //check diagonala principala
      var countPrincipal = 0;
      for (var i = 0;i <3 ;i++){
        if (table[i][i] ==jucator){
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
        if (table[i][j] == jucator){
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


});
