import apiClient from "./services.js";

export default {
  // Add a new certification for a specific user
  addCertification(userId, data) {
    console.log("add certification service");
    return apiClient.post(`/certifications/${userId}`, data);
  },

  // Get all certifications for a specific user
  getCertificationsForUser(userId) {
    return apiClient.get(`/certifications/${userId}`);
  },

  // Update a certification by ID
  updateCertification(userId, certificationId, data) {
    return apiClient.put(`/certifications/${userId}/${certificationId}`, data);
  },

  // Delete a certification by ID
  deleteCertification(userId, certificationId) {
    return apiClient.delete(`/certifications/${userId}/${certificationId}`);
  },
};
