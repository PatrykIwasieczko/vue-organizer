<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-layout justify-center row wrap class="mb-3">
        <v-flex xs12 sm5 md6 offset-md1>
          <h1>Completed projects</h1>
        </v-flex>
        <v-flex xs12 sm5 md5>
          <img src="/images/completed.svg" width="300" />
        </v-flex>
        <v-expansion-panels>
          <v-expansion-panel v-for="(project, index) in myProjects" :key="index">
            <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
            <v-expansion-panel-content class="grey--text">
              <div class="font-weight-bold">Due date: {{ project.due }}</div>
              <div>{{ project.content }}</div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      projects: []
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.status === "done";
      });
    }
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>
