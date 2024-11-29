import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import ProfileStep from "./views/ProfileStep.vue";
import HomePage from "./views/HomePage.vue";
import LoginSignup from "./views/LoginSignup.vue";
import Experiences from "./views/Experiences.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home', // This defines the "home" route
      component: HomePage, 
    },
    {
      path: '/login',
      name: 'login', // This defines the "home" route
      component: LoginSignup,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileStep,
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: Experiences,
    },
    {
      path: '/addExperience',
      name: 'addExperience',
      component: AddExperience,
    },
    {
      path: '/educations',
      name: 'educations',
      component: Educations,
    },
    {
      path: '/addEducation',
      name: 'addEducation',
      component: AddEducation,
    },
    {
      path: '/contactInfos',
      name: 'contactInfos',
      component: ContactInfos,
    },
    {
      path: '/addContactInfo',
      name: 'addContactInfo',
      component: AddContactInfo,
    },
    {
      path: '/certifications',
      name: 'certifications',
      component: Certifications,
    },
    {
      path: '/addCertification',
      name: 'addCertification',
      component: AddCertification,
    },
    {
      path: '/professionalInfos',
      name: 'professionalInfos',
      component: ProfessionalInfos,
    },
    {
      path: '/addProfessionalInfo',
      name: 'addProfessionalInfo',
      component: AddProfessionalInfo,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/addProjects',
      name: 'addProjects',
      component: AddProjects,
    },
    {
      path: '/references',
      name: 'references',
      component: References,
    },
    {
      path: '/addReferences',
      name: 'addReferences',
      component: AddReferences,
    },
    {
      path: '/resumes',
      name: 'resumes',
      component: Resumes,
    },
    {
      path: '/addResumes',
      name: 'addResumes',
      component: AddResumes,
  ],
});

export default router;
