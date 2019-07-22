<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-card>
        <v-list two-line>
          <template v-for="(project, index) in myProjects">
            <v-list-tile :key="index" avatar ripple @click :class="`project ${project.status}`">
              <v-list-tile-content>
                <v-list-tile-title>{{ project.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">Doing: {{ project.contributors }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ project.content }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <EditProject />
                <v-icon>delete</v-icon>
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
import EditProject from "../components/EditProject";
export default {
  components: { EditProject },
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

.project.done {
  border-left: 4px solid #32cd32;
}
.project.ongoing {
  border-left: 4px solid #3cd1c2;
}
.project.to-do {
  border-left: 4px solid #ffaa2c;
}
.project.urgent {
  border-left: 4px solid tomato;
}
.v-list__tile__action--stack {
  flex-direction: row;
}
</style>