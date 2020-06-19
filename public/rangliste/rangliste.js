$(function () {
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
