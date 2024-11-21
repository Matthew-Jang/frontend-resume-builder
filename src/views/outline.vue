<!-- // Add Lesson.vue
<script setup>
import LessonServices from "../services/lessonServices";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(true);
const lesson = ref({
  id: null,
  title: "",
  description: "",
  published: false,
});
const message = ref("Enter data and click save");

const props = defineProps({
  tutorialId: {
    required: true,
  },
});

const saveLesson = () => {
  const data = {
    title: lesson.value.title,
    description: lesson.value.description,
    tutorialId: props.tutorialId,
  };
  LessonServices.createLesson(props.tutorialId, data)
    .then((response) => {
      lesson.value.id = response.data.id;

      router.push({ name: "view", params: { id: props.tutorialId } });
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const cancel = () => {
  router.push({ name: "view", params: { id: props.tutorialId } });
};
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Lesson Edit</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <h4>Tutorial: {{ tutorialId }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="lesson.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="lesson.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveLesson"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
///////////////////////////////////////////////////////////
//Add Tutorial.vue
<script setup>
import { ref, onMounted } from "vue";
import TutorialServices from "../services/tutorialServices";
import Utils from "../config/utils.js";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const user = Utils.getStore("user");
const tutorial = ref({
  id: null,
  title: "",
  description: "",
  published: false,
});
const message = ref("Enter data and click save");

const saveTutorial = () => {
  const data = {
    title: tutorial.value.title,
    description: tutorial.value.description,
    published: true,
    userId: user.userId,
  };
  TutorialServices.create(data)
    .then((response) => {
      tutorial.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ name: "tutorials" });
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const cancel = () => {
  router.push({ name: "tutorials" });
};

onMounted(() => {
  user.value = Utils.getStore("user");
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Tutorial Add</v-toolbar-title>
      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="tutorial.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="tutorial.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveTutorial"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel">Cancel</v-btn>
      </v-form>
    </v-container>
  </div>
</template>
/////////////////////////////////////////////////////////
//edit Lesson.vue
<script setup>
import LessonServices from "../services/lessonServices";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const lesson = ref({});
const message = ref("Enter data and click save");

const props = defineProps({
  tutorialId: {
    required: true,
  },
  lessonId: {
    required: true,
  },
});

const retrieveLesson = () => {
  LessonServices.getLesson(props.tutorialId, props.lessonId)
    .then((response) => {
      lesson.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const saveLesson = () => {
  var data = {
    title: lesson.value.title,
    description: lesson.value.description,
    tutorialId: lesson.value.tutorialId,
  };
  LessonServices.updateLesson(lesson.value.tutorialId, lesson.value.id, data)
    .then((response) => {
      lesson.value.id = response.data.id;

      router.push({
        name: "view",
        params: { id: lesson.value.tutorialId },
      });
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const cancel = () => {
  router.push({
    name: "view",
    params: { id: lesson.value.tutorialId },
  });
};

onMounted(() => {
  retrieveLesson();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Lesson Edit</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <h4>Tutorial: {{ tutorialId }} Lesson: {{ lessonId }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="lesson.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="lesson.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveLesson"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
////////////////////////////////////////////////////////////////
//edit tutorial.vue
<script setup>
import { ref, onMounted } from "vue";
import TutorialServices from "../services/tutorialServices";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const tutorial = ref({});
const message = ref("Enter data and click save");

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveTutorial = async () => {
  try {
    const response = await TutorialServices.get(props.id);
    tutorial.value = response.data;
  } catch (e) {
    message.value = e.response.data.message;
  }
};

const updateTutorial = async () => {
  const data = {
    title: tutorial.value.title,
    description: tutorial.value.description,
  };
  try {
    const response = await TutorialServices.update(props.id, data);
    tutorial.value.id = response.data.id;
    router.push({ name: "tutorials" });
  } catch (e) {
    message.value = e.response.data.message;
  }
};

const cancel = () => {
  router.push({ name: "tutorials" });
};

onMounted(() => {
  retrieveTutorial();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Tutorial Edit</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="tutorial.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="tutorial.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateTutorial()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
/////////////////////////////////////////////////////////////
//tutorialslist.vue
//<script setup>
import TutorialServices from "../services/tutorialServices";
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tutorials = ref([]);
const user = Utils.getStore("user");
const message = ref("Search, Edit or Delete Tutorials");

const editTutorial = (tutorial) => {
  router.push({ name: "edit", params: { id: tutorial.id } });
};

const viewTutorial = (tutorial) => {
  router.push({ name: "view", params: { id: tutorial.id } });
};

const deleteTutorial = (tutorial) => {
  TutorialServices.delete(tutorial.id)
    .then(() => {
      retrieveTutorials();
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const retrieveTutorials = () => {
  TutorialServices.getAllForUser(user.userId)
    .then((response) => {
      tutorials.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

retrieveTutorials();
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title
          >Hello, {{ user.fName }} {{ user.lName }}!</v-toolbar-title
        >
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title> Tutorials </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tutorials" :key="item.title">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-icon small class="mx-4" @click="editTutorial(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewTutorial(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <v-icon small class="mx-4" @click="deleteTutorial(item)">
                  mdi-trash-can
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
</template>
//////////////////////////////////////////////////
//view tutorial.vue
//
<script setup>
import TutorialServices from "../services/tutorialServices";
import LessonServices from "../services/lessonServices";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tutorial = ref({});
const lessons = ref([]);
const message = ref("Add, Edit or Delete Lessons");

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveLessons = () => {
  TutorialServices.get(props.id)
    .then((response) => {
      tutorial.value = response.data;
      LessonServices.getAllLessons(props.id)
        .then((response) => {
          lessons.value = response.data;
        })
        .catch((e) => {
          message.value = e.response.data.message;
        });
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const editTutorial = () => {
  router.push({ name: "edit", params: { id: props.id } });
};

const editLesson = (lesson) => {
  router.push({
    name: "editLesson",
    params: { tutorialId: props.id, lessonId: lesson.id },
  });
};

const addLesson = () => {
  router.push({ name: "addLesson", params: { tutorialId: props.id } });
};

const deleteLesson = (lesson) => {
  LessonServices.deleteLesson(lesson.tutorialId, lesson.id)
    .then(() => {
      retrieveLessons();
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

onMounted(() => {
  retrieveLessons();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Tutorial View</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ tutorial.title }}
          <v-btn class="mx-2" color="primary" @click="editTutorial">Edit</v-btn>
          <v-btn class="mx-2" color="success" @click="addLesson"
            >Add Lesson</v-btn
          >
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lessons" :key="item.title">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-icon small class="mx-4" @click="editLesson(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="deleteLesson(item)">
                  mdi-trash-can
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
</template> -->
