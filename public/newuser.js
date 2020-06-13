$(function () {
  const activUser = JSON.parse(localStorage.getItem("user"));
  $("#username").text(activUser.name);
  $("#showuuid").val(activUser.uuid);

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
        window.location.replace("../game.html");
      }
    );
  });
});

function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("showuuid");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("ID wurde kopiert: " + copyText.value);
}
