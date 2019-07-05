<template>
  <div class="login">
    <v-container class="my-3">
      <v-layout justify-center row class="mb-3">
        <v-flex s12 md4>
          <v-card class="pa-5">
            <h3>Sign In</h3>
            <v-form>
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field label="Password" v-model="password"></v-text-field>
            </v-form>
            <v-btn flat class="success mx-0 my-4" @click="login">Login</v-btn>
            <p>
              You don't have an account? You can
              <router-link to="/signup">create one</router-link>
            </p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("home");
            alert("Well done! You are now logged in");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>
<style>
</style>