// ///////////////////////////////////////////////////////////////
// //lesson services
// import apiClient from "./services.js";

// export default {
//   getAllLessons(tutorialId) {
//     return apiClient.get(`/tutorials/${tutorialId}/lessons`);
//   },
//   getLesson(tutorialId, id) {
//     return apiClient.get(`/tutorials/${tutorialId}/lessons/${id}`);
//   },
//   createLesson(tutorialId, data) {
//     return apiClient.post(`/tutorials/${tutorialId}/lessons`, data);
//   },
//   updateLesson(tutorialId, id, data) {
//     return apiClient.put(`/tutorials/${tutorialId}/lessons/${id}`, data);
//   },
//   deleteLesson(tutorialId, id) {
//     return apiClient.delete(`/tutorials/${tutorialId}/lessons/${id}`);
//   },
// };
// ///////////////////////////////////////////////////////////////
// //tutorial services

// import apiClient from "./services.js";

// export default {
//   getAll() {
//     return apiClient.get("/tutorials");
//   },
//   getAllForUser(userId) {
//     return apiClient.get("/tutorials/userTut/" + userId);
//   },
//   get(id) {
//     return apiClient.get(`/tutorials/${id}`);
//   },
//   create(data) {
//     return apiClient.post("/tutorials", data);
//   },
//   update(id, data) {
//     return apiClient.put(`/tutorials/${id}`, data);
//   },
//   delete(id) {
//     return apiClient.delete(`/tutorials/${id}`);
//   },
//   deleteAll() {
//     return apiClient.delete(`/tutorials`);
//   },
//   findByTitle(title) {
//     return apiClient.get(`/tutorials?title=${title}`);
//   },
// };