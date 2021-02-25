<template>
  <div class="navbar">
    <div class="logo-container">
      <img src="@/assets/logo.png" class="logo" />
      <span class="logo-text">ue-movies</span>
    </div>

    <router-link
      :to="{ name: 'popular' }"
      :active-class="activeClass"
      :class="linkClass"
    >
      <i class="fas fa-film"></i>Popular
    </router-link>

    <router-link
      :to="{ name: 'search' }"
      :active-class="activeClass"
      :class="linkClass"
    >
      <i class="fas fa-search"></i>Buscar
    </router-link>

    <router-link
      v-if="isAuthenticated"
      :to="{ name: 'favourite' }"
      :active-class="activeClass"
      :class="linkClass"
    >
      <i class="far fa-star"></i>Favoritas
      <m-pill>{{ countFavourites }}</m-pill>
    </router-link>

    <button
      v-if="isAuthenticated"
      style="float: right"
      class="link"
      @click="getAccount"
    >
      Refrescar usuario
    </button>
    <button
      v-if="isAuthenticated"
      style="float: right"
      class="link"
      @click="logout"
    >
      Logout
    </button>
    <a style="float: right" class="link" @click="$emit('login')">
      <i class="far fa-user mr-1"></i>
      <span v-if="user">{{ user.username }}</span>
      <span v-else>Login</span>
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import MPill from "@/components/MPill";

export default {
  name: "TheHeader",
  components: { MPill },
  computed: {
    ...mapState("user", ["user", "sessionId"]),
    ...mapGetters("user", ["isAuthenticated"]),
    ...mapGetters("movie", ["countFavourites"]),
    linkClass() {
      return "link";
    },
    activeClass() {
      return "active";
    },
  },
  methods: {
    ...mapActions(["getAccount"]),
    logout() {
      localStorage.removeItem("session_id");
      location.reload();
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

.navbar .link {
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

.navbar .link:hover {
  background-color: #000;
}

.navbar .link.active {
  background-color: #4caf50;
  transition: background-color 0.3s;
}

.navbar .link i {
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
