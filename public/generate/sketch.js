/* global ml5 $ */

import data from "./data_aktuell.js";
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
    debug: true,
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
    // const colorHex = hslToHex(h, s, l)
    // const colorDecimal = parseInt(colorHex.substr(1), 16)
    const rgb = hslToRgb(h, s, l);
    console.log(rgb);
    // $('#temp').append(`<p style="color: hsl(${h},${s < 1 ? s * 100 : s}%,${l < 1 ? l * 100 : l}%)">B</p><p style="color: rgb(${rgb[0]},${rgb[1]},${rgb[2]})">B</p>`)
    const output = rgb;
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
  }
});

// function hslToHex (h, s, l) {
//   h /= 360
//   s /= 100
//   l /= 100
//   let r, g, b
//   if (s === 0) {
//     r = g = b = l // achromatic
//   } else {
//     const hue2rgb = (p, q, t) => {
//       if (t < 0) t += 1
//       if (t > 1) t -= 1
//       if (t < 1 / 6) return p + (q - p) * 6 * t
//       if (t < 1 / 2) return q
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
//       return p
//     }
//     const q = l < 0.5 ? l * (1 + s) : l + s - l * s
//     const p = 2 * l - q
//     r = hue2rgb(p, q, h + 1 / 3)
//     g = hue2rgb(p, q, h)
//     b = hue2rgb(p, q, h - 1 / 3)
//   }
//   const toHex = x => {
//     const hex = Math.round(x * 255).toString(16)
//     return hex.length === 1 ? '0' + hex : hex
//   }
//   return `#${toHex(r)}${toHex(g)}${toHex(b)}`
// }

// function hexToRgb(hex) {
//   var bigint = parseInt(hex, 16)
//   var r = (bigint >> 16) & 255
//   var g = (bigint >> 8) & 255
//   var b = bigint & 255
//   return r + "," + g + "," + b
// }

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
