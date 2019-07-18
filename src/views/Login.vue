<template>
  <div class="login">
    <v-container class="my-3">
      <v-layout justify-center row class="mb-3">
        <v-flex s12 md4>
          <v-card class="pa-5">
            <h3>Sign In</h3>
            <v-form>
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field
                label="Password"
                @keyup.enter="login"
                v-model="password"
                type="password"
              ></v-text-field>
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
import { fb } from "../firebase";
export default {
  name: "login",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("home");
        })
        .then(() => {
          Toast.fire({
            type: "success",
            title: "You are now logged in."
          });
        })
        .catch(error => {
          Toast.fire({
            type: "error",
            title: error + ""
          });
        });
    }
  }
};
</script>
<style>
</style>