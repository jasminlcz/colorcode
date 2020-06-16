$(function () {
  const activUser = JSON.parse(localStorage.getItem("user"));
  console.log(activUser);
  var activColor = "";
  $("#username").text(activUser.name);
  $("#activlevel").text(activUser.level);
  $("#activpoints").text(activUser.points);
  $("#showuuid").val(activUser.uuid);
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

  var sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    let s = document.createElement("style");
    document.head.appendChild(s);
    console.log(slider);
    slider.addEventListener("input", () => {
      if (slider.value < 50) {
        s.textContent = `#${slider.id}::-webkit-slider-thumb{border: ${
          slider.value / 3
        }px solid #eeeeee; background-color: ${activColor}}`;
      } else if (slider.value > 50) {
        s.textContent = `#${slider.id}::-webkit-slider-thumb{border: ${
          (100 - slider.value) / 3
        }px solid #eeeeee; background-color: ${activColor}}`;
      } else {
        s.textContent = `#${slider.id}::-webkit-slider-thumb{border: none; background-color: #eeeeee}`;
      }
    });
  });

  $("form#survey").submit(function (event) {
    event.preventDefault();

    var zeitgemaess_zeitlos = $("input#zeitgemaess_zeitlos").val();
    var kraftvoll_sanft = $("input#kraftvoll_sanft").val();
    var verspielt_ernst = $("input#verspielt_ernst").val();
    var warm_kalt = $("input#warm_kalt").val();
    var gewöhnlich_individuell = $("input#gewöhnlich_individuell").val();

    $.post(
      "/surveys?" +
        $.param({
          uuid: activUser.uuid,
          zeitgemaess_zeitlos: zeitgemaess_zeitlos,
          kraftvoll_sanft: kraftvoll_sanft,
          verspielt_ernst: verspielt_ernst,
          warm_kalt: warm_kalt,
          gewöhnlich_individuell: gewöhnlich_individuell,
          color: activColor,
        }),
      function (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.level > activUser.level) {
          window.location.replace("../levelup/level.html");
        } else {
          window.location.replace("../game/game.html");
        }
      }
    );
  });
});
function gofromtoslide(actSlide, nextslide) {
  var x = document.getElementById(nextslide);
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  var y = document.getElementById(actSlide);
  if (y.style.display == "block") {
    y.style.display = "none";
  } else {
    y.style.display = "block";
  }
}
