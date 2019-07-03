<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-card flat class="pa-3">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>Create a new project</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>Patryk Iwasieczko</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due date</div>
            <div>1st Jan 2077</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div>ongoing</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>
