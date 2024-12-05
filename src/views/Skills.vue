<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import SkillServices from "../services/skillServices";

const user = Utils.getStore("user");
const router = useRouter();
const skills = ref([]);

const isAdd = ref(false);
const showModal = ref(false);
const showSkillModal = ref(false); // For SkillModal
const selectedSkill = ref({});
const newSkill = ref({
  skillInfo: "",
});

const skillToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Skill Info", value: "skillInfo", sortable: true, width: "85%" },
  { text: "Actions", value: "actions", sortable: false, width: "15%" },
];

const toggleSkillModal = () => {
  showSkillModal.value = !showSkillModal.value;
};

const addSkillModal = () => {
  isAdd.value = true;
  toggleSkillModal();
  selectedSkill.value = { ...newSkill.value };
};

const editSkill = (item) => {
  toggleSkillModal();
  selectedSkill.value = { ...item };
};

const addSkill = () => {
  const data = {
    skillInfo: selectedSkill.value.skillInfo,
  };
  SkillServices.addSkill(user.userId, data)
    .then(() => {
      fetchSkills();
    })
    .catch((e) => {
      console.error("Error adding skill:", e);
    });
  showSkillModal.value = false;
  isAdd.value = false;
};

const confirmDeleteSkill = async () => {
  try {
    await SkillServices.deleteSkill(user.userId, skillToDeleteID.value);
  } catch (error) {
    console.error("Error deleting skill:", error);
  }
  showModal.value = false;
  fetchSkills();
};

const getUserID = () => {
  user.value = Utils.getStore("user");
  return user.userId;
};

const fetchSkills = async () => {
  try {
    const response = await SkillServices.getSkillsForUser(getUserID());
    skills.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching skills:", error);
  }
};

const saveSkillModal = () => {
  const data = {
    skillInfo: selectedSkill.value.skillInfo,
  };

  SkillServices.updateSkill(user.userId, selectedSkill.value.id, data)
    .then(() => {
      fetchSkills();
    })
    .catch((e) => {
      console.error("Error updating skill:", e);
    });
  toggleSkillModal();
};

const updateSkill = (item) => {
  const data = {
    skillInfo: tempEdits.value[item.id].skillInfo,
  };

  SkillServices.updateSkill(user.userId, item.id, data)
    .then(() => {
      fetchSkills();
    })
    .catch((e) => {
      console.error("Error updating skill:", e);
    });
};

const toggleModal = (inputSkillToDeleteID) => {
  skillToDeleteID.value = inputSkillToDeleteID;
  showModal.value = !showModal.value;
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item };
};

const cancelEdit = (item) => {
  item.isEditing = false;
};

onMounted(fetchSkills);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Manage Your Skills</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addSkillModal"> Add Skill </v-btn>
    <v-data-table :headers="headers" :items="skills" :items-per-page="10" class="elevation-1" style="width: 100%">
      <template v-slot:item="{ item }">
        <tr>
          <!-- Skill Info Column -->
          <td>
            <div v-if="item.isEditing">
              <v-text-field v-model="tempEdits[item.id].skillInfo" dense hide-details @keyup.enter="updateSkill(item)" />
            </div>
            <div v-else @click="enableEdit(item)">
              <span>{{ item.skillInfo }}</span>
            </div>
          </td>

          <!-- Actions Column -->
          <td>
            <div class="button-group">
              <template v-if="item.isEditing">
                <v-btn color="green" @click="updateSkill(item)">Save</v-btn>
                <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
              </template>
              <template v-else>
                <v-btn color="green" @click="editSkill(item)">Edit</v-btn>
                <v-btn color="red" @click="toggleModal(item.id)">Delete</v-btn>
              </template>
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
          Are you sure you want to delete this skill?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteSkill()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal for Adding or Editing -->
    <v-dialog v-model="showSkillModal" max-width="400">
      <v-card>
        <v-card-title v-if="isAdd" class="headline">Add Skill</v-card-title>
        <v-card-title v-else class="headline">Edit Skill</v-card-title>
        <v-form @submit.prevent="isAdd ? addSkill() : saveSkillModal()" ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="selectedSkill.skillInfo" label="Skill Info" required />
          <v-card-actions>
            <v-btn v-if="isAdd" color="green" @click="addSkill">Save</v-btn>
            <v-btn v-else color="green" @click="saveSkillModal">Save</v-btn>
            <v-btn color="red" @click="toggleSkillModal">Cancel</v-btn>
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
