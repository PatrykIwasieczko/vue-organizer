<template>
  <div class="signup">
    <v-container class="my-3">
      <v-layout justify-center row class="mb-3">
        <v-flex s12 md4>
          <v-card class="pa-5">
            <h3>Create a new account</h3>
            <v-form>
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field label="Password" v-model="password"></v-text-field>
            </v-form>
            <v-btn flat class="success mx-0 my-4" @click="signup">Sign Up</v-btn>
            <v-spacer></v-spacer>
            <span>
              If you already have an account -
              <router-link to="/login">log in.</router-link>
            </span>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signup: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("home");
            alert("Your account has been created");
          },
          err => {
            alert("Oops." + err.message);
          }
        );
    }
  }
};
</script>
<style>
</style>