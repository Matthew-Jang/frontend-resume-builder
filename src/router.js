import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

// import TutorialsList from "./views/TutorialsList.vue";
// import EditTutorial from "./views/EditTutorial.vue";
// import AddTutorial from "./views/AddTutorial.vue";
// import ViewTutorial from "./views/ViewTutorial.vue";
// import AddLesson from "./views/AddLesson.vue";
// import EditLesson from "./views/EditLesson.vue";
import ProfileStep from "./views/ProfileStep.vue";
import HomePage from "./views/HomePage.vue";
import LoginSignup from "./views/LoginSignup.vue";
import Experiences from "./views/Experiences.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //{
   //   path: "/",
   //   alias: "/login",
   //   name: "login",
   //   component: Login,
   // },
    // {
    //   path: "/tutorials",
    //   name: "tutorials",
    //   component: TutorialsList,
    // },
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
    // {
    //   path: "/edit/:id",
    //   name: "edit",
    //   component: EditTutorial,
    //   props: true,
    // },
    // {
    //   path: "/add",
    //   name: "add",
    //   component: AddTutorial,
    // },
    // {
    //   path: "/view/:id",
    //   name: "view",
    //   component: ViewTutorial,
    //   props: true,
    // },
    // {
    //   path: "/addLesson/:tutorialId",
    //   name: "addLesson",
    //   component: AddLesson,
    //   props: true,
    // },
    // {
    //   path: "/editLesson/:tutorialId/:lessonId",
    //   name: "editLesson",
    //   component: EditLesson,
    //   props: true,
    // },
  ],
});

export default router;
