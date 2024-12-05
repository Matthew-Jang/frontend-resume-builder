<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import ProfessionalInfoServices from "../services/professionalInfoServices";

const user = Utils.getStore("user");
const router = useRouter();
const professionalInfo = ref([]);

const isAdd = ref(false);
const showModal = ref(false);
const showProfessionalInfoModal = ref(false);
const selectedProfessionalInfo = ref({});
const newProfessionalInfo = ref({
  github: "",
  linkedin: "",
});

const professionalInfoToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "GitHub", value: "github", sortable: true, width: "40%" },
  { text: "LinkedIn", value: "linkedin", sortable: true, width: "40%" },
  { text: "Actions", value: "actions", sortable: false, width: "20%" },
];

const toggleProfessionalInfoModal = () => {
  showProfessionalInfoModal.value = !showProfessionalInfoModal.value;
};

const addProfessionalInfoModal = () => {
  isAdd.value = true;
  toggleProfessionalInfoModal();
  selectedProfessionalInfo.value = newProfessionalInfo.value;
};

const editProfessionalInfo = (item) => {
  toggleProfessionalInfoModal();
  selectedProfessionalInfo.value = item;
};

const addProfessionalInfo = () => {
  const data = {
    github: selectedProfessionalInfo.value.github,
    linkedin: selectedProfessionalInfo.value.linkedin,
  };
  ProfessionalInfoServices.addProfessionalInfo(user.userId, data)
    .then(() => {
      fetchProfessionalInfo();
    })
    .catch((e) => {
      console.error("Error adding professional info:", e);
    });
  showProfessionalInfoModal.value = false;
  isAdd.value = false;
};

const confirmDeleteProfessionalInfo = async () => {
  try {
    await ProfessionalInfoServices.deleteProfessionalInfo(
      getUserID(),
      professionalInfoToDeleteID.value
    );
  } catch (error) {
    console.error("Error deleting professional info:", error);
  }
  showModal.value = false;
  fetchProfessionalInfo();
};

const getUserID = () => {
  user.value = null;
  user.value = Utils.getStore("user");
  return user.value.userId;
};

const fetchProfessionalInfo = async () => {
  try {
    const response = await ProfessionalInfoServices.getProfessionalInfoForUser(
      getUserID()
    );
    professionalInfo.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching professional info:", error);
  }
};

const saveProfessionalInfoModal = () => {
  const data = {
    github: selectedProfessionalInfo.value.github,
    linkedin: selectedProfessionalInfo.value.linkedin,
  };

  ProfessionalInfoServices.updateProfessionalInfo(
    user.userId,
    selectedProfessionalInfo.value.id,
    data
  )
    .then(() => {
      fetchProfessionalInfo();
    })
    .catch((e) => {
      console.error("Error updating professional info:", e);
    });
  toggleProfessionalInfoModal();
};

const updateProfessionalInfo = (item) => {
  const data = {
    github: tempEdits.value[item.id].github,
    linkedin: tempEdits.value[item.id].linkedin,
  };

  ProfessionalInfoServices.updateProfessionalInfo(user.userId, item.id, data)
    .then(() => {
      fetchProfessionalInfo();
    })
    .catch((e) => {
      console.error("Error updating professional info:", e);
    });
};

const toggleModal = (inputProfessionalInfoToDeleteID) => {
  professionalInfoToDeleteID.value = inputProfessionalInfoToDeleteID;
  showModal.value = !showModal.value;
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item };
};

const cancelEdit = (item) => {
  item.isEditing = false;
};

onMounted(fetchProfessionalInfo);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Manage Professional Info (GitHub & LinkedIn)</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addProfessionalInfoModal"> Add </v-btn>
    <v-data-table :headers="headers" :items="professionalInfo" :items-per-page="10" class="elevation-1" style="width: 100%">
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field v-model="tempEdits[item.id][header.value]" dense hide-details
                  @keyup.enter="updateProfessionalInfo(item)"></v-text-field>
              </div>
              <div v-else @click="enableEdit(item)">
                <span>{{ item[header.value] }}</span>
              </div>
            </div>
            <div v-else>
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" @click="updateProfessionalInfo(item)">Save</v-btn>
                  <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" @click="editProfessionalInfo(item)">Edit</v-btn>
                  <v-btn color="red" @click="toggleModal(item.id)">Delete</v-btn>
                </template>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Modal for Delete -->
    <v-dialog v-model="showModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this professional info?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteProfessionalInfo()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal for Add/Edit -->
    <v-dialog v-model="showProfessionalInfoModal" max-width="400">
      <v-card>
        <v-card-title v-if="isAdd" class="headline">Add Professional Info</v-card-title>
        <v-card-title v-else class="headline">Edit Professional Info</v-card-title>
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field v-model="selectedProfessionalInfo.github" label="GitHub" required></v-text-field>
          <v-text-field v-model="selectedProfessionalInfo.linkedin" label="LinkedIn" required></v-text-field>
          <v-card-actions>
            <v-btn v-if="isAdd" color="green" @click="addProfessionalInfo">Save</v-btn>
            <v-btn v-else color="green" @click="saveProfessionalInfoModal">Save</v-btn>
            <v-btn color="red" @click="toggleProfessionalInfoModal">Cancel</v-btn>
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
