<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Utils from "../config/utils";
import ExperienceServices from "../services/experienceServices";


const user = Utils.getStore("user");
const router = useRouter();
const experiences = ref([]);
const showModal = ref(false);
const experienceToDeleteID = ref(null);
const tempEdits = ref({});


const headers = [
  //   { text: "ID", value: "id", width: "150px" },
  { text: "Title", value: "title", width: "15%" },
  { text: "Employer", value: "employer", width: "15%" },
  { text: "Description", value: "description", width: "40%" },
  { text: "Start Date", value: "start_date", width: "15%" },
  { text: "End Date", value: "end_date", width: "15%" },
  { text: "Actions", value: "actions", sortable: false, width: "150px" },
];


const toggleModal = (inputExperienceToDeleteID) => {
  experienceToDeleteID.value = inputExperienceToDeleteID;
  showModal.value = !showModal.value;
};


const addExperienceNav = () => {
  router.push({ name: "addExperience" });
};


const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item, menu: false };
};


const cancelEdit = (item) => {
  item.isEditing = false;
};


const formatDate = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).format("DD MMMM YYYY"); // e.g., "25 October 2023"
};


onMounted(fetchExperiences);
</script>


<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Hello! Add or Edit Experiences!</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addExperienceNav"> Add </v-btn>
    <v-data-table
      :headers="headers"
      :items="experiences"
      :items-per-page="10"
      class="elevation-1"
      style="width: 100%"
    >
      <template v-slot:item="{ item : experience } ">
        <tr>
          <!-- Loop through headers except 'actions' -->
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="experience.isEditing">
                <v-text-field
                  v-model="tempEdits[experience.id][header.value]"
                  dense
                  hide-details
                ></v-text-field>
              </div>
              <div v-else>
                <span
                  v-if="
                    header.value === 'start_date' || header.value === 'end_date'
                  "
                >
                  {{ formatDate(experience[header.value]) }}
                </span>
                <span v-else>
                  {{ experience[header.value] }}
                </span>
              </div>
            </div>
            <div v-else>
              <!-- Actions Column -->
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" @click="updateExperience(item)"
                    >Save</v-btn
                  >
                  <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" @click="enableEdit(item)">Edit</v-btn>
                  <v-btn color="red" @click="toggleModal(item.id)"
                    >Delete</v-btn
                  >
                </template>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>


    <!-- Modal for Delete Button -->
    <!-- Modal -->
    <v-dialog v-model="showModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this experience?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteExperience()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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



