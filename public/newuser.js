$(function () {
  const activUser = JSON.parse(localStorage.getItem("user"));
  $("#username").text(activUser.name);
  $("#showuuid").val(activUser.uuid);
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
  alert("Copied the text: " + copyText.value);
}