$(document).ready(function () {
  for (i = 0; i < 1; i++) {
    setInterval(function () {
      setTimeout(function () {
        $(".g1").toggleClass("moveg1");
      }, 350);

      setTimeout(function () {
        $(".g3").toggleClass("moveg3");
      }, 700);

      setTimeout(function () {
        $(".g4").toggleClass("moveg4");
      }, 1050);

      setTimeout(function () {
        $(".g2").toggleClass("moveg2");
      }, 1400);

      setTimeout(function () {
        $(".g6").toggleClass("moveg6");
      }, 1750);

      setTimeout(function () {
        $(".g5").toggleClass("moveg5");
      }, 2100);

      setTimeout(function () {
        $(".g7").toggleClass("moveg7");
      }, 2450);

      setTimeout(function () {
        $(".g9").toggleClass("moveg9");
      }, 2800);

      setTimeout(function () {
        $(".g8").toggleClass("moveg8");
      }, 3150);

      setTimeout(function () {
        $(".g10").toggleClass("moveg10");
      }, 3500);

      setTimeout(function () {
        rotation += 45;
        $("#container").rotate(rotation);
      }, 3850);

      setTimeout(function () {
        rotation += 45;
        $("#container").rotate(rotation);
      }, 4200);

      setTimeout(function () {
        rotation += 45;
        $("#container").rotate(rotation);
      }, 4550);

      setTimeout(function () {
        rotation += 45;
        $("#container").rotate(rotation);
      }, 4900);

      setTimeout(function () {
        rotation += 180;
        $("#container").rotate(rotation);
        $(".g1").toggleClass("moveg1");
        $(".g2").toggleClass("moveg2");
        $(".g3").toggleClass("moveg3");
        $(".g4").toggleClass("moveg4");
        $(".g5").toggleClass("moveg5");
        $(".g6").toggleClass("moveg6");
        $(".g7").toggleClass("moveg7");
        $(".g8").toggleClass("moveg8");
        $(".g9").toggleClass("moveg9");
        $(".g10").toggleClass("moveg10");
      }, 5250);
    }, 5250);
  }

  setInterval(function () {
    $(".g12").toggleClass("hide");

    if ($(".g12").hasClass("hide")) {
      $(".g11").removeClass("hide");
      $(".g13").removeClass("hide");
    } else {
      $(".g11").addClass("hide");
      $(".g13").addClass("hide");
    }
  }, 350);

  //Order - 1,3,4,2,6,5,7,9,8,10

  setTimeout(function () {
    $(".g1").toggleClass("moveg1");
  }, 350);

  setTimeout(function () {
    $(".g3").toggleClass("moveg3");
  }, 700);

  setTimeout(function () {
    $(".g4").toggleClass("moveg4");
  }, 1050);

  setTimeout(function () {
    $(".g2").toggleClass("moveg2");
  }, 1400);

  setTimeout(function () {
    $(".g6").toggleClass("moveg6");
  }, 1750);

  setTimeout(function () {
    $(".g5").toggleClass("moveg5");
  }, 2100);

  setTimeout(function () {
    $(".g7").toggleClass("moveg7");
  }, 2450);

  setTimeout(function () {
    $(".g9").toggleClass("moveg9");
  }, 2800);

  setTimeout(function () {
    $(".g8").toggleClass("moveg8");
  }, 3150);

  setTimeout(function () {
    $(".g10").toggleClass("moveg10");
  }, 3500);

  var rotation = 0;
  jQuery.fn.rotate = function (degrees) {
    $(this).css({
      "-webkit-transform": "rotate(" + degrees + "deg)",
      "-moz-transform": "rotate(" + degrees + "deg)",
      "-ms-transform": "rotate(" + degrees + "deg)",
      transform: "rotate(" + degrees + "deg)",
    });
  };

  setTimeout(function () {
    rotation += 45;
    $("#container").rotate(rotation);
  }, 3850);

  setTimeout(function () {
    rotation += 45;
    $("#container").rotate(rotation);
  }, 4200);

  setTimeout(function () {
    rotation += 45;
    $("#container").rotate(rotation);
  }, 4550);

  setTimeout(function () {
    rotation += 45;
    $("#container").rotate(rotation);
  }, 4900);

  setTimeout(function () {
    rotation += 180;
    $("#container").rotate(rotation);
    $(".g1").toggleClass("moveg1");
    $(".g2").toggleClass("moveg2");
    $(".g3").toggleClass("moveg3");
    $(".g4").toggleClass("moveg4");
    $(".g5").toggleClass("moveg5");
    $(".g6").toggleClass("moveg6");
    $(".g7").toggleClass("moveg7");
    $(".g8").toggleClass("moveg8");
    $(".g9").toggleClass("moveg9");
    $(".g10").toggleClass("moveg10");
  }, 5250);
});
