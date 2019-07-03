<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">by project name</span>
          </v-btn>
          <span>Sort projects by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">by person name</span>
          </v-btn>
          <span>Sort projects by person name</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
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
export default {
  data() {
    return {
      projects: [
        {
          title: "Design a new website",
          person: "Patryk Iwasieczko",
          due: "1st Jan 2077",
          status: "ongoing",
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus ipsam ullam amet. Maiores dolorum quam ea cumque voluptate harum nihil distinctio adipisci molestias quis alias odit, molestiae sint porro perferendis?"
        },
        {
          title: "Find a job",
          person: "Patryk Iwasieczko",
          due: "1st Jan 2020",
          status: "ongoing",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt veniam modi totam quo reiciendis. Eum odio beatae voluptates ullam. Commodi maiores vel explicabo quidem odit quam reiciendis iste, dolore deserunt!"
        },
        {
          title: "Start learning Vue",
          person: "Patryk Iwasieczko",
          due: "20th Sep 2019",
          status: "complete",
          content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, sunt excepturi. Deleniti odio et dolorum necessitatibus labore a modi. Hic tempore dicta modi? Quas dolor similique tempore at ipsa veniam."
        },
        {
          title: "Hire new members to our developers team",
          person: "John Doe",
          due: "1st Jan 2020",
          status: "to-do",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rem perferendis atque odit autem repudiandae debitis molestias quasi eaque, error nemo optio non quis explicabo accusantium distinctio consequatur, commodi amet?"
        },
        {
          title: "Fix the bugs in our app",
          person: "Brian Doe",
          due: "10th Aug 2019",
          status: "urgent",
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere molestiae et rerum sit aperiam? Laboriosam magnam saepe molestiae nemo distinctio. Necessitatibus sit consequuntur aperiam voluptas libero sapiente voluptatibus culpa consequatur."
        }
      ]
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] - b[prop] ? -1 : 1));
    }
  }
};
</script>

<style>
.project.complete {
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
.v-chip.complete {
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
