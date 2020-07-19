$(function () {
  const activUser = JSON.parse(localStorage.getItem("user"));
  console.log(activUser);
  var activColor = "";
  $("#username").text(activUser.name);
  $("#activlevel").text(activUser.level);
  $("#activpoints").text(activUser.points);
  $("#showuuid").val(activUser.uuid);
  //Zeigt die Randomcolro aus dem Datenset in dem Colorrect an
  $.get(
    "/randomcolor?" +
      $.param({
        uuid: activUser.uuid,
      }),
    function (color) {
      activColor = color.hex;
      $("#colorrect").css({ backgroundColor: color.hex });
    }
  );
  //Slider Value berechnung, sodass der Strocke nach außen hin verschwindet
  var sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    let s = document.createElement("style"); //css wird kreiert
    document.head.appendChild(s);
    console.log(slider);
    slider.addEventListener("input", () => {
      if (slider.value < 50) {
        s.textContent = `#${slider.id}::-webkit-slider-thumb{border: ${
          slider.value / 3
        }px solid #f1f2f7; background-color: ${activColor}}`;
      } else if (slider.value > 50) {
        s.textContent = `#${slider.id}::-webkit-slider-thumb{border: ${
          (100 - slider.value) / 3
        }px solid #f1f2f7; background-color: ${activColor}}`;
      } else {
        s.textContent = `#${slider.id}::-webkit-slider-thumb{border: none; background-color: #f1f2f7}`;
      }
    });
  });
  //Verhindert das man weiter machen kann ohne alle Slider eingestellt zu haben
  $("form#survey").submit(function (event) {
    var aktuell_zeitlos = $("input#aktuell_zeitlos").val();
    var kraftvoll_sanft = $("input#kraftvoll_sanft").val();
    var verspielt_ernst = $("input#verspielt_ernst").val();
    var warm_kalt = $("input#warm_kalt").val();

    event.preventDefault();
    var alldone = true;
    sliders.forEach((slider) => {
      if (slider.value == 50) {
        alldone = false;
      }
    });
    //Wenn alle Slider eingestallt sind werden die Informatiuonen in die db eingetragen
    if (alldone) {
      $.post(
        "/surveys?" +
          $.param({
            uuid: activUser.uuid,
            aktuell_zeitlos: aktuell_zeitlos,
            kraftvoll_sanft: kraftvoll_sanft,
            verspielt_ernst: verspielt_ernst,
            warm_kalt: warm_kalt,
            color: activColor,
          }),
        //Wenn alle Slider eingestallt sind wird man weitergeleitet
        function (user) {
          localStorage.setItem("user", JSON.stringify(user));
          if (user.level > activUser.level) {
            window.location.replace("../levelup/level.html");
          } else {
            window.location.replace("../game/game.html");
          }
        }
      );
    } else {
      alert(
        "Hast du nicht was vergessen? Sag uns deine Meinung indem du ALLE Slider verschiebst."
      );
    }
  });
});
