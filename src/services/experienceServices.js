import apiClient from "./services.js";

export default {
  // Add a new experience for a specific user
  addExperience(userId, data) {
    console.log(`POST request to: /${userId}/experiences`, data);
    return apiClient.post(`/${userId}/experiences`, data);
  },

  // Get all experiences for a specific user
  getExperiencesForUser(userId) {
    return apiClient.get(`/${userId}/experiences`);
  },
};



