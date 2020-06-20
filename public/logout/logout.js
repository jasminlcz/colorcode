$("form#logout").submit(function () {
  localStorage.removeItem("user");
  //   window.location.replace("../index.html");
});
