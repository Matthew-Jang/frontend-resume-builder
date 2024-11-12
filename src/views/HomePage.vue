<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <!-- Custom Navbar for Homepage -->
  <v-app-bar app color="white" dense class="homepage-navbar">
    <div class="nav-menu">
      <v-btn text @click="navigateTo('/dashboard')" class="nav-item">Dashboard</v-btn>
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
    <div class="buttons-container">
      <v-btn class="create-resume-button" @click="navigateTo('/create-resume')">Create Resume</v-btn>
      <v-btn class="your-resumes-button" outlined @click="navigateTo('/your-resumes')">Your Resumes</v-btn>
    </div>
  </div>
</template>

<style scoped>
/* Navbar styling for homepage */
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
.homepage-content {
  text-align: center;
  margin-top: 6rem;
  color: #9d6cff;
}

/* Heading */
.homepage-content h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

/* Center buttons and stack vertically */
.buttons-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  align-items: center;    /* Center buttons horizontally */
  gap: 1rem;              /* Space between buttons */
}

/* Button styling */
.create-resume-button, .your-resumes-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  width: 200px; /* Ensure buttons are the same width */
}

/* Specific styling for Create Resume button */
.create-resume-button {
  background-color: #9d6cff;
  color: white;
  transition: background-color 0.3s;
}

.create-resume-button:hover {
  background-color: #7b4fcf;
}

/* Specific styling for Your Resumes button */
.your-resumes-button {
  color: #9d6cff;
  background-color: #f3e8ff;
}
</style>
