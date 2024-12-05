<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import CertificationServices from "../services/certificationServices";

const user = Utils.getStore("user");
const router = useRouter();
const certifications = ref([]);
const showModal = ref(false);
const certificationToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Title", value: "title", width: "30%" },
  { text: "Institution", value: "institution", width: "30%" },
  { text: "Year Awarded", value: "year_awarded", width: "20%" },
  { text: "Actions", value: "actions", sortable: false, width: "20%" },
];

const confirmDeleteCertification = async () => {
  try {
    console.log("confirm delete: ", certificationToDeleteID.value);
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
  user.value = null;
  user.value = Utils.getStore("user");
  return user.value.userId;
};

const fetchCertifications = async () => {
  try {
    console.log("Fetching certifications for user: " + getUserID());
    const response = await CertificationServices.getCertificationsForUser(
      getUserID()
    );
    certifications.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching certifications:", error);
  }
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
    .catch((error) => {
      console.error("Error updating certification:", error);
    });
};

const toggleModal = (inputCertificationToDeleteID) => {
  certificationToDeleteID.value = inputCertificationToDeleteID;
  showModal.value = !showModal.value;
};

const addCertificationNav = () => {
  router.push({ name: "addCertification" });
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item, menu: false };
};

const cancelEdit = (item) => {
  item.isEditing = false;
};

onMounted(fetchCertifications);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Manage Your Certifications</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addCertificationNav"> Add </v-btn>
    <v-data-table
      :headers="headers"
      :items="certifications"
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
              <!-- Actions Column -->
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" @click="updateCertification(item)">Save</v-btn>
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

    <!-- Modal for Delete Confirmation -->
    <v-dialog v-model="showModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this certification?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteCertification()">Delete</v-btn>
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
