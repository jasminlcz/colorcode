var ColorPicker = VueColorPicker;

var app = new Vue({
  el: "#app",
  components: {
    ColorPicker: ColorPicker,
  },
  data: {
    msg: "Radial Color Picker - Vue",
    color: {
      hex: 50,
      saturation: 100,
      luminosity: 50,
      alpha: 1,
    },
  },
  methods: {
    onInput: function (hue) {
      this.color.hue = hue;
    },
  },
});
