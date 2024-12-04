<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Utils from "../config/utils";
import EducationServices from "../services/educationServices";

const user = ref(Utils.getStore("user"));
const router = useRouter();
const educations = ref([]);
const showModal = ref(false);
const educationToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Institution", value: "institution", width: "20%" },
  { text: "Major", value: "major", width: "15%" },
  { text: "Degree Type", value: "degree_type", width: "15%" },
  { text: "GPA", value: "gpa", width: "10%" },
  { text: "Start Year", value: "start_year", width: "10%" },
  { text: "End Year", value: "end_year", width: "10%" },
  { text: "Actions", value: "actions", sortable: false, width: "20%" },
];

const confirmDeleteEducation = async () => {
  try {
    await EducationServices.deleteEducation(getUserID(), educationToDeleteID.value);
  } catch (error) {
    console.error("Error deleting education:", error);
  }
  showModal.value = false;
  fetchEducations();
};

const getUserID = () => {
  user.value = Utils.getStore("user");
  return user.value.userId;
};

const fetchEducations = async () => {
  try {
    const response = await EducationServices.getEducationsForUser(getUserID());
    educations.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching educations:", error);
  }
};

const updateEducation = (item) => {
  const data = {
    institution: tempEdits.value[item.education_id].institution,
    major: tempEdits.value[item.education_id].major,
    degree_type: tempEdits.value[item.education_id].degree_type,
    gpa: tempEdits.value[item.education_id].gpa,
    start_year: tempEdits.value[item.education_id].start_year,
    end_year: tempEdits.value[item.education_id].end_year,
  };

  EducationServices.updateEducation(user.value.userId, item.education_id, data)
    .then(() => {
      fetchEducations();
    })
    .catch((e) => {
      console.error("Error updating education:", e);
    });
};

const toggleModal = (inputEducationToDeleteID) => {
  educationToDeleteID.value = inputEducationToDeleteID;
  showModal.value = !showModal.value;
};

const addEducationNav = () => {
  router.push({ name: "addEducation" });
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.education_id] = { ...item };
};

const cancelEdit = (item) => {
  item.isEditing = false;
  delete tempEdits.value[item.education_id];
};

const formatYear = (year) => {
  return year ? dayjs(`${year}-01-01`).format("YYYY") : "";
};

onMounted(fetchEducations);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Hello! Add or Edit Educations!</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addEducationNav"> Add </v-btn>
    <v-data-table
      :headers="headers"
      :items="educations"
      :items-per-page="10"
      class="elevation-1"
      style="width: 100%"
    >
      <template v-slot:item="{ item }">
        <tr>
          <!-- Loop through headers except 'actions' -->
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field
                  v-model="tempEdits[item.education_id][header.value]"
                  :type="header.value.includes('year') ? 'number' : 'text'"
                  dense
                  hide-details
                ></v-text-field>
              </div>
              <div v-else>
                <span v-if="header.value === 'degree_type'">
                  {{ item[header.value] }}
                </span>
                <span v-else-if="header.value === 'gpa'">
                  {{ item[header.value] ? item[header.value] : "" }}
                </span>
                <span v-else-if="header.value === 'start_year' || header.value === 'end_year'">
                  {{ formatYear(item[header.value]) }}
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
                  <v-btn color="green" @click="updateEducation(item)">Save</v-btn>
                  <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" @click="enableEdit(item)">Edit</v-btn>
                  <v-btn color="red" @click="toggleModal(item.id)">Delete</v-btn>
                </template>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Modal for Delete Button -->
    <v-dialog v-model="showModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this education?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteEducation">Delete</v-btn>
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
