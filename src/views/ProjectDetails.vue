<template>
  <div class="projects">
    <h1 class="subheading grey--text">Project details</h1>
    <v-container class="my-5">
      <v-card>
        <v-card-text>
          <div class="font-weight-bold mb-3">{{ project.title }}</div>
          <div>Created by: {{ project.person }}</div>
          <div>Status: {{ project.status }}</div>
          <div>Due date: {{ project.due }}</div>
          <div class="mt-3">{{ project.content }}</div>
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
