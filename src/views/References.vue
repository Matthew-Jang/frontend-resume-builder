<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Utils from "../config/utils";
import ReferenceServices from "../services/referenceServices";

const user = Utils.getStore("user");
const router = useRouter();
const references = ref([]);
const showModal = ref(false);
const referenceToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  //   { text: "ID", value: "id", width: "150px" },
  { text: "Reference", value: "referenceName", width: "15%" },
  { text: "Relationship", value: "relationship", width: "15%" },
];

const confirmDeleteReference = async () => {
  try {
    console.log("confirm delete: ", referenceToDeleteID);


    console.log("course: ", referenceToDeleteID.value);
    await ReferenceServices.deleteReference(
      getUserID(),
      referenceToDeleteID.value
    );
  } catch (error) {
    console.error("Error deleting skill:", error);
  }
  showModal.value = false;
  fetchReferences();
};

const getUserID = () => {
  user.value = null;
  user.value = Utils.getStore("user");
  //console.log("user " + JSON.stringify(user));
  return user.value.userId;
};

const fetchReferences = async () => {
  try {
    console.log("fetching References for user: " + getUserID());
    
    const response = await ReferenceServices.getReferencesForUser(
      getUserID()
    );
    references.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));

    console.log(response.data);
    console.log(JSON.stringify(references.value));

  } catch (error) {
    console.error("Error fetching References:", error);
  }
}

const updateReference = (item) => {
  const data = {
    referenceName: tempEdits.value[item.id].referenceName,
    relationship: tempEdits.value[item.id].relationship,
  };
  console.log(data);


  ReferenceServices.updateReference(user.userId, item.id, data)
    .then((response) => {
      console.log("update " + response.data);
      fetchReferences();
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const toggleModal = (inputReferenceToDeleteID) => {
  referencesToDeleteID.value = inputReferenceToDeleteID;
  showModal.value = !showModal.value;
};


const addReferenceNav = () => {
  router.push({ name: "addReference" });
};


const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item, menu: false };
};


const cancelEdit = (item) => {
  item.isEditing = false;
};


const formatDate = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).format("DD MMMM YYYY"); // e.g., "25 October 2023"
};


onMounted(fetchReferences);
</script>


<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Hello! Add or Edit References!</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addSkillNav"> Add </v-btn>
    <v-data-table
      :headers="headers"
      :items="references"
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
                  v-model="tempEdits[item.id][header.value]"
                  dense
                  hide-details
                ></v-text-field>
              </div>
              <div v-else>
                <span
                  v-if="
                    header.value === 'start_date' || header.value === 'end_date'
                  "
                >
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
                  <v-btn color="green" @click="updateSkill(item)"
                    >Save</v-btn
                  >
                  <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" @click="enableEdit(item)">Edit</v-btn>
                  <v-btn color="red" @click="toggleModal(item.id)"
                    >Delete</v-btn
                  >
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
          Are you sure you want to delete this reference?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteSkill()">Delete</v-btn>
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



