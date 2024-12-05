<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import Utils from "../config/utils";
import SkillServices from "../services/skillServices";

const user = Utils.getStore("user");
const router = useRouter();
const skills = ref([]);
const showModal = ref(false);
const skillToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  //   { text: "ID", value: "id", width: "150px" },
  { text: "Skill", value: "skillInfo", width: "15%" },
];

const confirmDeleteSkill = async () => {
  try {
    console.log("confirm delete: ", skillToDeleteID);


    console.log("course: ", skillToDeleteID.value);
    await SkillServices.deleteSkill(
      getUserID(),
      skillToDeleteID.value
    );
  } catch (error) {
    console.error("Error deleting skill:", error);
  }
  showModal.value = false;
  fetchExperiences();
};

const getUserID = () => {
  user.value = null;
  user.value = Utils.getStore("user");
  //console.log("user " + JSON.stringify(user));
  return user.value.userId;
};

const fetchSkills = async () => {
  try {
    console.log("fetching skills for user: " + getUserID());
    
    const response = await SkillServices.getSkillsForUser(
      getUserID()
    );
    skills.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));

    console.log(response.data);
    console.log(JSON.stringify(skills.value));

  } catch (error) {
    console.error("Error fetching skills:", error);
  }
}

const updateSkill = (item) => {
  const data = {
    skillInfo: tempEdits.value[item.id].skillInfo,
  };
  console.log(data);


  SkillServices.updateSkill(user.userId, item.id, data)
    .then((response) => {
      console.log("update " + response.data);
      fetchSkills();
    })
    .catch((e) => {
      //message.value = e.response.data.message;
    });
};


const toggleModal = (inputSkillToDeleteID) => {
  skillToDeleteID.value = inputSkillToDeleteID;
  showModal.value = !showModal.value;
};


const addSkillNav = () => {
  router.push({ name: "addSkill" });
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


onMounted(fetchSkills);
</script>


<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Hello! Add or Edit Skills!</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addSkillNav"> Add </v-btn>
    <v-data-table
      :headers="headers"
      :items="skills"
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
          Are you sure you want to delete this skill?
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



