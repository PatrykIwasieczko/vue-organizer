<template>
  <div class="signup">
    <v-container class="my-3">
      <v-layout justify-center row class="mb-3">
        <v-flex s12 md4>
          <v-card class="pa-5">
            <h3>Create a new account</h3>
            <v-form>
              <v-text-field label="Full name" v-model="name"></v-text-field>
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field
                label="Password"
                @keyup.enter="signup"
                v-model="password"
                type="password"
              ></v-text-field>
            </v-form>
            <v-btn text class="success mx-0 my-4" @click="signup">Sign Up</v-btn>
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
import { fb, db } from "../firebase";
export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      name: ""
    };
  },
  methods: {
    signup: function() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          return db
            .collection("profiles")
            .doc(cred.user.uid)
            .set({
              name: this.name,
              email: this.email
            });
        })
        .then(() => {
          this.$router.replace("home");
        })
        .then(() => {
          Toast.fire({
            type: "success",
            title: "You have successfully created an account."
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