$(function () {
  loadSurveys();

  $("form").submit(function (event) {
    event.preventDefault();
    var name = $("input#name").val();
    var modern_klassisch = $("input#modern_klassisch").val();
    var answer = $("input#answer").val();
    var color = $("input#color").val();
    $.post(
      "/surveys?" +
        $.param({
          name: name,
          modern_klassisch: modern_klassisch,
          answer: answer,
          color: color,
        }),
      function () {
        $("<li></li>")
          .text(name + " " + answer)
          .appendTo("ul#users");
        $("input#name").val("");
        $("input#modern_klassisch").val("");
        $("input#answer").val("");
        $("input#color").val("");
        $("input").focus();
        loadSurveys();
      }
    );
  });

  function loadSurveys() {
    $.get("/surveys", function (surveys) {
      $("ul#surveys li").remove();
      surveys.forEach(function (survey) {
        $("<li></li>")
          .text(
            survey.name +
              " " +
              survey.modern_klassisch +
              " " +
              survey.answer +
              " " +
              survey.color
          )
          .appendTo("ul#surveys");
      });
    });
  }
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

//slider
var slider = document.getElementById("modern_klassisch");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};
