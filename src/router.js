import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

import Welcome from "./views/Welcome.vue";
import ProfileStep from "./views/ProfileStep.vue";
import HomePage from "./views/HomePage.vue";
import LoginSignup from "./views/LoginSignup.vue";

import Experiences from "./views/Experiences.vue";
import AddExperience from "./views/AddExperience.vue";

import Skills from "./views/Skills.vue";
import AddSkill from "./views/AddSkill.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'login', // This defines the "home" route
      component: Login, 
    },
    {
      path: '/',
      alias: '/home',
      name: 'home', // This defines the "home" route
      component: HomePage, 
    },
    {
      path: '/',
      alias: '/welcome',
      name: 'welcome', // This defines the "home" route
      component: Welcome, 
    },
    // {
    //   path: '/login',
    //   name: 'login', // This defines the "home" route
    //   component: LoginSignup,
    // },
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
      path: '/skills',
      name: 'skills',
      component: Skills,
    },
    {
      path: '/addSkill',
      name: 'addSkill',
      component: AddSkill,
    },
    // {
    //   path: '/educations',
    //   name: 'educations',
    //   component: Educations,
    // },
    // {
    //   path: '/addEducation',
    //   name: 'addEducation',
    //   component: AddEducation,
    // },
    // {
    //   path: '/contactInfos',
    //   name: 'contactInfos',
    //   component: ContactInfos,
    // },
    // {
    //   path: '/addContactInfo',
    //   name: 'addContactInfo',
    //   component: AddContactInfo,
    // },
    // {
    //   path: '/certifications',
    //   name: 'certifications',
    //   component: Certifications,
    // },
    // {
    //   path: '/addCertification',
    //   name: 'addCertification',
    //   component: AddCertification,
    // },
    // {
    //   path: '/professionalInfos',
    //   name: 'professionalInfos',
    //   component: ProfessionalInfos,
    // },
    // {
    //   path: '/addProfessionalInfo',
    //   name: 'addProfessionalInfo',
    //   component: AddProfessionalInfo,
    // },
    // {
    //   path: '/projects',
    //   name: 'projects',
    //   component: Projects,
    // },
    // {
    //   path: '/addProjects',
    //   name: 'addProjects',
    //   component: AddProjects,
    // },
    // {
    //   path: '/references',
    //   name: 'references',
    //   component: References,
    // },
    // {
    //   path: '/addReferences',
    //   name: 'addReferences',
    //   component: AddReferences,
    // },
    // {
    //   path: '/resumes',
    //   name: 'resumes',
    //   component: Resumes,
    // },
    // {
    //   path: '/addResumes',
    //   name: 'addResumes',
    //   component: AddResumes,
    // },
  ],
});

export default router;
