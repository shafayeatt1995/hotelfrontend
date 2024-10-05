<template>
  <label class="switch relative z-50">
    <input type="checkbox" v-model="isDarkMode" hidden />
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  name: "DarkMode",
  data() {
    return {
      isDarkMode: false,
    };
  },
  watch: {
    isDarkMode(newValue) {
      this.changeTheme(newValue);
    },
  },
  mounted() {
    this.setInitialTheme();
  },
  methods: {
    setInitialTheme() {
      const savedTheme = localStorage.getItem("theme") || "light";
      this.isDarkMode = savedTheme === "dark";
      this.applyTheme(this.isDarkMode);
    },
    changeTheme(isDarkMode) {
      const theme = isDarkMode ? "dark" : "light";
      this.applyTheme(isDarkMode);
      localStorage.setItem("theme", theme);
    },
    applyTheme(isDarkMode) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
};
</script>

<style lang="scss">
.switch {
  display: inline-block;
  width: 60px;
  height: 2em;
  position: relative;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(244 244 245 / 70%);
  border-radius: 1em;
  transition: background-color 0.3s;
}

.slider::before {
  content: "";
  position: absolute;
  height: 1.4em;
  width: 1.4em;
  background: linear-gradient(to top right, #ff0080, #ff8c00);
  border-radius: 50%;
  transition: transform 0.3s, background-color 0.3s;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
}

input:checked + .slider {
  background: #303136;
}

input:checked + .slider::before {
  transform: translateX(calc(1.5em + 0.3em)) translateY(-50%);
  background: #303136;
  box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
}
</style>
