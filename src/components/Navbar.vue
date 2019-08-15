<template>
  <nav>
    <v-app-bar app flat>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Orga</span>
        <span>nizer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey">
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(link, index) in links" :key="index" @click router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="avatar-1.png" alt />
          </v-avatar>
          <p class="white--text subheading mt-1">{{ profile.name }}</p>
        </v-flex>
        <v-flex class="mt-3">
          <Popup />
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index" @click router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
import Popup from "./Popup";
import { fb, db } from "../firebase";
export default {
  components: { Popup },
  data() {
    return {
      profile: {
        name: null
      },
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/home" },
        { icon: "folder", text: "My projects", route: "/projects" },
        {
          icon: "done",
          text: "Completed projects",
          route: "/completed"
        },
        {
          icon: "clear",
          text: "Expired projects",
          route: "/expired"
        },
        { icon: "group", text: "Team", route: "/team" },
        { icon: "person", text: "Profile", route: "/profile" }
      ]
    };
  },

  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  },
  methods: {
    logout: function() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        })
        .then(() => {
          Toast.fire({
            type: "success",
            title: "You are now logged out."
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
