import apiClient from "./services.js";

export default {
  // Update an experience by ID 
  updateExperience(userId, experienceId, data) {
    return apiClient.put(`/${userId}/experiences/${experienceId}`, data);
  },
};



