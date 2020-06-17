const activUser = JSON.parse(localStorage.getItem("user"));
const progressPath = document.getElementById("progressPath");

progressPath.setAttribute("d", describeArc(150, 150, 130, 0, 359)); //radius,
progressPath.setAttribute("stroke", activUser.favColor); //radius,

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, endAngle, startAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "1" : "0";

  var d = [
    // eslint-disable-next-line prettier/prettier
    "M",
    start.x,
    start.y,
    // eslint-disable-next-line prettier/prettier
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ].join(" ");

  return d;
}
