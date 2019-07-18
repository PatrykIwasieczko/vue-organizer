<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-flex xs12>
          <v-tooltip top>
            <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">Sort by project name</span>
            </v-btn>
            <span>Sort projects by project name</span>
          </v-tooltip>

          <v-tooltip top>
            <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
              <v-icon left small>person</v-icon>
              <span class="caption text-lowercase">Sort by person name</span>
            </v-btn>
            <span>Sort projects by person name</span>
          </v-tooltip>

          <v-tooltip top>
            <v-btn small flat color="grey" @click="sortByDate('due')" slot="activator">
              <v-icon left small>date_range</v-icon>
              <span class="caption text-lowercase">Sort by due date</span>
            </v-btn>
            <span>Sort projects by due date</span>
          </v-tooltip>
        </v-flex>
        <v-flex md3 xs12>
          <v-text-field prepend-icon="search" v-model="search" label="Search projects"></v-text-field>
        </v-flex>
      </v-layout>

      <v-card flat v-for="project in foundProjects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <router-link v-bind:to="'/project/' + project.id">{{ project.title }}</router-link>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due date</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip
                small
                :class="`${project.status} white--text caption my-2`"
              >{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      projects: [],
      search: ""
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] - b[prop] ? -1 : 1));
    },
    sortByDate(prop) {
      this.projects.sort((a, b) =>
        Date.parse(a[prop]) < Date.parse(b[prop]) ? -1 : 1
      );
    }
  },

  computed: {
    //filteredProjects() {
    // return this.projects.filter(project => {
    //return project.status !== "done";
    //});
    //},
    foundProjects() {
      return this.projects
        .filter(project => {
          return project.status !== "done";
        })
        .filter(project => {
          return project.title.match(this.search);
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

<style>
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
.v-chip.done {
  background: #32cd32;
}
.v-chip.ongoing {
  background: #3cd1c2;
}
.v-chip.to-do {
  background: #ffaa2c;
}
.v-chip.urgent {
  background: #f83e70;
}
</style>
