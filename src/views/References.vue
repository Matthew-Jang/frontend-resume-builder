<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import ReferenceServices from "../services/referenceServices";

const user = Utils.getStore("user");
const router = useRouter();
const references = ref([]);

const isAdd = ref(false);
const showModal = ref(false);
const showReferenceModal = ref(false); // For ReferenceModal
const selectedReference = ref({});
const newReference = ref({
  referenceName: "",
  relationship: "",
});

const referenceToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Name", value: "referenceName", sortable: true, width: "40%" },
  { text: "Relationship", value: "relationship", sortable: true, width: "40%" },
  { text: "Actions", value: "actions", sortable: false, width: "20%" },
];

const toggleReferenceModal = () => {
  showReferenceModal.value = !showReferenceModal.value;
};

const addReferenceModal = () => {
  isAdd.value = true;
  toggleReferenceModal();
  selectedReference.value = { ...newReference.value };
};

const editReference = (item) => {
  toggleReferenceModal();
  selectedReference.value = item;
};

const addReference = () => {
  const data = {
    referenceName: selectedReference.value.referenceName,
    relationship: selectedReference.value.relationship,
  };
  ReferenceServices.addReference(user.userId, data)
    .then(() => {
      fetchReferences();
    })
    .catch((e) => {
      console.error("Error adding reference:", e);
    });
  showReferenceModal.value = false;
  isAdd.value = false;
};

const confirmDeleteReference = async () => {
  try {
    await ReferenceServices.deleteReference(user.userId, referenceToDeleteID.value);
  } catch (error) {
    console.error("Error deleting reference:", error);
  }
  showModal.value = false;
  fetchReferences();
};

const fetchReferences = async () => {
  try {
    const response = await ReferenceServices.getReferencesForUser(user.userId);
    references.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching references:", error);
  }
};

const saveReferenceModal = () => {
  const data = {
    referenceName: selectedReference.value.referenceName,
    relationship: selectedReference.value.relationship,
  };

  ReferenceServices.updateReference(user.userId, selectedReference.value.id, data)
    .then(() => {
      fetchReferences();
    })
    .catch((e) => {
      console.error("Error updating reference:", e);
    });
  toggleReferenceModal();
};

const updateReference = (item) => {
  const data = {
    referenceName: tempEdits.value[item.id].referenceName,
    relationship: tempEdits.value[item.id].relationship,
  };

  ReferenceServices.updateReference(user.userId, item.id, data)
    .then(() => {
      fetchReferences();
    })
    .catch((e) => {
      console.error("Error updating reference:", e);
    });
};

const toggleModal = (inputReferenceToDeleteID) => {
  referenceToDeleteID.value = inputReferenceToDeleteID;
  showModal.value = !showModal.value;
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item };
};

const cancelEdit = (item) => {
  item.isEditing = false;
};

onMounted(fetchReferences);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Manage References</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addReferenceModal"> Add </v-btn>
    <v-data-table :headers="headers" :items="references" :items-per-page="10" class="elevation-1" style="width: 100%">
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field
                  v-model="tempEdits[item.id][header.value]"
                  dense
                  hide-details
                  :label="header.text"
                  @keyup.enter="updateReference(item)"
                ></v-text-field>
              </div>
              <div v-else @click="enableEdit(item)">
                {{ item[header.value] }}
              </div>
            </div>
            <div v-else>
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" @click="updateReference(item)">Save</v-btn>
                  <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" @click="editReference(item)">Edit</v-btn>
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
        <v-card-text>Are you sure you want to delete this reference?</v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteReference()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal for Adding or Editing -->
    <v-dialog v-model="showReferenceModal" max-width="400">
      <v-card>
        <v-card-title v-if="isAdd" class="headline">Add Reference</v-card-title>
        <v-card-title v-else class="headline">Edit Reference</v-card-title>
        <v-form>
          <v-text-field v-model="selectedReference.referenceName" label="Name" required
          @keyup.enter="isAdd ? addReference() : saveReferenceModal()"></v-text-field>
          <v-text-field v-model="selectedReference.relationship" label="Relationship" required
          @keyup.enter="isAdd ? addReference() : saveReferenceModal()"></v-text-field>
          <v-card-actions>
            <v-btn v-if="isAdd" color="green" @click="addReference">Save</v-btn>
            <v-btn v-else color="green" @click="saveReferenceModal">Save</v-btn>
            <v-btn color="red" @click="toggleReferenceModal">Cancel</v-btn>
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
