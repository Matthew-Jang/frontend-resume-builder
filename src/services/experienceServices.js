import apiClient from "./services.js";

export default {
  // Add a new experience for a specific user
  addExperience(userId, data) {
    console.log("add experience services");
    return apiClient.post(`/experiences/${userId}`, data);
  },

  // Get all experiences for a specific user
  getExperiencesForUser(userId) {
    console.log("get experiences for user id: " + userId);
    return apiClient.get(`/experiences/${userId}`);
  },
  
  // Update an experience by ID 
  updateExperience(userId, experienceId, data) {
    return apiClient.put(`/experiences/${userId}/${experienceId}`, data);
  },

  // Delete an experience by ID
  deleteExperience(userId, experienceId) {
    return apiClient.delete(`/experiences/${userId}/${experienceId}`);
  },
    
};



