<template>
  <div class="projects">
    <h1 class="subheading grey--text">Project details</h1>
    <v-container class="my-5">
      <div class="project"></div>
      <div class="header">{{ project.title }}</div>
      <v-card>
        <v-card-text class="grey--text">
          <div class="font-weight-bold">Due date: {{ project.due }}</div>
          <div>{{ project.content }}</div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      id: this.$route.params.id,
      project: []
    };
  },

  firestore() {
    return {
      project: db.collection("projects").doc(this.id)
    };
  }
};
</script>
