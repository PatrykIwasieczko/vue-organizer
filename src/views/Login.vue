<template>
  <div class="login">
    <v-container class="my-3">
      <v-layout justify-center row class="mb-3">
        <v-flex s12 md4>
          <v-card class="pa-5">
            <h3>Sign In</h3>
            <v-form>
              <v-text-field label="Email"></v-text-field>
              <v-text-field label="Password"></v-text-field>
            </v-form>
            <v-btn flat class="success mx-0 my-4">Login</v-btn>
            <p>You don't have an account? You can create one</p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
</style>