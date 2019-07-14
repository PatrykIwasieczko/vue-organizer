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
      <v-layout ustify-center row>
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
                <v-card-text>Contents for Item 1 go here</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>Contents for Item 2 go here</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>Contents for Item 3 go here</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {}
};
</script>
