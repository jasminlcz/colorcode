$(function () {
  const activUser = JSON.parse(localStorage.getItem("user"));
  var activColor = "";
  $("#username").text(activUser.name);
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
        })
    );
    window.location.replace("../game.html");
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
