import apiClient from "./services.js";

export default {
  // Add a new reference for a specific user
  addReference(userId, data) {
    console.log("add reference services");
    return apiClient.post(`/references/${userId}`, data);
  },

  // Get all references for a specific user
  getReferencesForUser(userId) {
    console.log("get experiences for user id: " + userId);
    return apiClient.get(`/references/${userId}`);
  },
  
  // Update an reference by ID 
  updateReference(userId, referenceId, data) {
    return apiClient.put(`/references/${userId}/${referenceId}`, data);
  },

  // Delete an reference by ID
  deleteReference(userId, referenceId) {
    return apiClient.delete(`/references/${userId}/${referenceId}`);
  },
    
};



