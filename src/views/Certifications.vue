<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Utils from "../config/utils";
import CertificationServices from "../services/certificationServices";

const user = Utils.getStore("user");
const router = useRouter();
const certifications = ref([]);

const isAdd = ref(false);
const showModal = ref(false);
const showCertificationModal = ref(false); // For CertificationModal
const selectedCertification = ref({});
const newCertification = ref({
  title: "",
  institution: "",
  year_awarded: "",
});

const certificationToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Title", value: "title", sortable: true, width: "25%" },
  { text: "Institution", value: "institution", sortable: true, width: "25%" },
  { text: "Year Awarded", value: "year_awarded", sortable: true, width: "10%" },
  { text: "Actions", value: "actions", sortable: false, width: "15%" },
];

const toggleCertificationModal = () => {
  showCertificationModal.value = !showCertificationModal.value;
};

const addCertificationModal = () => {
  isAdd.value = true;
  toggleCertificationModal();
  selectedCertification.value = newCertification.value;
};

const editCertification = (item) => {
  toggleCertificationModal();
  selectedCertification.value = item;
};

const addCertification = () => {
  const data = {
    title: selectedCertification.value.title,
    institution: selectedCertification.value.institution,
    year_awarded: selectedCertification.value.year_awarded,
  };
  CertificationServices.addCertification(user.userId, data)
    .then(() => {
      fetchCertifications();
    })
    .catch((e) => {
      console.error("Error adding certification:", e);
    });
  showCertificationModal.value = false;
  isAdd.value = false;
};

const confirmDeleteCertification = async () => {
  try {
    await CertificationServices.deleteCertification(
      getUserID(),
      certificationToDeleteID.value
    );
  } catch (error) {
    console.error("Error deleting certification:", error);
  }
  showModal.value = false;
  fetchCertifications();
};

const getUserID = () => {
  user.value = Utils.getStore("user");
  return user.userId;
};

const fetchCertifications = async () => {
  try {
    const response = await CertificationServices.getCertificationsForUser(
      getUserID()
    );
    certifications.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching certifications:", error);
  }
};

const saveCertificationModal = () => {
  const data = {
    title: selectedCertification.value.title,
    institution: selectedCertification.value.institution,
    year_awarded: selectedCertification.value.year_awarded,
  };

  CertificationServices.updateCertification(
    user.userId,
    selectedCertification.value.id,
    data
  )
    .then(() => {
      fetchCertifications();
    })
    .catch((e) => {
      console.error("Error updating certification:", e);
    });
  toggleCertificationModal();
};

const updateCertification = (item) => {
  const data = {
    title: tempEdits.value[item.id].title,
    institution: tempEdits.value[item.id].institution,
    year_awarded: tempEdits.value[item.id].year_awarded,
  };

  CertificationServices.updateCertification(user.userId, item.id, data)
    .then(() => {
      fetchCertifications();
    })
    .catch((e) => {
      console.error("Error updating certification:", e);
    });
};

const toggleModal = (inputCertificationToDeleteID) => {
  certificationToDeleteID.value = inputCertificationToDeleteID;
  showModal.value = !showModal.value;
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item };
};

const cancelEdit = (item) => {
  item.isEditing = false;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).format("DD MMMM YYYY"); // e.g., "25 October 2023"
};

onMounted(fetchCertifications);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Hello! Add or Edit Certifications!</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addCertificationModal"> Add </v-btn>
    <v-data-table :headers="headers" :items="certifications" :items-per-page="10" class="elevation-1"
      style="width: 100%">
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field v-model="tempEdits[item.id][header.value]" dense hide-details type="number"
                  :label="header.text" v-if="header.value === 'year_awarded'"
                  @keyup.enter="updateCertification(item)"></v-text-field>
                <v-text-field v-model="tempEdits[item.id][header.value]" dense hide-details :label="header.text"
                  v-else
                  @keyup.enter="updateCertification(item)"></v-text-field>
              </div>
              <div v-else @click="enableEdit(item)">
                <span v-if="header.value === 'year_awarded'">
                  {{ item[header.value] }}
                </span>
                <span v-else>{{ item[header.value] }}</span>
              </div>
            </div>
            <div v-else>
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" small @click="updateCertification(item)">Save</v-btn>
                  <v-btn color="red" small @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" small @click="editCertification(item)">Edit</v-btn>
                  <v-btn color="red" small @click="toggleModal(item.id)">Delete</v-btn>
                </template>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Modal for Delete Confirmation -->
    <v-dialog v-model="showModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this certification?</v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteCertification">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal for Adding or Editing Certification -->
    <v-dialog v-model="showCertificationModal" max-width="400">
      <v-card>
        <v-card-title v-if="isAdd" class="headline">Add Certification</v-card-title>
        <v-card-title v-else class="headline">Edit Certification</v-card-title>
        <v-form>
          <v-text-field v-model="selectedCertification.title" label="Title" required
          @keyup.enter="isAdd ? addCertification() : saveCertificationModal()"></v-text-field>
          <v-text-field v-model="selectedCertification.institution" label="Institution" required
          @keyup.enter="isAdd ? addCertification() : saveCertificationModal()"></v-text-field>
          <v-text-field v-model="selectedCertification.year_awarded" label="Year Awarded" type="number"
            required
            @keyup.enter="isAdd ? addCertification() : saveCertificationModal()"></v-text-field>
          <v-card-actions>
            <v-btn v-if="isAdd" color="green" @click="addCertification">Save</v-btn>
            <v-btn v-else color="green" @click="saveCertificationModal">Save</v-btn>
            <v-btn color="red" @click="toggleCertificationModal">Cancel</v-btn>
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
