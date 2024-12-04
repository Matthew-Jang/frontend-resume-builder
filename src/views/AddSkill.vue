<script setup>
import { ref, onMounted } from "vue";
import SkillServices from "../services/skillServices.js";
import Utils from "../config/utils.js";
import { useRouter } from "vue-router";


const router = useRouter();
const valid = ref(false);
const user = Utils.getStore("user");
const skill = ref({
  id: null,
  skillInfo: "",
});
const message = ref("Enter data and click save");


const function1 = () =>{
    const data = {
    skillInfo: "test",
  };
  SkillServices.addSkill(user.value.userId, data)
    .then((response) => {
      skill.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ name: "skills" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const saveSkill = () => {
  const data = {
    skillInfo: skill.value.skillInfo,
  };
  SkillServices.addSkill(user.userId, data)
    .then((response) => {
      skill.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ name: "skills" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const cancel = () => {
  router.push({ name: "skills" });
};


onMounted(() => {
  user.value = Utils.getStore("user");
});
</script>


<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Skill Add</v-toolbar-title>
      </v-toolbar>


      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="skill.skillInfo"
          id="skillInfo"
          :counter="50"
          label="Skill"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveSkill"
        >
          Save
        </v-btn>


        <v-btn color="error" class="mr-4" @click="cancel">Cancel</v-btn>
        <v-btn color="error" class="mr-4" @click="function1">New</v-btn>
      </v-form>
    </v-container>
  </div>
</template>



