<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Orga</span>
        <span>nizer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat color="grey" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

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
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
