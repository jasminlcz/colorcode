/* global ml5 $ */

import data from "./data_aktuell.js";
// var data = [];
// $.get("/surveys", function (surveyData) {
//   data = JSON.parse(surveyData);
// });
// console.log(data);

const generatorUUID = localStorage.getItem("generatorUUID");
console.log(generatorUUID);
var filteredData = [];
data.forEach((oneData) => {
  if (oneData.uuid == generatorUUID) {
    //generatorUUID
    filteredData.push(oneData);
  }
});
console.log(filteredData);

//uuid: "011384e9-43e3-4d5b-9691-cb9554bcd2ff
$(document).ready(() => {
  const zSlider = $("#aktuell_zeitlos");
  const kSlider = $("#kraftvoll_sanft");
  const vSlider = $("#verspielt_ernst");
  const wSlider = $("#warm_kalt");
  let trainingFlag = false;

  setInterval(() => {
    draw();
  }, 100);

  function draw() {
    if (trainingFlag) {
      const zValue = parseInt(zSlider.val());
      const kValue = parseInt(kSlider.val());
      const vValue = parseInt(vSlider.val());
      const wValue = parseInt(wSlider.val());
      const predictValue = [zValue, kValue, vValue, wValue];
      nn.predict(predictValue, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        // hex to rgb
        // const r = (Math.round(results[0].value) >> 16) & 255
        // const g = (Math.round(results[0].value) >> 8) & 255
        // const b = Math.round(results[0].value) & 255

        // hsl
        // const h = results[0].value
        // const s = results[1].value * 100
        // const l = results[2].value * 100
        // const colorcode = `hsl(${h},${s}%,${l}%)`

        // rgb
        const r = results[0].value;
        const g = results[1].value;
        const b = results[2].value;
        const colorcode = `rgb(${r},${g},${b})`;
        const styles = {
          backgroundColor: colorcode,
        };
        $("#colorrect").css(styles);
      });
    }
  }

  const options = {
    task: "regression",
    debug: false,
    layers: [
      {
        type: "dense",
        units: 16,
        activation: "relu",
      },
      {
        type: "dense",
        activation: "sigmoid",
      },
    ],
  };

  const nn = ml5.neuralNetwork(options);

  filteredData.forEach((item) => {
    const inputs = [
      parseInt(item.aktuell_zeitlos),
      parseInt(item.kraftvoll_sanft),
      parseInt(item.verspielt_ernst),
      parseInt(item.warm_kalt),
    ];
    const h = item.hsl[0];
    const s = item.hsl[1];
    const l = item.hsl[2];

    const rgb = hslToRgb(h, s, l);
    console.log(rgb);

    const output = rgb;
    $("#temp").append(
      `<button type="button submit" style="background: hsl(${h},${
        s < 1 ? s * 100 : s
      }%,${
        l < 1 ? l * 100 : l
      }%)" class="color-indicator" onclick="setSliderValue('${
        item.color
      }')"></button>
      `
    );

    //<p>${item.color}</p>
    nn.addData(inputs, output);
  });

  nn.normalizeData();

  const trainingOptions = {
    batchSize: 24,
    epochs: 20,
  };

  console.time("Training Time");
  nn.train(trainingOptions, finishedTraining);

  function finishedTraining() {
    console.timeEnd("Training Time");
    trainingFlag = true;
    var style = document.createElement("style");
    style.innerHTML = `
    #loading-wrapper {
    display:none;
    }
    `;
    document.head.appendChild(style);
  }

  window.setSliderValue = function (color) {
    filteredData.forEach((item) => {
      if (item.color == color) {
        document.getElementById("aktuell_zeitlos").value = item.aktuell_zeitlos;
        document.getElementById("kraftvoll_sanft").value = item.kraftvoll_sanft;
        document.getElementById("verspielt_ernst").value = item.verspielt_ernst;
        document.getElementById("warm_kalt").value = item.warm_kalt;
      }
    });

    document.getElementById("analyse");
  };
});

function hslToRgb(h, s, l) {
  // Must be fractions of 1
  if (s > 1) {
    s /= 100;
  }
  if (l > 1) {
    l /= 100;
  }

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}
