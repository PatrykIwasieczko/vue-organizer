<template>
  <div class="projects">
    <h1 class="subheading grey--text">Project details</h1>
    <v-container class="my-5">
      <v-card>
        <v-card-text>
          <v-text-field v-model="project.title" label="Project title"></v-text-field>
          <v-text-field v-model="project.status" label="Project title"></v-text-field>
          <v-text-field v-model="project.content" label="Project title"></v-text-field>
          <v-text-field v-model="project.due" label="Project title"></v-text-field>
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
        title: null
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
  methods: {}
};
</script>
