import apiClient from "./services.js";

export default {
  // Add a new skill for a specific user
  addSkill(userId, data) {
    console.log(`POST request to: /resume-t4/api/${userId}/skills`, data);
    return apiClient.post(`/${userId}/skills`, data);
  },

  // Get all skills for a specific user
  getSkillsForUser(userId) {
    return apiClient.get(`/${userId}/skills`);
  },
  
  // Delete a skill by ID
  deleteSkill(userId, skillId) {
    return apiClient.delete(`/${userId}/skills/${skillId}`);
  },
    
  // Update a skill by ID 
  updateSkill(userId, skillId, data) {
    return apiClient.put(`/${userId}/skills/${skillId}`, data);
  },
};



