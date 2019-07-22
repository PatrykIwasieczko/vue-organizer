<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-card>
        <v-list two-line>
          <template v-for="(project, index) in myProjects">
            <v-list-tile :key="index" avatar ripple @click>
              <v-list-tile-content>
                <v-list-tile-title>{{ project.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">Doing: {{ project.contributors }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ project.content }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ project.due }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">edit</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < projects.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db, fb } from "../firebase";
export default {
  data() {
    return {
      projects: [],
      profile: {
        name: null
      }
    };
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === this.profile.name;
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

<style scoped>
.v-list {
  padding: 0;
}
</style>

