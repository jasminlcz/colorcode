$(function () {
  const activUser = JSON.parse(localStorage.getItem("user"));
  //Wenn ein User in Local Storage ist, zeigt er die aktuelle Punktzahl auch an wenn man nicht in der Liste ist
  if (activUser) {
    console.log(activUser);

    $("<span></span>")
      .html(
        `<span style="color: #a13356; font-weight: 700;" id="username">${activUser.name}</span> 
      du hast aktuell <span id="activpoints">${activUser.points}</span> Punkte`
      )
      .appendTo("#activUserInfo");
  }
  //Füllt den Tablebody mit den Informationen aus der Datenbank
  $.get("/ranking", function (users) {
    var rank = 1;
    const tableBody = document.getElementById("rankingbody");
    users.forEach(function (user) {
      $("<tr 'id='ranking'></tr>")
        .html(
          `<th scope="row">${rank}</th> 
            <td>${user.name}</td>
            <td>
             <div class="colorRect">
              <div
                id="rechteck"
                style="height: 30px; width: 30px; background-color: ${user.favColor};"
              ></div>
              </div>
            </td>
            <td>${user.points}</td>`
        )
        .appendTo("#rankingbody");
      rank++;
    });
    console.log(users);
  });
});
