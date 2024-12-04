<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import ProjectServices from "../services/projectServices";

const user = Utils.getStore("user");
const router = useRouter();
const projects = ref([]);
const showModal = ref(false);
const projectToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Title", value: "title", width: "30%" },
  { text: "Description", value: "description", width: "40%" },
  { text: "Technologies", value: "technologies", width: "20%" },
  { text: "Actions", value: "actions", sortable: false, width: "10%" },
];

const confirmDeleteProject = async () => {
  try {
    console.log("confirm delete: ", projectToDeleteID.value);
    await ProjectServices.deleteProject(getUserID(), projectToDeleteID.value);
  } catch (error) {
    console.error("Error deleting project:", error);
  }
  showModal.value = false;
  fetchProjects();
};

const getUserID = () => {
  user.value = null;
  user.value = Utils.getStore("user");
  return user.value.userId;
};

const fetchProjects = async () => {
  try {
    console.log("fetching projects for user: " + getUserID());
    const response = await ProjectServices.getProjectsForUser(getUserID());
    projects.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

const updateProject = (item) => {
  const data = {
    title: tempEdits.value[item.id].title,
    description: tempEdits.value[item.id].description,
    technologies: tempEdits.value[item.id].technologies,
  };
  console.log(data);

  ProjectServices.updateProject(user.userId, item.id, data)
    .then(() => fetchProjects())
    .catch((e) => {
      console.error("Error updating project:", e);
    });
};

const toggleModal = (inputProjectToDeleteID) => {
  projectToDeleteID.value = inputProjectToDeleteID;
  showModal.value = !showModal.value;
};

const addProjectNav = () => {
  router.push({ name: "addProject" });
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item, menu: false };
};

const cancelEdit = (item) => {
  item.isEditing = false;
};

onMounted(fetchProjects);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Manage Your Projects</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addProjectNav"> Add </v-btn>
    <v-data-table
      :headers="headers"
      :items="projects"
      :items-per-page="10"
      class="elevation-1"
      style="width: 100%"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field
                  v-model="tempEdits[item.id][header.value]"
                  dense
                  hide-details
                ></v-text-field>
              </div>
              <div v-else>
                {{ item[header.value] }}
              </div>
            </div>
            <div v-else>
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" @click="updateProject(item)">Save</v-btn>
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

    <v-dialog v-model="showModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this project?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteProject()">Delete</v-btn>
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
