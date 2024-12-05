import apiClient from "./services.js";

export default {
  // Add a new skill for a specific user
  addSkill(userId, data) {
    console.log(`POST request to: /resume-t4/api/${userId}/skills`, data);
    return apiClient.post(`/skills/${userId}`, data);
  },

  // Get all skills for a specific user
  getSkillsForUser(userId) {
    return apiClient.get(`/skills/${userId}`);
  },
  
  // Delete a skill by ID
  deleteSkill(userId, skillId) {
    return apiClient.delete(`/skills/${userId}/${skillId}`);
  },
    
  // Update a skill by ID 
  updateSkill(userId, skillId, data) {
    return apiClient.put(`/skills/${userId}/${skillId}`, data);
  },
};



