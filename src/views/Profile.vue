<template>
  <div class="profile">
    <h1 class="subheading grey--text">Profile</h1>
    <v-container fluid class="my-5">
      <v-layout justify-center row wrap class="mb-3">
        <v-flex xs12 sm5 md3>
          <h3>Profile Settings</h3>
          <p>Change your profile settings here</p>
        </v-flex>
        <v-flex xs12 sm5 md3>
          <img src="/images/profile.svg" width="300" />
        </v-flex>
      </v-layout>
      <v-layout justify-center row>
        <v-flex>
          <v-tabs centered icons-and-text>
            <v-tabs-slider color="indigo"></v-tabs-slider>

            <v-tab ripple>
              Profile
              <v-icon>person</v-icon>
            </v-tab>

            <v-tab ripple>
              Contact
              <v-icon>phone</v-icon>
            </v-tab>

            <v-tab ripple>
              Settings
              <v-icon>settings</v-icon>
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-layout justify-space-around row wrap class="pt-5">
                  <v-flex xs12 md3>
                    <v-text-field v-model="profile.name" label="Name"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-file-input label="Profile picture" prepend-icon="camera_alt"></v-file-input>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-btn text class="success">Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-layout justify-space-around row wrap class="pt-5">
                  <v-flex xs12 md3>
                    <v-text-field v-model="profile.phone" label="Phone number"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-text-field v-model="profile.email" label="Contact email"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-btn text class="success" @click="updateProfile">Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-layout justify-center row wrap class="pt-5">
                  <v-flex xs6 md2>
                    <v-btn class="info" @click="resetPassword">Reset password</v-btn>
                  </v-flex>
                  <v-flex xs6 md2>
                    <v-btn class="error" @click="deleteProfile">Delete account</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  data() {
    return {
      profile: {
        name: null,
        phone: null,
        email: null
      }
    };
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  },
  methods: {
    updateProfile() {
      this.$firestore.profile.update(this.profile);
      Toast.fire({
        type: "success",
        title: "Profile updated"
      });
    },
    resetPassword() {
      const auth = fb.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          Toast.fire({
            type: "success",
            title: "Email sent"
          });
        })
        .catch(error => {
          Toast.fire({
            type: "error",
            title: error + ""
          });
        });
    },
    deleteProfile() {
      const user = fb.auth().currentUser;

      Swal.fire({
        title: "Are you sure you want to delete your account?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            user
              .delete()
              .then(() => {
                this.$router.replace("login");
              })
              .then(() => {
                Toast.fire({
                  type: "success",
                  title: "Account successfully deleted."
                });
              });
          }
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
