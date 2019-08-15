<template>
  <div class="expired">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-flex xs12 sm5 md6 offset-md1>
        <h1>Expired projects</h1>
      </v-flex>

      <v-card class="mt-5">
        <v-list two-line>
          <template v-for="(project, index) in myProjects">
            <v-list-item :key="index" ripple @click>
              <v-list-item-content>
                <v-list-item-title>{{ project.title }}</v-list-item-title>
                <v-list-item-subtitle class="text--primary">Doing: {{ project.contributors }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ project.content }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ project.due }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index + 1 < projects.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
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
        return new Date(project.due) < new Date();
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
