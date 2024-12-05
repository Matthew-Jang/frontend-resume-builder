<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import ResumeServices from "../services/resumeServices"; // Service for handling Resume API calls

const user = Utils.getStore("user");
const router = useRouter();
const resumes = ref([]); // Holds the list of resumes
const showModal = ref(false);
const resumeToDeleteID = ref(null);
const tempEdits = ref({});

// Table headers for the Resumes
const headers = [
  { text: "Name", value: "title", width: "85%" }, // Resume title is displayed here
  { text: "Actions", value: "actions", sortable: false, width: "15%" },
];

// Confirm deletion of a resume
const confirmDeleteResume = async () => {
  try {
    await ResumeServices.deleteResume(resumeToDeleteID.value);
    showModal.value = false;
    fetchResumes();
  } catch (error) {
    console.error("Error deleting resume:", error);
  }
};

// Get the current user ID
const getUserID = () => {
  return user.userId;
};

// Fetch resumes for the current user
const fetchResumes = async () => {
  try {
    console.log("Fetching resumes for user: " + getUserID());
    const response = await ResumeServices.getResumesByUser(getUserID());
    resumes.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching resumes:", error);
  }
};

// Update a resume's title
const updateResume = (item) => {
  const data = {
    title: tempEdits.value[item.id].title,
  };

  ResumeServices.updateResume(item.id, data)
    .then(() => {
      fetchResumes();
    })
    .catch((error) => {
      console.error("Error updating resume:", error);
    });
};

// Navigate to add a new resume
const addResumeNav = () => {
  router.push({ name: "addResume" });
};

// Enable editing for a specific resume
const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item };
};

// Cancel editing a specific resume
const cancelEdit = (item) => {
  item.isEditing = false;
};

// Toggle the delete confirmation modal
const toggleModal = (inputResumeToDeleteID) => {
  resumeToDeleteID.value = inputResumeToDeleteID;
  showModal.value = !showModal.value;
};

// Fetch resumes when the component is mounted
onMounted(fetchResumes);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Resumes</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addResumeNav">Add Resume</v-btn>
    <v-data-table
      :headers="headers"
      :items="resumes"
      :items-per-page="10"
      class="elevation-1"
      style="width: 100%"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <div>
              <div v-if="item.isEditing">
                <v-text-field
                  v-model="tempEdits[item.id].title"
                  dense
                  hide-details
                ></v-text-field>
              </div>
              <div v-else>
                <span>{{ item.title }}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="button-group">
              <template v-if="item.isEditing">
                <v-btn color="green" @click="updateResume(item)">Save</v-btn>
                <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
              </template>
              <template v-else>
                <v-btn color="green" @click="enableEdit(item)">Edit</v-btn>
                <v-btn color="red" @click="toggleModal(item.id)">Delete</v-btn>
              </template>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Delete Confirmation Modal -->
    <v-dialog v-model="showModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this resume?</v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteResume()">Delete</v-btn>
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
