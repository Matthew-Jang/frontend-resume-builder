<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <!-- Navigation Bar -->
  <v-app-bar app color="white" dense class="navbar">
    <div class="nav-menu">
      <v-btn text @click="navigateTo('/dashboard')" class="nav-item">Dashboard</v-btn>
      <v-btn text @click="navigateTo('/login')" class="nav-item">Login/Signup</v-btn>
    </div>
    <v-spacer></v-spacer>
    <v-btn
      class="login-signup-button"
      @click="navigateTo('/login')"
      elevation="2"
    >
      Login / Signup
    </v-btn>
  </v-app-bar>

  <!-- Main Content -->
  <div class="homepage-content">
    <h1>Build a resume in 8 easy steps!</h1>
    <v-btn class="create-resume-button" @click="navigateTo('/create-resume')">Create Resume</v-btn>
    <v-btn class="your-resumes-button" outlined @click="navigateTo('/your-resumes')">Your Resumes</v-btn>
  </div>
</template>

<style scoped>
/* Navbar styling for homepage */
.navbar {
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
.homepage-content {
  text-align: center;
  margin-top: 4rem;
  color: #9d6cff;
}

/* Heading */
.homepage-content h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

/* Buttons */
.create-resume-button {
  background-color: #9d6cff;
  color: white;
  border-radius: 25px;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.create-resume-button:hover {
  background-color: #7b4fcf;
}

.your-resumes-button {
  color: #9d6cff;
  background-color: #f3e8ff;
  border-radius: 25px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: bold;
}
</style>
