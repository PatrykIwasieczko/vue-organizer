<template>
  <div class="projects">
    <h1 class="subheading grey--text">Project details</h1>
    <v-container class="my-5">
      <v-card>
        <v-card-text>
          <h2 class="font-weight-bold mb-3">{{ project.title }}</h2>
          <div class="font-weight-bold">Created by: {{ project.person }}</div>
          <div>Status: {{ project.status }}</div>
          <div>Due date: {{ project.due }}</div>
          <div class="mt-3">{{ project.content }}</div>
          <div class="mt-3">Doing: {{ project.contributors }}</div>
          <v-btn dark color="blue" @click="contribute">Contribute</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db, fb } from "../firebase";
export default {
  data() {
    return {
      id: this.$route.params.id,
      project: {
        content: null,
        due: null,
        person: null,
        status: null,
        title: null,
        contributors: []
      },
      profile: {
        name: null
      }
    };
  },

  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid),
      project: db.collection("projects").doc(this.id)
    };
  },
  methods: {
    contribute() {
      this.project.contributors.indexOf(this.profile.name) === -1
        ? this.project.contributors.push(this.profile.name)
        : Toast.fire({
            type: "error",
            title: "You are already in the project"
          });
    }
  }
};
</script>
