$("form#logout").submit(function () {
  localStorage.removeItem("user");
});
