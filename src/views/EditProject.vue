<template>
  <div class="projects">
    <h1 class="subheading grey--text">Edit project</h1>
    <v-container class="my-5">
      <v-card>
        <v-card-text>
          <v-text-field v-model="project.title" prepend-icon="folder" label="Project title"></v-text-field>

          <v-select
            :items="statuses"
            required
            v-model="project.status"
            prepend-icon="notifications"
            label="Status"
          ></v-select>
          <v-text-field v-model="project.content" prepend-icon="edit" label="Project title"></v-text-field>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formattedDate"
                v-on="on"
                clearable
                label="Due date"
                prepend-icon="date_range"
                :rules="inputRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="project.due"></v-date-picker>
          </v-menu>
          <v-btn
            text
            class="success mx-0 mt-3"
            @click="updateProject"
            :loading="loading"
          >Edit project</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db, fb } from "../firebase";
import format from "date-fns/format";
export default {
  data() {
    return {
      id: this.$route.params.id,
      statuses: ["to-do", "urgent", "ongoing", "done"],
      project: {
        content: null,
        due: null,
        status: null,
        title: null
      },
      profile: {
        name: null
      },
      inputRules: [
        v => !!v || "This field is required",
        v => v.length >= 5 || "Minimum length is 5 characters"
      ],
      loading: false
    };
  },

  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid),
      project: db.collection("projects").doc(this.id)
    };
  },
  methods: {
    updateProject() {
      this.$firestore.project.update(this.project).then(() => {
        this.loading = false;
        Toast.fire({
          type: "success",
          title: "Project updated"
        });
      });
    }
  },
  computed: {
    formattedDate() {
      return this.project.due ? format(this.project.due, "YYYY-MM-DD") : "";
    }
  }
};
</script>
