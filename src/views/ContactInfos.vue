<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils";
import ContactInfoServices from "../services/contactInfoServices";

const user = Utils.getStore("user");
const router = useRouter();
const contacts = ref([]);

const isAdd = ref(false);
const showModal = ref(false);
const showContactModal = ref(false); // For ContactModal
const selectedContact = ref({});
const newContact = ref({
  full_name: "",
  email: "",
  phone_number: "",
  address: "",
});

const contactToDeleteID = ref(null);
const tempEdits = ref({});

const headers = [
  { text: "Full Name", value: "full_name", sortable: true, width: "25%" },
  { text: "Email", value: "email", sortable: true, width: "25%" },
  { text: "Phone Number", value: "phone_number", sortable: true, width: "20%" },
  { text: "Address", value: "address", sortable: true, width: "20%" },
  { text: "Actions", value: "actions", sortable: false, width: "10%" },
];

const toggleContactModal = () => {
  showContactModal.value = !showContactModal.value;
};

const addContactModal = () => {
  isAdd.value = true;
  toggleContactModal();
  selectedContact.value = { ...newContact.value };
};

const editContact = (item) => {
  toggleContactModal();
  selectedContact.value = item;
};

const addContact = () => {
  const data = {
    full_name: selectedContact.value.full_name,
    email: selectedContact.value.email,
    phone_number: selectedContact.value.phone_number,
    address: selectedContact.value.address,
  };
  ContactInfoServices.addContact(user.userId, data)
    .then(() => {
      fetchContacts();
    })
    .catch((e) => {
      console.error("Error adding contact:", e);
    });
  showContactModal.value = false;
  isAdd.value = false;
};

const confirmDeleteContact = async () => {
  try {
    await ContactInfoServices.deleteContact(user.userId, contactToDeleteID.value);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
  showModal.value = false;
  fetchContacts();
};

const fetchContacts = async () => {
  try {
    const response = await ContactInfoServices.getContactsForUser(user.userId);
    contacts.value = response.data.map((item) => ({
      ...item,
      isEditing: false,
    }));
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

const saveContactModal = () => {
  const data = {
    full_name: selectedContact.value.full_name,
    email: selectedContact.value.email,
    phone_number: selectedContact.value.phone_number,
    address: selectedContact.value.address,
  };
  ContactInfoServices.updateContact(user.userId, selectedContact.value.id, data)
    .then(() => {
      fetchContacts();
    })
    .catch((e) => {
      console.error("Error updating contact:", e);
    });
  toggleContactModal();
};

const updateContact = (item) => {
  const data = {
    full_name: tempEdits.value[item.id].full_name,
    email: tempEdits.value[item.id].email,
    phone_number: tempEdits.value[item.id].phone_number,
    address: tempEdits.value[item.id].address,
  };
  ContactInfoServices.updateContact(user.userId, item.id, data)
    .then(() => {
      fetchContacts();
    })
    .catch((e) => {
      console.error("Error updating contact:", e);
    });
};

const toggleModal = (inputContactToDeleteID) => {
  contactToDeleteID.value = inputContactToDeleteID;
  showModal.value = !showModal.value;
};

const enableEdit = (item) => {
  item.isEditing = true;
  tempEdits.value[item.id] = { ...item };
};

const cancelEdit = (item) => {
  item.isEditing = false;
};

onMounted(fetchContacts);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Hello! Add or Edit Contact Info!</v-toolbar-title>
    </v-toolbar>
    <br />
    <v-btn color="green" class="mr-4" @click="addContactModal"> Add </v-btn>
    <v-data-table :headers="headers" :items="contacts" :items-per-page="10" class="elevation-1" style="width: 100%">
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers" :key="header.value">
            <div v-if="header.value !== 'actions'">
              <div v-if="item.isEditing">
                <v-text-field v-model="tempEdits[item.id][header.value]" dense hide-details
                  @keyup.enter="updateContact(item)"></v-text-field>
              </div>
              <div v-else @click="enableEdit(item)">
                {{ item[header.value] }}
              </div>
            </div>
            <div v-else>
              <div class="button-group">
                <template v-if="item.isEditing">
                  <v-btn color="green" @click="updateContact(item)">Save</v-btn>
                  <v-btn color="red" @click="cancelEdit(item)">Cancel</v-btn>
                </template>
                <template v-else>
                  <v-btn color="green" @click="editContact(item)">Edit</v-btn>
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
        <v-card-text>Are you sure you want to delete this contact?</v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="showModal = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteContact()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal for Add/Edit -->
    <v-dialog v-model="showContactModal" max-width="400">
      <v-card>
        <v-card-title v-if="isAdd" class="headline">Add Contact!</v-card-title>
        <v-card-title v-else class="headline">Edit Contact!</v-card-title>
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field v-model="selectedContact.full_name" label="Full Name" required 
          @keyup.enter="isAdd ? addContact() : saveContactModal()"></v-text-field>
          <v-text-field v-model="selectedContact.email" label="Email" required
          @keyup.enter="isAdd ? addContact() : saveContactModal()"></v-text-field>
          <v-text-field v-model="selectedContact.phone_number" label="Phone Number" required
          @keyup.enter="isAdd ? addContact() : saveContactModal()"></v-text-field>
          <v-text-field v-model="selectedContact.address" label="Address" required
          @keyup.enter="isAdd ? addContact() : saveContactModal()"></v-text-field>
          <v-card-actions>
            <v-btn v-if="isAdd" color="green" @click="addContact">Save</v-btn>
            <v-btn v-else color="green" @click="saveContactModal">Save</v-btn>
            <v-btn color="red" @click="toggleContactModal">Cancel</v-btn>
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
