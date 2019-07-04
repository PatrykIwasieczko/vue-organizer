<template>
  <div class="signup">
    <v-container class="my-3">
      <v-layout justify-center row class="mb-3">
        <v-flex s12 md4>
          <v-card class="pa-5">
            <h3>Create a new account</h3>
            <v-form>
              <v-text-field label="Email"></v-text-field>
              <v-text-field label="Password"></v-text-field>
            </v-form>
            <v-btn flat class="success mx-0 my-4">Sign Up</v-btn>
            <v-spacer></v-spacer>
            <span>If you already have an account - log in.</span>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "signup",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
</style>