import apiClient from "./services.js";

export default {
  // Add a new professional info for a specific user
  addProfessionalInfo(userId, data) {
    console.log("add professional info services");
    return apiClient.post(`/professional-info/${userId}`, data);
  },

  // Get all professional info for a specific user
  getProfessionalInfoForUser(userId) {
    console.log("get professional info for user id: " + userId);
    return apiClient.get(`/professional-info/${userId}`);
  },
  
  // Update professional info by ID
  updateProfessionalInfo(userId, professionalInfoId, data) {
    console.log(`update professional info with ID: ${professionalInfoId}`);
    return apiClient.put(`/professional-info/${userId}/${professionalInfoId}`, data);
  },

  // Delete professional info by ID
  deleteProfessionalInfo(userId, professionalInfoId) {
    console.log(`delete professional info with ID: ${professionalInfoId}`);
    return apiClient.delete(`/professional-info/${userId}/${professionalInfoId}`);
  },
};
