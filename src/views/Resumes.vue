<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import ResumeServices from "../services/resumeServices";
import ExperienceServices from "../services/experienceServices";
import EducationServices from "../services/educationServices";
import CertificationServices from "../services/certificationServices";
import ReferenceServices from "../services/referenceServices";
import ContactInfoServices from "../services/contactInfoServices";
import ProfessionalInfoServices from "../services/professionalInfoServices";
import SkillServices from "../services/skillServices";
import draggable from "vuedraggable";

const user = Utils.getStore("user");
const router = useRouter();
const resumes = ref([]);
const showModal = ref(false);
const resumeToDeleteID = ref(null);
const tempEdits = ref({});
const drawer = ref(false);

const headers = ref([
  { text: "Title", align: "start", value: "title" },
  { text: "Actions", value: "actions" },
]);

const menuItems = ref({
  experiences: [],
  educations: [],
  certifications: [],
  references: [],
  contacts: [],
  links: [],
  skills: [],
});

const draggableLists = ref([
  { name: "Experiences", key: "experiences" },
  { name: "Educations", key: "educations" },
  { name: "Certifications", key: "certifications" },
  { name: "References", key: "references" },
  { name: "Contacts", key: "contacts" },
  { name: "Links", key: "links" },
  { name: "Skills", key: "skills" },
]);

// Fetch experiences
const fetchExperiences = async () => {
  try {
    const response = await ExperienceServices.getExperiencesForUser(user.userId);
    menuItems.value.experiences = response.data.map((item) => ({
      ...item,
      selected: false,
    }));
  } catch (error) {
    console.error("Error fetching experiences:", error);
  }
};

// Fetch educations
const fetchEducations = async () => {
  try {
    const response = await EducationServices.getEducationsForUser(user.userId);
    menuItems.value.educations = response.data.map((item) => ({
      ...item,
      selected: false,
    }));
  } catch (error) {
    console.error("Error fetching educations:", error);
  }
};

// Fetch certifications
const fetchCertifications = async () => {
  try {
    const response = await CertificationServices.getCertificationsForUser(user.userId);
    menuItems.value.certifications = response.data.map((item) => ({
      ...item,
      selected: false,
    }));
  } catch (error) {
    console.error("Error fetching certifications:", error);
  }
};

// Fetch references
const fetchReferences = async () => {
  try {
    const response = await ReferenceServices.getReferencesForUser(user.userId);
    menuItems.value.references = response.data.map((item) => ({
      ...item,
      selected: false,
    }));
  } catch (error) {
    console.error("Error fetching references:", error);
  }
};

// Fetch contacts
const fetchContacts = async () => {
  try {
    const response = await ContactInfoServices.getContactsForUser(user.userId);
    menuItems.value.contacts = response.data.map((item) => ({
      ...item,
      selected: false,
    }));
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

// Fetch links
const fetchLinks = async () => {
  try {
    const response = await ProfessionalInfoServices.getProfessionalInfoForUser(user.userId);
    menuItems.value.links = response.data.map((item) => ({
      ...item,
      selected: false,
    }));
  } catch (error) {
    console.error("Error fetching professional info links:", error);
  }
};

// Fetch skills
const fetchSkills = async () => {
  try {
    const response = await SkillServices.getSkillsForUser(user.userId);
    menuItems.value.skills = response.data.map((item) => ({
      ...item,
      selected: false,
    }));
  } catch (error) {
    console.error("Error fetching skills:", error);
  }
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

const generatePDFNav = () => {
  router.push({ name: "pdfs" });
};

// Fetch all entities on mount
onMounted(() => {
  fetchResumes();
  fetchExperiences();
  fetchEducations();
  fetchCertifications();
  fetchReferences();
  fetchContacts();
  fetchLinks();
  fetchSkills();
});

// Handle list reordering
const updateListOrder = (newOrder) => {
  draggableLists.value = [...newOrder];
};
</script>

<template>
  <v-container>
    <!-- Top Toolbar -->
    <v-toolbar>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>Resumes</v-toolbar-title>
      <v-btn color="green" class="mr-4" @click="generatePDFNav"> Generate PDF </v-btn>
    </v-toolbar>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="resumes"
      :items-per-page="10"
      class="elevation-1"
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

    <!-- Hamburger Menu Drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <draggable v-model="draggableLists" @end="updateListOrder" class="draggable-list">
        <template #item="{ element }">
          <v-card class="mb-2" outlined>
            <v-row align="center">
              <v-col cols="1" class="drag-handle">
                <v-icon>mdi-drag</v-icon>
              </v-col>
              <v-col>
                <h3>{{ element.name }}</h3>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in menuItems[element.key]"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title || item.name || "Untitled" }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.description || item.institution || item.relationship || item.link || "No details available" }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </template>
      </draggable>
    </v-navigation-drawer>
  </v-container>
</template>

<style scoped>
.v-card {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}

.draggable-list {
  padding: 0;
  list-style: none;
}

.drag-handle {
  cursor: grab;
}

.mb-2 {
  margin-bottom: 8px;
}
</style>
