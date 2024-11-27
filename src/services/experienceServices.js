import apiClient from "./services.js";

export default {
  // Add a new experience for a specific user
  addExperience(userId, data) {
    console.log(`POST request to: /resume-t4/api/${userId}/experiences`, data);

    return apiClient.post(`/${userId}/experiences`, data);
  }
};



