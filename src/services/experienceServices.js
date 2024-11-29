import apiClient from "./services.js";



export default {
  // Delete an experience by ID
  deleteExperience(userId, experienceId) {
    return apiClient.delete(`/${userId}/experiences/${experienceId}`);
  },
};



