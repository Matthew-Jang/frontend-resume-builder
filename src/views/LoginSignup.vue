<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SocialLogin from "../components/SocialLogin.vue";

const router = useRouter();

const registerData = ref({
  username: "",
  password: "",
  email: "",
});

const loginData = ref({
  usernameOrEmail: "",
  password: "",
});

const navigateTo = (path) => {
  router.push(path);
};

const register = () => {
  console.log("Registering:", registerData.value);
  // Add registration logic here
};

const login = () => {
  console.log("Logging in:", loginData.value);
  // Add login logic here
};
</script>

<template>
  <!-- Custom Navbar for Login Page -->
  <v-app-bar app color="white" dense class="homepage-navbar">
    <div class="nav-menu">
      <v-btn text @click="navigateTo('/home')" class="nav-item">Home</v-btn>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>

  <!-- Main Content for Login and Signup -->
  <v-container class="login-signup-page" fluid>
    <v-row justify="center">
      <h1 class="section-title">Register an account</h1>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model="registerData.username"
          label="Username"
          placeholder="Enter Username"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="registerData.password"
          label="Password"
          placeholder="Enter Password"
          type="password"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="registerData.email"
          label="Email"
          placeholder="Enter Email"
          type="email"
          outlined
          dense
        ></v-text-field>
        <div class="button-group">
          <v-btn class="register-button" @click="register">Register</v-btn>
          <SocialLogin />
        </div>
      </v-col>
    </v-row>

    <v-divider class="divider" />

    <v-row justify="center">
      <h2 class="section-title">Returning User?</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model="loginData.usernameOrEmail"
          label="Username / Email"
          placeholder="Enter Username or Email"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="loginData.password"
          label="Password"
          placeholder="Enter Password"
          type="password"
          outlined
          dense
        ></v-text-field>
        <div class="button-group">
          <v-btn class="login-button" @click="login">Sign In</v-btn>
          <SocialLogin />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Navbar styling for login page */
.homepage-navbar {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8f0ff;
}

/* Navigation menu styling */
.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-item {
  color: #9d6cff;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #7b4fcf;
}

/* Login/Signup button styling */
.login-signup-button {
  background-color: #9d6cff;
  color: white;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-weight: bold;
}

/* Main content styling */
.login-signup-page {
  background-color: #ffffff;
  color: #9d6cff;
  padding: 2rem 1rem;
}

.section-title {
  text-align: center;
  font-size: 1.8rem;
  color: #9d6cff;
  margin: 1.5rem 0;
  font-weight: bold;
}

.divider {
  margin: 2rem auto;
  width: 60%;
  background-color: #e3d3ff;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.register-button,
.login-button {
  background-color: #9d6cff;
  color: white;
  border-radius: 20px;
  padding: 0.7rem 2rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.register-button:hover,
.login-button:hover {
  background-color: #7b4fcf;
}
</style>
