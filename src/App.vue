<script setup>
// Import the MenuBar component
import MenuBar from "./components/MenuBar.vue";
</script>

<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <MenuBar />

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
