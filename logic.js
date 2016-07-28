$( document ).ready(function() {

    var table = [ [], [], [] ];
    

    var jucator;
    var ai;

    //on choose side
    $("#X , #O").click(function () {
      $(".game").css("display", "block");
      $('.choose').hide();
      jucator = this.id;
      if(jucator == 'X') {
        ai = 'O';

      }else{
        ai = 'X';
        AiMove();
      }
    });
    //end choose part

    $('.box-game').click(function () {
      var id = this.id;
      if($('#'+id+'>h1').text()==''){
        $('#'+id+'>h1').text(jucator);

        placeElement(id,jucator);

        AiMove();
      }

    })

    function AiMove() {

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
    }
});
