<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Utils from "../config/utils";
import EducationServices from "../services/educationServices";

const user = ref(Utils.getStore("user"));
const router = useRouter();
const educations = ref([]);

const isAdd = ref(false);
const showModal = ref(false);
const showEducationModal = ref(false);
const selectedEducation = ref({});
const newEducation = ref({
  institution: "",
  major: "",
  degree_type: "",
  start_year: "",
  end_year: "",
  gpa: "",
});

const educationToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Institution", value: "institution", sortable: true, width: "20%" },
  { text: "Major", value: "major", sortable: true, width: "15%" },
  { text: "Degree Type", value: "degree_type", sortable: true, width: "15%" },
  { text: "GPA", value: "gpa", sortable: true, width: "6%" },
  { text: "Start Year", value: "start_year", sortable: true, width: "12%" },
  { text: "End Year", value: "end_year", sortable: true, width: "12%" },
  { text: "Actions", value: "actions", sortable: false, width: "10%" },
];

const toggleEducationModal = () => {
  showEducationModal.value = !showEducationModal.value;
};

const addEducationModal = () => {
  isAdd.value = true;
  toggleEducationModal();
  selectedEducation.value = newEducation.value;
};

const editEducation = (item) => {
  toggleEducationModal();
  selectedEducation.value = item;
};

const addEducation = () => {
  const data = {
    institution: selectedEducation.value.institution,
    major: selectedEducation.value.major,
    degree_type: selectedEducation.value.degree_type,
    start_year: selectedEducation.value.start_year,
    end_year: selectedEducation.value.end_year,
    gpa: selectedEducation.value.gpa,
  };
  EducationServices.addEducation(getUserID(), data)
    .then((response) => {
      // selectedEducation.value.id = response.data.id;
      // router.push({ name: "experiences" });
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
  showEducationModal.value = false;
  isAdd.value = false;
  fetchEducations();
};

const saveEducationModal = () => {
  console.log("save education modal: " + selectedEducation.value.id);
  const data = {
    institution: selectedEducation.value.institution,
    major: selectedEducation.value.major,
    degree_type: selectedEducation.value.degree_type,
    start_year: selectedEducation.value.start_year,
    end_year: selectedEducation.value.end_year,
    gpa: selectedEducation.value.gpa,
  };
  console.log(data);

  EducationServices.updateEducation(user.userId, selectedEducation.value.id, data)
    .then((response) => {
      console.log("update " + response.data);
      fetchEducations();
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
  toggleEducationModal();
};

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

  EducationServices.updateEducation(user.value.userId, item.id, data)
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
  if (!year) return "";
  return dayjs(year).format("DD MMMM YYYY"); // e.g., "25 October 2023"
};

onMounted(fetchEducations);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Hello! Add or Edit Educations!</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addEducationModal"> Add </v-btn>
    <v-data-table :headers="headers" :items="educations" :items-per-page="10" class="elevation-1" style="width: 100%">
      <template v-slot:item="{ item }">
        <tr>
          <!-- Loop through headers except 'actions' -->
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field v-if="header.value !== 'degree_type'" v-model="tempEdits[item.education_id][header.value]"
                  :type="header.value.includes('year') ? 'date' : 'text'" dense hide-details></v-text-field>

                <v-select v-else v-model="tempEdits[item.education_id][header.value]"
                  :items="['High School', 'Diploma', 'Associate', 'Bachelor', 'Master', 'Doctorate']" dense hide-details
                  label="Degree Type"></v-select>
              </div>
              <div v-else @click="enableEdit(item)">
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
                  <v-btn color="green" @click="editEducation(item)">Edit</v-btn>
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

    <!-- Modal for Adding or Editing Education -->
    <v-dialog v-model="showEducationModal" max-width="400">
      <v-card>
        <v-card-title v-if="isAdd" class="headline">Add Education!</v-card-title>
        <v-card-title v-else class="headline">Edit Education!</v-card-title>
        <v-form ref="form" v-model="valid" lazy validation>

          <!-- Institution -->
          <v-text-field v-model="selectedEducation.institution" id="institution" label="Institution" :counter="255"
            required></v-text-field>

          <!-- Major -->
          <v-text-field v-model="selectedEducation.major" id="major" label="Major" :counter="255"
            required></v-text-field>

          <!-- Degree Type -->
          <v-select v-model="selectedEducation.degree_type" id="degree_type" label="Degree Type"
            :items="['High School', 'Diploma', 'Associate', 'Bachelor', 'Master', 'Doctorate']" required></v-select>

          <!-- Start Year -->
          <v-text-field v-model="selectedEducation.start_year" id="start_year" label="Start Year" type="date"
            required></v-text-field>

          <!-- End Year -->
          <v-text-field v-model="selectedEducation.end_year" id="end_year" label="End Year" type="date"
            required></v-text-field>

          <!-- GPA -->
          <v-text-field v-model="selectedEducation.gpa" id="gpa" label="GPA" type="number" step="0.01" min="0"
            max="4.00" required></v-text-field>

          <v-card-actions>
            <v-btn v-if="isAdd" color="green" @click="addEducation">Save</v-btn>
            <v-btn v-else color="green" @click="saveEducationModal">Save</v-btn>
            <v-btn color="red" @click="toggleEducationModal">Cancel</v-btn>
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
