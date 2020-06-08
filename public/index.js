$(function () {
  // loadSurveys();
  /* searchuser('e0862925-405a-4dce-b2a8-a3515df1a88f'); */

  $("form#userinformation").submit(function (event) {
    event.preventDefault();
    var name = $("input#name").val();
    var favColor = $("input#faveColor").val();
    $.post(
      "/newuser?" +
        $.param({
          username: name,
          favColor: favColor,
        }),
      function (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        window.location.replace("../newuser.html");
      }
    );
  });

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
        window.location.replace("../game.html");
        console.log(user);
      }
    );
  });

  // function loadSurveys() {
  //   $.get("/surveys", function (surveys) {
  //     $("ul#surveys li").remove();
  //     surveys.forEach(function (survey) {
  //       $("<li></li>")
  //         .text(
  //           survey.name +
  //             " " +
  //             survey.uuid +
  //             " " +
  //             survey.modern_klassisch +
  //             " " +
  //             survey.unterhaltsam_serioes +
  //             " " +
  //             survey.answer +
  //             " " +
  //             survey.color
  //         )
  //         .appendTo("ul#surveys");
  //     });
  //   });
  // }

  function searchuser(uuid) {
    $.get(
      "/searchuser?" +
        $.param({
          uuid: uuid,
        }),
      function (user) {
        alert(user.name);
      }
    ).fail(function () {
      alert("nicht gefunden");
    });
  }
});
