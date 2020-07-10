$("form#finduser").submit(function (event) {
  event.preventDefault();
  var uuid = $("input#uuid").val();

  localStorage.setItem("generatorUUID", uuid);
  window.location.replace("../generate/index.html");
});
