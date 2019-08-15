<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="success">Add new project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Add a new project</h2>
      </v-card-title>
      <v-form class="px-3" ref="form">
        <v-text-field
          label="Title"
          v-model="project.title"
          prepend-icon="folder"
          :rules="inputRules"
        ></v-text-field>
        <v-textarea
          label="Information"
          v-model="project.content"
          prepend-icon="edit"
          :rules="inputRules"
        ></v-textarea>
        <v-select
          :items="status"
          required
          v-model="project.chosenStatus"
          prepend-icon="notifications"
          label="Status"
        ></v-select>

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

        <v-spacer></v-spacer>

        <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import { fb, db } from "../firebase";
export default {
  data() {
    return {
      profile: {
        name: null
      },
      project: {
        chosenStatus: "",
        title: "",
        content: "",
        due: "",
        createdAt: Date.now()
      },
      status: ["to-do", "urgent", "ongoing", "done"],
      inputRules: [
        v => !!v || "This field is required",
        v => v.length >= 5 || "Minimum length is 5 characters"
      ],
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          title: this.project.title,
          content: this.project.content,
          due: format(this.project.due, "YYYY-MM-DD"),
          person: this.profile.name,
          status: this.project.chosenStatus,
          createdAt: this.project.createdAt,
          contributors: ""
        };
        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            Toast.fire({
              type: "success",
              title: "Project added."
            });
          })
          .then(() => this.reset());
      }
    },
    reset() {
      this.project = {
        chosenStatus: "",
        title: "",
        content: "",
        due: "",
        createdAt: ""
      };
    }
  },
  computed: {
    formattedDate() {
      return this.project.due ? format(this.project.due, "YYYY-MM-DD") : "";
    }
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  }
};
</script>
