$(function () {
  //Spielername
  $("form#userinformation").submit(function (event) {
    event.preventDefault();
    var name = $("input#name").val();
    $.post(
      "/newuser?" +
        $.param({
          username: name,
        }),
      function (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        window.location.replace("../newuser/newuser.html");
      }
    );
  });
  //Prüft ob die eingegebene UUID vergeben ist und leitet weiter
  $("form#finduser").submit(function (event) {
    event.preventDefault();
    var uuid = $("input#uuid").val();
    $.get(
      "/searchuser?" +
        $.param({
          uuid: uuid,
        }),

      function (user) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.replace("../game/game.html");
        console.log(user);
      }
    );
  });
});

//Sucht ob User im Localhost liegt, wenn ja wird er direkt zum spiel weiter geleitet
function checklocal() {
  var user = localStorage.getItem("user");
  if (user == null) {
    window.location.replace("../exuser/exuser.html");
  } else {
    window.location.replace("../game/game.html");
  }
  console.log(user);
}
