$(function () {
  loadSurveys();

  $("form").submit(function (event) {
    event.preventDefault();
    var name = $("input#name").val();
    var uuid = create_UUID();
    var modern_klassisch = $("input#modern_klassisch").val();
    var unterhaltsam_serioes = $("input#unterhaltsam_serioes").val();
    var answer = $("input#answer").val();
    var color = $("input#color").val();
    $.post(
      "/surveys?" +
        $.param({
          name: name,
          uuid: uuid,
          modern_klassisch: modern_klassisch,
          unterhaltsam_serioes: unterhaltsam_serioes,
          answer: answer,
          color: color,
        }),
      function () {
        // $("<li></li>")
        //   .text(name + " " + answer)
        //   .appendTo("ul#users");
        // $("input#name").val("");
        // $("create_UUID").val("");
        // $("input#modern_klassisch").val("");
        // $("input#unterhaltsam_serioes").val("");
        // $("input#answer").val("");
        // $("input#color").val("");
        // $("input").focus();
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
              survey.uuid +
              " " +
              survey.modern_klassisch +
              " " +
              survey.unterhaltsam_serioes +
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
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

// console.log(create_UUID());

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
