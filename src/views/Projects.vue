<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-card>
        <v-list two-line>
          <template v-for="(project, index) in myProjects">
            <v-list-item :key="index" ripple @click :class="`project ${project.status}`">
              <v-list-item-content>
                <v-list-item-title>{{ project.title }}</v-list-item-title>
                <v-list-item-subtitle class="text--primary">Due date: {{ project.due }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ project.content }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <router-link v-bind:to="'/editProject/' + project.id">
                  <v-icon>edit</v-icon>
                </router-link>

                <v-icon @click="deleteProject(project)">delete</v-icon>
              </v-list-item-action>
            </v-list-item>
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
  methods: {
    deleteProject(doc) {
      Swal.fire({
        title: "Are you sure you want to delete this project?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            this.$firestore.projects.doc(doc.id).delete();
            Toast.fire({
              type: "success",
              title: "Project deleted  successfully"
            });
          }
        })
        .catch(error => {
          Toast.fire({
            type: "error",
            title: error + ""
          });
        });
    }
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid),
      projects: db.collection("projects")
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === this.profile.name;
      });
    }
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
.v-list__item__action--stack {
  flex-direction: row;
}
</style>