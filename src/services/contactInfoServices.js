import apiClient from "./services.js";

export default {
  // Add a new contact for a specific user
  addContact(userId, data) {
    console.log("add contact services");
    return apiClient.post(`/contactInfos/${userId}`, data);
  },

  // Get all contacts for a specific user
  getContactsForUser(userId) {
    console.log("get contacts for user id: " + userId);
    return apiClient.get(`/contactInfos/${userId}`);
  },

  // Update a contact by ID
  updateContact(userId, contactId, data) {
    return apiClient.put(`/contactInfos/${userId}/${contactId}`, data);
  },

  // Delete a contact by ID
  deleteContact(userId, contactId) {
    return apiClient.delete(`/contactInfos/${userId}/${contactId}`);
  },
};
