<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import ResumeServices from "../services/resumeServices"; // Service for handling Resume API calls
import ExperienceServices from "../services/experienceServices"; // Service for Experience API
import EducationServices from "../services/educationServices"; // Service for Education API

const user = Utils.getStore("user");
const router = useRouter();
const resumes = ref([]);
const showModal = ref(false);
const resumeToDeleteID = ref(null);
const tempEdits = ref({});
const drawer = ref(false); // State for hamburger menu drawer
const selectedItems = ref([]); // Selected items for the resume

// Menu items for Experience and Education
const menuItems = ref({
  experiences: [],
  educations: [],
});

// Fetch experiences
const fetchExperiences = async () => {
  try {
    const response = await ExperienceServices.getExperiencesForUser(user.userId);
    menuItems.value.experiences = response.data;
  } catch (error) {
    console.error("Error fetching experiences:", error);
  }
};

// Fetch educations
const fetchEducations = async () => {
  try {
    const response = await EducationServices.getEducationsForUser(user.userId);
    menuItems.value.educations = response.data;
  } catch (error) {
    console.error("Error fetching educations:", error);
  }
};

// Toggle selection of an item
const toggleSelection = (item) => {
  const index = selectedItems.value.findIndex((selected) => selected.id === item.id);
  if (index === -1) {
    selectedItems.value.push(item);
  } else {
    selectedItems.value.splice(index, 1);
  }
};

// Check if an item is selected
const isSelected = (item) => {
  return selectedItems.value.some((selected) => selected.id === item.id);
};

// Fetch resumes
const fetchResumes = async () => {
  try {
    const response = await ResumeServices.getResumesByUser(user.userId);
    resumes.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching resumes:", error);
  }
};

// Update resume
const updateResume = (item) => {
  const data = { title: tempEdits.value[item.id].title };

  ResumeServices.updateResume(item.id, data)
    .then(() => {
      fetchResumes();
    })
    .catch((error) => console.error("Error updating resume:", error));
};

// Fetch resumes on mount
onMounted(fetchResumes);
onMounted(fetchExperiences);
onMounted(fetchEducations);
</script>

<template>
  <v-container>
    <!-- Top Toolbar -->
    <v-toolbar>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>Resumes</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addResume">Add Resume</v-btn>

    <!-- Data Table -->
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

    <!-- Hamburger Menu Drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item-group>
          <!-- Experience Dropdown -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Experience</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-chevron-down</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list>
            <v-list-item
              v-for="item in menuItems.experience"
              :key="item.id"
              @click="toggleSelection(item)"
            >
              <v-checkbox
                :value="isSelected(item)"
                @click.stop="toggleSelection(item)"
                label="item.title"
              ></v-checkbox>
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>
          </v-list>

          <!-- Education Dropdown -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Education</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-chevron-down</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list>
            <v-list-item
              v-for="item in menuItems.education"
              :key="item.id"
              @click="toggleSelection(item)"
            >
              <v-checkbox
                :value="isSelected(item)"
                @click.stop="toggleSelection(item)"
                label="item.title"
              ></v-checkbox>
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
