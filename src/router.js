import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

import Welcome from "./views/Welcome.vue";
import ProfileStep from "./views/ProfileStep.vue";
import HomePage from "./views/HomePage.vue";
import LoginSignup from "./views/LoginSignup.vue";
import Experiences from "./views/Experiences.vue";
import AddExperience from "./views/AddExperience.vue";
import Educations from "./views/Educations.vue";
import AddEducation from "./views/AddEducation.vue";
import Projects from "./views/Projects.vue";
import Certifications from "./views/Certifications.vue";
import Skills from "./views/Skills.vue";
import AddSkill from "./views/AddSkill.vue";

import ProfessionalInfos from "./views/ProfessionalInfos.vue";
import ContactInfos from "./views/ContactInfos.vue";References
import References from "./views/References.vue";
import AddReference from "./views/AddReference.vue";
import Chatbox from "./views/ChatBox.vue";

import Pdfs from "./views/Pdfs.vue";

import Resumes from "./views/Resumes.vue";


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
      path: '/professionalInfos',
      name: 'professionalInfos',
      component: ProfessionalInfos,
    },
    {
      path: '/certifications',
      name: 'certifications',
      component: Certifications,
    },

    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },


    {
      path: '/references',
      name: 'references',
      component: References,
    },

    {
      path: '/addReference',
      name: 'addReference',
      component: AddReference,
    },

    {
      path: '/chatbox',
      name: 'chatbox',
      component: Chatbox,
    },
    {
      path: '/resumes',
      name: 'resumes',
      component: Resumes,
    },
    {
      path: '/pdfs',
      name: 'pdfs',
      component: Pdfs,

    },
  ],
});

export default router;
