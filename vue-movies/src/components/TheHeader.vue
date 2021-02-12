<template>
  <div class="navbar">
    <div class="logo-container">
      <img src="@/assets/logo.png" class="logo" />
      <span class="logo-text">ue-movies</span>
    </div>
    <button
      v-for="(tab, index) in tabs"
      :key="tab"
      :class="{ active: index === tabActive }"
      @click="select(index)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tabActive: 0,
    };
  },
  methods: {
    select(index) {
      this.tabActive = index;
      this.$emit("select", this.tabActive);
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #555;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
}

.navbar button {
  float: left;
  text-align: center;
  padding: 0.8rem;
  color: white;
  background-color: inherit;
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
}

.navbar button:hover {
  background-color: #000;
}

.navbar button.active {
  background-color: #4caf50;
  transition: background-color 0.3s;
}

.navbar button i {
  margin-right: 0.25rem;
}

/* Logo container */
.logo-container {
  float: left;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: 0.6rem;
  color: white;
}

.logo {
  vertical-align: baseline;
  height: 1.3rem;
  margin-bottom: -0.1rem;
}

.logo-text {
  margin-left: -0.1rem;
}
</style>
