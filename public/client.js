$(function () {
  loadSurveys();

  $("form").submit(function (event) {
    event.preventDefault();
    var name = $("input#name").val();
    var answer = $("input#answer").val();
    var color = $("input#color").val();
    $.post(
      "/surveys?" + $.param({ name: name, answer: answer, color: color }),
      function () {
        $("<li></li>")
          .text(name + " " + answer)
          .appendTo("ul#users");
        $("input#name").val("");
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
          .text(survey.name + " " + survey.answer + " " + survey.color)
          .appendTo("ul#surveys");
      });
    });
  }
});
