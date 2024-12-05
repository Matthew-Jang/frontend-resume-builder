<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Utils from "../config/utils";
import ExperienceServices from "../services/experienceServices";

const user = Utils.getStore("user");
const router = useRouter();
const experiences = ref([]);

const isAdd = ref(false);
const showModal = ref(false);
const showExperienceModal = ref(false); // For ExperienceModal
const selectedExperience = ref({});
const newExperience = ref({
  title: "",
  employer: "",
  start_date: "",
  end_date: "",
  description: "",
});

const experienceToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  //   { text: "ID", value: "id", width: "150px" },
  { text: "Title", value: "title", sortable: true, width: "15%" },
  { text: "Employer", value: "employer",sortable: true, width: "15%" },
  { text: "Start Date", value: "start_date",sortable: true, width: "15%" },
  { text: "End Date", value: "end_date",sortable: true, width: "15%" },
  { text: "Description", value: "description",sortable: true, width: "40%" },
  { text: "Actions", value: "actions", sortable: false, width: "150px" },
];

const toggleExperienceModal = () => {
  showExperienceModal.value = !showExperienceModal.value;
};

const addExperienceModal = () => {
  isAdd.value = true;
  toggleExperienceModal();
  selectedExperience.value = newExperience.value;
};

const editExperience = (item) => {
  toggleExperienceModal();
  selectedExperience.value = item;
};

const addExperience = () => {
  const data = {
    title: selectedExperience.value.title,
    employer: selectedExperience.value.employer,
    start_date: selectedExperience.value.start_date,
    end_date: selectedExperience.value.end_date,
    description: selectedExperience.value.description,
  };
  ExperienceServices.addExperience(user.userId, data)
    .then((response) => {
      // selectedExperience.value.id = response.data.id;
      // router.push({ name: "experiences" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
  showExperienceModal.value = false;
  isAdd.value = false;
  fetchExperiences();
};

const confirmDeleteExperience = async () => {
  try {
    console.log("confirm delete: ", experienceToDeleteID);
    await ExperienceServices.deleteExperience(
      getUserID(),
      experienceToDeleteID.value
    );
  } catch (error) {
    console.error("Error deleting experience:", error);
  }
  showModal.value = false;
  fetchExperiences();
};

const getUserID = () => {
  user.value = null;
  user.value = Utils.getStore("user");
  //console.log("user " + JSON.stringify(user));
  return user.value.userId;
};

const fetchExperiences = async () => {
  try {
    console.log("fetching experiences for user: " + getUserID());

    const response = await ExperienceServices.getExperiencesForUser(
      getUserID()
    );
    experiences.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));

    console.log(response.data);
    console.log(JSON.stringify(experiences.value));
  } catch (error) {
    console.error("Error fetching experiences:", error);
  }
};

const saveExperienceModal = () => {
  const data = {
    title: selectedExperience.value.title,
    employer: selectedExperience.value.employer,
    start_date: selectedExperience.value.start_date,
    end_date: selectedExperience.value.end_date,
    description: selectedExperience.value.description,
  };
  console.log(data);

  ExperienceServices.updateExperience(user.userId, selectedExperience.value.id, data)
    .then((response) => {
      console.log("update " + response.data);
      fetchExperiences();
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
    toggleExperienceModal();
};

const updateExperience = (item) => {
  const data = {
    title: tempEdits.value[item.id].title,
    employer: tempEdits.value[item.id].employer,
    description: tempEdits.value[item.id].description,
    start_date: tempEdits.value[item.id].start_date,
    end_date: tempEdits.value[item.id].end_date,
  };
  console.log(data);

  ExperienceServices.updateExperience(user.userId, item.id, data)
    .then((response) => {
      console.log("update " + response.data);
      fetchExperiences();
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};

const toggleModal = (inputExperienceToDeleteID) => {
  experienceToDeleteID.value = inputExperienceToDeleteID;
  showModal.value = !showModal.value;
};

const addExperienceNav = () => {
  router.push({ name: "addExperience" });
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item}; //menu: false???
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
        <v-btn color="green" class="mr-4" @click="addExperienceModal"> Add </v-btn>
    <!-- <v-btn color="green" class="mr-4" @click="addExperienceNav"> Add </v-btn> -->
    <!-- <v-btn color="green" class="mr-4" @click="addExperienceModal"> Add Modal </v-btn> -->
    <v-data-table :headers="headers" :items="experiences" :items-per-page="10" class="elevation-1" style="width: 100%">
      <template v-slot:item="{ item }">
        <tr>
          <!-- Loop through headers except 'actions' -->
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field v-if="header.value === 'start_date' || header.value === 'end_date'" 
                v-model="tempEdits[item.id][header.value]"
                type="date" dense hide-details ></v-text-field>
                  
                <v-text-field v-else v-model="tempEdits[item.id][header.value]" dense hide-details
                  @keyup.enter="updateExperience(item)"></v-text-field>
              </div>
              <div v-else @click="enableEdit(item)">
                <span v-if="
                  header.value === 'start_date' || header.value === 'end_date'
                ">
                  {{ formatDate(item[header.value]) }}
                </span>
                <span v-else>
                  {{ item[header.value] }}
                </span>
              </div>
            </div>
            <div v-else>
              <!-- Actions Column -->
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" @click="updateExperience(item)">Save</v-btn>
                  <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" @click="editExperience(item)">Edit</v-btn>
                  <v-btn color="red" @click="toggleModal(item.id)">Delete</v-btn>
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

    <!-- Modal for Adding or Editing -->
    <!-- Modal -->
    <v-dialog v-model="showExperienceModal" max-width="400">
      <v-card>

        <v-card-title v-if="isAdd" class="headline">Add Experience!</v-card-title>
        <v-card-title v-else class="headline">Edit Experience!</v-card-title>
        <v-form ref="form" v-model="valid" lazy validation>

          <!-- title -->
          <v-text-field v-model="selectedExperience.title" id="title" :counter="50" label="Title"
            required></v-text-field>

          <!-- Employer -->
          <v-text-field v-model="selectedExperience.employer" id="employer" label="Employer" :counter="50"
            required></v-text-field>

          <!-- Start Date -->
          <v-text-field v-model="selectedExperience.start_date" id="start_date" label="Start Date" type="date"
            required></v-text-field>

          <!-- End Date -->
          <v-text-field v-model="selectedExperience.end_date" id="end_date" label="End Date" type="date"
            required></v-text-field>

          <v-text-field v-model="selectedExperience.description" id="description" :counter="50" label="Description"
            required></v-text-field>

          <v-card-actions>
            <v-btn v-if="isAdd" color="green" @click="addExperience">Save</v-btn>
            <v-btn v-else color="green" @click="saveExperienceModal">Save</v-btn>
            <v-btn color="red" @click="toggleExperienceModal">Cancel</v-btn>
          </v-card-actions>
        </v-form>
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
