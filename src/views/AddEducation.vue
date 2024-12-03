<script setup>
import { ref, onMounted } from "vue";
import ExperienceServices from "../services/experienceServices";
import Utils from "../config/utils.js";
import { useRouter } from "vue-router";


const router = useRouter();
const valid = ref(false);
const user = Utils.getStore("user");
const experience = ref({
  id: null,
  title: "",
  employer: "",
  start_date: "",
  end_date: "",
  description: "",
});
const message = ref("Enter data and click save");


const function1 = () =>{
    const data = {
    title: "test",
    employer: "test",
    start_date: null,
    end_date: null,
    description: "test",
  };
  ExperienceServices.addExperience(user.value.userId, data)
    .then((response) => {
      experience.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ name: "experiences" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const saveExperience = () => {
  const data = {
    title: experience.value.title,
    employer: experience.value.employer,
    start_date: experience.value.start_date,
    end_date: experience.value.end_date,
    description: experience.value.description,
  };
  ExperienceServices.addExperience(user.userId, data)
    .then((response) => {
      experience.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ name: "experiences" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const cancel = () => {
  router.push({ name: "experiences" });
};


onMounted(() => {
  user.value = Utils.getStore("user");
});
</script>


<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Experience Add</v-toolbar-title>
      </v-toolbar>


      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="experience.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>


        <!-- Employer -->
        <v-text-field
          v-model="experience.employer"
          id="employer"
          label="Employer"
          :counter="50"
          required
        ></v-text-field>


        <!-- Start Date -->
        <v-text-field
          v-model="experience.start_date"
          id="start_date"
          label="Start Date"
          type="date"
          required
        ></v-text-field>


        <!-- End Date -->
        <v-text-field
          v-model="experience.end_date"
          id="end_date"
          label="End Date"
          type="date"
          required
        ></v-text-field>


        <v-text-field
          v-model="experience.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field>


        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveExperience"
        >
          Save
        </v-btn>


        <v-btn color="error" class="mr-4" @click="cancel">Cancel</v-btn>
        <v-btn color="error" class="mr-4" @click="function1">New</v-btn>
      </v-form>
    </v-container>
  </div>
</template>



