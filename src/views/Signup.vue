<template>
  <div class="signup">
    <v-container class="my-3">
      <v-layout justify-center row class="mb-3">
        <v-flex s12 md4>
          <v-card class="pa-5">
            <h3>Create a new account</h3>
            <v-form>
              <v-text-field label="Name" v-model="firstName"></v-text-field>
              <v-text-field label="Surname" v-model="surname"></v-text-field>
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
      firstName: "",
      surname: "",
      photoURL: ""
    };
  },
  methods: {
    signup: function() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          if (this.firstName[this.firstName.length - 1] === "a") {
            this.photoURL =
              "https://firebasestorage.googleapis.com/v0/b/vue-organizer.appspot.com/o/avatar-girl.png?alt=media&token=8d96f63e-f56c-4c16-8795-9be8501456c8";
          } else {
            this.photoURL =
              "https://firebasestorage.googleapis.com/v0/b/vue-organizer.appspot.com/o/avatar-boy.png?alt=media&token=28bb6912-09c1-453a-9cc3-f7f144968778";
          }
          return db
            .collection("profiles")
            .doc(cred.user.uid)
            .set({
              name: `${this.firstName} ${this.surname}`,
              email: this.email,
              photoURL: this.photoURL
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
  },
  computed: {}
};
</script>
<style>
</style>