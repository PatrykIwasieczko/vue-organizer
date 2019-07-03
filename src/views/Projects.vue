<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="project in myProjects" :key="project.title">
          <div slot="header">{{ project.title }}</div>
          <v-card>
            <v-card-text class="grey--text">
              <div class="font-weight-bold">Due date: {{ project.due }}</div>
              <div>{{ project.content }}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
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
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === "Patryk Iwasieczko";
      });
    }
  }
};
</script>
