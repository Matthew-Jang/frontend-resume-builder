import apiClient from "./services.js";

export default {
  // Add a new education entry for a specific user
  addEducation(userId, data) {
    console.log("add education services");
    console.log("user id: " + userId + " data: " + data.major);
    
    return apiClient.post(`/educations/${userId}`, data);
  },

  // Get all educations for a specific user
  getEducationsForUser(userId) {
    console.log("get educations services");
    return apiClient.get(`/educations/${userId}`);
  },
  
  // Update an education entry by ID 
  updateEducation(userId, educationId, data) {
    console.log("update education service : " + data.major);
    return apiClient.put(`/educations/${userId}/${educationId}`, data);
  },

  // Delete an education entry by ID
  deleteEducation(userId, educationId) {
    return apiClient.delete(`/educations/${userId}/${educationId}`);
  },
};
