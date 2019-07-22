<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-icon slot="activator">edit</v-icon>
    <v-card>
      <v-card-title>
        <h2>Add a new project</h2>
      </v-card-title>
      <v-form class="px-3" ref="form">
        <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
        <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
        <v-select
          :items="status"
          v-model="chosenStatus"
          prepend-icon="notifications"
          label="Status"
        ></v-select>

        <v-menu>
          <v-text-field
            :value="formattedDate"
            slot="activator"
            clearable
            label="Due date"
            prepend-icon="date_range"
            :rules="inputRules"
          ></v-text-field>
          <v-date-picker v-model="due"></v-date-picker>
        </v-menu>

        <v-spacer></v-spacer>

        <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
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
      status: ["to-do", "urgent", "ongoing", "done"],
      chosenStatus: "",
      title: "",
      content: "",
      due: null,
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
          title: this.title,
          content: this.content,
          due: format(this.due, "YYYY-MM-DD"),
          person: this.profile.name,
          status: this.chosenStatus,
          contributors: [this.profile.name]
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
          });
      }
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(this.due, "YYYY-MM-DD") : "";
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
