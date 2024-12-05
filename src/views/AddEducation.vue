<script setup>
import { ref, onMounted } from "vue";
import EducationServices from "../services/educationServices";
import Utils from "../config/utils.js";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const user = ref(Utils.getStore("user"));
const education = ref({
  education_id: null,
  institution: "",
  major: "",
  degree_type: "",
  start_year: "",
  end_year: "",
  gpa: "",
});
const message = ref("Enter data and click save");

// Optional: Test function similar to 'function1'
const testFunction = () => {
  console.log("add education vue");
  const data = {
    institution: "Test Institution",
    major: "Test Major",
    degree_type: "Bachelor",
    start_year: 2020,
    end_year: 2024,
    gpa: 3.75,
  };
  EducationServices.addEducation(user.value.userId, data)
    .then((response) => {
      education.value.education_id = response.data.education_id;
      console.log("Added Education:", response.data);
      router.push({ name: "educations" });
    })
    .catch((e) => {
      console.error("Error adding education:", e);
      //message.value = e.response.data.message;
    });
};

const saveEducation = () => {
  const data = {
    institution: education.value.institution,
    major: education.value.major,
    degree_type: education.value.degree_type,
    start_year: education.value.start_year,
    end_year: education.value.end_year,
    gpa: education.value.gpa,
  };
  EducationServices.addEducation(user.value.userId, data)
    .then((response) => {
      education.value.education_id = response.data.education_id;
      console.log("Added Education:", response.data);
      router.push({ name: "educations" });
    })
    .catch((e) => {
      console.error("Error adding education:", e);
      //message.value = e.response.data.message;
    });
};

const cancel = () => {
  router.push({ name: "educations" });
};

onMounted(() => {
  user.value = Utils.getStore("user");
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Education</v-toolbar-title>
      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- Institution -->
        <v-text-field
          v-model="education.institution"
          id="institution"
          :counter="100"
          label="Institution"
          required
        ></v-text-field>

        <!-- Major -->
        <v-text-field
          v-model="education.major"
          id="major"
          :counter="100"
          label="Major"
          required
        ></v-text-field>

        <!-- Degree Type -->
        <v-select
          v-model="education.degree_type"
          :items="[
            'High School',
            'Diploma',
            'Associate',
            'Bachelor',
            'Master',
            'Doctorate'
          ]"
          label="Degree Type"
          required
        ></v-select>

        <!-- GPA -->
        <v-text-field
          v-model="education.gpa"
          id="gpa"
          label="GPA"
          type="number"
          step="0.01"
          min="0"
          max="4"
          required
        ></v-text-field>

        <!-- Start Year -->
        <v-text-field
          v-model="education.start_year"
          id="start_year"
          label="Start Year"
          type="number"
          min="1900"
          max="2100"
          required
        ></v-text-field>

        <!-- End Year -->
        <v-text-field
          v-model="education.end_year"
          id="end_year"
          label="End Year"
          type="number"
          min="1900"
          max="2100"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveEducation"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel">Cancel</v-btn>
        <v-btn color="error" class="mr-4" @click="testFunction">New</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<style scoped>
.v-data-table {
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.button-group .v-btn {
  margin-right: 10px;
  width: 95px;
}
</style>
