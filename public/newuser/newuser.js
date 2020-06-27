$(function () {
  const activUser = JSON.parse(localStorage.getItem("user"));
  $("#username").text(activUser.name);
  $("#showuuid").val(activUser.uuid);
  //Spieler wird mit seiner Lieblinsfarbe geupdatet
  $("form#updatefavcolor").submit(function (event) {
    event.preventDefault();
    var newfavcolor = $("input#newfavcolor").val();
    console.log(newfavcolor);
    $.post(
      "/updatecolor?" +
        $.param({
          uuid: activUser.uuid,
          newfavcolor: newfavcolor,
        }),
      function () {
        window.location.replace("../game/game.html");
      }
    );
  });
});

//Kopiert was in Input feld steht und gibt einen Alert aus
function myFunction() {
  var copyText = document.getElementById("showuuid");

  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand("copy");

  alert("ID wurde kopiert: " + copyText.value);
}
