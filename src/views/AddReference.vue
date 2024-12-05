<script setup>
import { ref, onMounted } from "vue";
import ReferenceServices from "../services/referenceServices";
import Utils from "../config/utils.js";
import { useRouter } from "vue-router";


const router = useRouter();
const valid = ref(false);
const user = Utils.getStore("user");
const reference = ref({
  id: null,
  referenceName: "",
  relationship: "",
});
const message = ref("Enter data and click save");


const function1 = () =>{
    const data = {
    referenceName: "test",
    relationship: "test",
  };
  ReferenceServices.addReference(user.value.userId, data)
    .then((response) => {
      reference.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ name: "references" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const saveReference = () => {
  const data = {
    referenceName: reference.value.referenceName,
    relationship: reference.value.relationship,
  };
  ReferenceServices.addReference(user.userId, data)
    .then((response) => {
      reference.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ name: "references" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const cancel = () => {
  router.push({ name: "references" });
};


onMounted(() => {
  user.value = Utils.getStore("user");
});
</script>


<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Reference Add</v-toolbar-title>
      </v-toolbar>


      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="reference.referenceName"
          id="referenceName"
          :counter="50"
          label="Name"
          required
        ></v-text-field>


        <!-- Employer -->
        <v-text-field
          v-model="reference.relationship"
          id="relationship"
          label="Relationship"
          :counter="50"
          required
        ></v-text-field>


        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveReference"
        >
          Save
        </v-btn>


        <v-btn color="error" class="mr-4" @click="cancel">Cancel</v-btn>
        <v-btn color="error" class="mr-4" @click="function1">New</v-btn>
      </v-form>
    </v-container>
  </div>
</template>



