<script setup>
import { ref } from "vue";
import jsPDF from "jspdf";

const selectedTemplate = ref(null); // Track selected template

// Generate a PDF based on the selected template
const generatePDF = () => {
  if (!selectedTemplate.value) {
    alert("Please select a template to download.");
    return;
  }

  const doc = new jsPDF();

  // Template 1
  if (selectedTemplate.value === "template1") {
    doc.setFontSize(20);
    doc.text("Resume Template 1", 10, 10);
    doc.setFontSize(12);
    doc.text("Name: John Doe", 10, 30);
    doc.text("Experience: Software Engineer at ABC Corp", 10, 50);
    doc.text("Education: Bachelor of Computer Science", 10, 70);
  }

  // Template 2
  if (selectedTemplate.value === "template2") {
    doc.setFontSize(20);
    doc.text("Resume Template 2", 10, 10);
    doc.setFontSize(12);
    doc.text("Professional Summary:", 10, 30);
    doc.text("A highly skilled software engineer with 5 years of experience.", 10, 40);
    doc.text("Skills:", 10, 60);
    doc.text("- JavaScript\n- Vue.js\n- Python", 10, 70);
  }

  // Template 3
  if (selectedTemplate.value === "template3") {
    doc.setFontSize(20);
    doc.text("Resume Template 3", 10, 10);
    doc.setFontSize(12);
    doc.text("Name: John Doe", 10, 30);
    doc.text("Objective: To secure a challenging position in a reputable organization.", 10, 50);
    doc.text("References: Available upon request.", 10, 70);
  }

  doc.save(`${selectedTemplate.value}.pdf`);
};
</script>

<template>
  <v-container>
    <!-- Page Title -->
    <v-toolbar>
      <v-toolbar-title>Generate PDF Resume</v-toolbar-title>
    </v-toolbar>
    <v-divider class="mb-4"></v-divider>

    <!-- Template Options -->
    <h3>Select a Template:</h3>
    <v-row>
      <v-col cols="4">
        <v-card
          outlined
          :class="{'selected-card': selectedTemplate === 'template1'}"
          @click="selectedTemplate = 'template1'"
        >
          <v-card-title>Template 1</v-card-title>
          <v-card-subtitle>A simple, clean resume format.</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          outlined
          :class="{'selected-card': selectedTemplate === 'template2'}"
          @click="selectedTemplate = 'template2'"
        >
          <v-card-title>Template 2</v-card-title>
          <v-card-subtitle>A professional summary-focused resume.</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          outlined
          :class="{'selected-card': selectedTemplate === 'template3'}"
          @click="selectedTemplate = 'template3'"
        >
          <v-card-title>Template 3</v-card-title>
          <v-card-subtitle>A resume with an objective section.</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Download Button -->
    <v-btn color="primary" class="mt-4" @click="generatePDF">
      Download Selected PDF
    </v-btn>
  </v-container>
</template>

<style scoped>
.selected-card {
  border: 2px solid #1976d2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
