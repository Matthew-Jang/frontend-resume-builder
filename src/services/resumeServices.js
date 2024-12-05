import apiClient from "./services.js";

export default {
  // Create a new resume
  createResume(data) {
    console.log("POST request to: /resume-t4/api/resumes", data);
    return apiClient.post("/resumes", data);
  },

  // Get all resumes
  getAllResumes() {
    console.log("GET request to: /resume-t4/api/resumes");
    return apiClient.get("/resumes");
  },

  // Get all resumes for a specific user
  getResumesByUser(userId) {
    console.log(`GET request to: /resume-t4/api/resumes/users/${userId}`);
    return apiClient.get(`/resumes/users/${userId}`);
  },

  // Get a specific resume by ID
  getResumeById(resumeId) {
    console.log(`GET request to: /resume-t4/api/resumes/${resumeId}`);
    return apiClient.get(`/resumes/${resumeId}`);
  },

  // Update a specific resume by ID
  updateResume(resumeId, data) {
    console.log(`PUT request to: /resume-t4/api/resumes/${resumeId}`, data);
    return apiClient.put(`/resumes/${resumeId}`, data);
  },

  // Delete a specific resume by ID
  deleteResume(resumeId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}`);
    return apiClient.delete(`/resumes/${resumeId}`);
  },

  // Add an experience to a resume
  addExperienceToResume(resumeId, experienceId) {
    console.log(`POST request to: /resume-t4/api/resumes/${resumeId}/experiences`, { experienceId });
    return apiClient.post(`/resumes/${resumeId}/experiences`, { experienceId });
  },

  // Remove an experience from a resume
  removeExperienceFromResume(resumeId, experienceId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}/experiences/${experienceId}`);
    return apiClient.delete(`/resumes/${resumeId}/experiences/${experienceId}`);
  },

  // Add an education to a resume
  addEducationToResume(resumeId, educationId) {
    console.log(`POST request to: /resume-t4/api/resumes/${resumeId}/educations`, { educationId });
    return apiClient.post(`/resumes/${resumeId}/educations`, { educationId });
  },

  // Remove an education from a resume
  removeEducationFromResume(resumeId, educationId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}/educations/${educationId}`);
    return apiClient.delete(`/resumes/${resumeId}/educations/${educationId}`);
  },

  // Add a certification to a resume
  addCertificationToResume(resumeId, certificationId) {
    console.log(`POST request to: /resume-t4/api/resumes/${resumeId}/certifications`, { certificationId });
    return apiClient.post(`/resumes/${resumeId}/certifications`, { certificationId });
  },

  // Remove a certification from a resume
  removeCertificationFromResume(resumeId, certificationId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}/certifications/${certificationId}`);
    return apiClient.delete(`/resumes/${resumeId}/certifications/${certificationId}`);
  },

  // Add a professional info to a resume
  addProfessionalInfoToResume(resumeId, professionalInfoId) {
    console.log(`POST request to: /resume-t4/api/resumes/${resumeId}/professional_infos`, { professionalInfoId });
    return apiClient.post(`/resumes/${resumeId}/professional_infos`, { professionalInfoId });
  },

  // Remove a professional info from a resume
  removeProfessionalInfoFromResume(resumeId, professionalInfoId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}/professional_infos/${professionalInfoId}`);
    return apiClient.delete(`/resumes/${resumeId}/professional_infos/${professionalInfoId}`);
  },

  // Add a project to a resume
  addProjectToResume(resumeId, projectId) {
    console.log(`POST request to: /resume-t4/api/resumes/${resumeId}/projects`, { projectId });
    return apiClient.post(`/resumes/${resumeId}/projects`, { projectId });
  },

  // Remove a project from a resume
  removeProjectFromResume(resumeId, projectId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}/projects/${projectId}`);
    return apiClient.delete(`/resumes/${resumeId}/projects/${projectId}`);
  },

  // Add a skill to a resume
  addSkillToResume(resumeId, skillId) {
    console.log(`POST request to: /resume-t4/api/resumes/${resumeId}/skills`, { skillId });
    return apiClient.post(`/resumes/${resumeId}/skills`, { skillId });
  },

  // Remove a skill from a resume
  removeSkillFromResume(resumeId, skillId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}/skills/${skillId}`);
    return apiClient.delete(`/resumes/${resumeId}/skills/${skillId}`);
  },

  // Add a contact info to a resume
  addContactInfoToResume(resumeId, contactInfoId) {
    console.log(`POST request to: /resume-t4/api/resumes/${resumeId}/contact_infos`, { contactInfoId });
    return apiClient.post(`/resumes/${resumeId}/contact_infos`, { contactInfoId });
  },

  // Remove a contact info from a resume
  removeContactInfoFromResume(resumeId, contactInfoId) {
    console.log(`DELETE request to: /resume-t4/api/resumes/${resumeId}/contact_infos/${contactInfoId}`);
    return apiClient.delete(`/resumes/${resumeId}/contact_infos/${contactInfoId}`);
  },
};
