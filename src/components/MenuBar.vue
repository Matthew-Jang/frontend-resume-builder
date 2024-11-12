<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ocLogo from "/oc-logo-white.png";

const router = useRouter();
const route = useRoute();
const logoURL = ref(ocLogo);

// Define the menu items
const menuItems = [
  { name: "Templates", path: "/templates" },
  { name: "Profile", path: "/profile" },
  { name: "Experience", path: "/experience" },
  { name: "Skills", path: "/skills" },
  { name: "Education", path: "/education" },
  { name: "Contact", path: "/contact" },
  { name: "References", path: "/references" },
  { name: "Confirm", path: "/confirm" },
];

// Check if the current route matches the item path
const isActive = (path) => route.path === path;

const navigate = (path) => {
  router.push(path);
};
</script>

<template>
  <v-app-bar app color="white" dense class="navbar">
    <!-- Centered Content -->
    <div class="nav-content">
      <!-- Logo -->
      <router-link :to="{ name: 'home' }">
        <v-img class="mx-2" :src="logoURL" height="40" width="40" contain></v-img>
      </router-link>

      <!-- Title -->
      <v-toolbar-title class="title">
        Resume Builder
      </v-toolbar-title>

      <!-- Navigation Items -->
      <div class="nav-menu">
        <v-btn
          v-for="item in menuItems"
          :key="item.name"
          :class="['nav-item', { active: isActive(item.path) }]"
          @click="navigate(item.path)"
          text
        >
          {{ item.name }}
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
/* Center the app bar content */
.navbar {
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

/* Center content within the navbar and apply max width */
.nav-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 1200px; /* Adjust max-width as needed */
  width: 100%;
}

/* Title styling */
.title {
  font-weight: bold;
  color: #9d6cff;
}

/* Navigation menu styling */
.nav-menu {
  display: flex;
  gap: 1rem;
}

/* Nav items with active state */
.nav-item {
  color: #9d6cff;
  font-weight: bold;
  border: 2px solid #e3d3ff;
  border-radius: 8px;
  padding: 5px 10px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item.active {
  background-color: #e1c8ff;
  border-color: #9d6cff;
  color: #ffffff;
}
</style>
