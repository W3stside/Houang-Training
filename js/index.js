  $(document).ready(function(){
    $(window).resize( function () {
      //get Internal Window Height
      var winHeight = $("html").height() - $("header").height() - $("footer").height();
      //var fullWinWidth = $("html").width();
      var calculatedHeaderFontSize = function (ratio) {return winHeight / ratio;}
      var anmDur = 400;
        //extend div to bottom
      $(".currentAnimatingPage")
        .animate({height: winHeight} , anmDur)
        .animate({width: '100%'} , anmDur);  
    });
  });

    
