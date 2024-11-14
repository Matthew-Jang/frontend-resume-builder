<script setup>
// Import the MenuBar component
import MenuBar from "./components/MenuBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <v-app>
    <!-- Conditionally render the MenuBar only on non-homepage routes -->
    <MenuBar v-if="route.path !== '/'" />

    <!-- Main Content Area -->
    <v-main>
      <v-container class="py-4" max-width="800px">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Ensure the app layout takes full height */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.v-main {
  flex: 1;
  display: flex;
  justify-content: center;
}

.v-container {
  margin-top: 20px;
}
</style>
