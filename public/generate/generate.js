$(function () {
  // var sliders = document.querySelectorAll(".slider");
  $("#temp").submit(function (event) {
    alert("Handler for .submit() called.");
    // document.getElementById("aktuell_zeitlos").value = "75";
    $("input#aktuell_zeitlos").value = "30";
    // $("input#kraftvoll_sanft").val();
    // $("input#verspielt_ernst").val();
    // $("input#warm_kalt").val();
  });
});
