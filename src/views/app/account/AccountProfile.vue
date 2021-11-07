<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Profile</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="6">
        <Alert
          type="error"
          fullWidth
          :message="error"
          :action="{ text: 'Retry', callback: load }"
          class="mb-2"
        />

        <v-row dense>
          <v-col cols="12" sm="6">
            <AutosaveText
              label="Display name"
              type="text"
              :value="displayName"
              autocomplete="name"
              :rules="[(v) => !!v || 'Display name is required']"
              :required="true"
              :error="displayNameError"
              @save="saveDisplayName"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              :value="$currentUser.email"
              label="Email"
              type="email"
              hint="You can change this in Login Methods"
              persistent-hint
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <p class="mb-0">
              This information can be used as default Activity Leader
              information in your Activity Intention Forms.
            </p>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <AutosaveText
              label="Birthdate"
              type="date"
              :value="birthDate"
              :error="birthDateError"
              :loading="loading"
              @save="(v) => update(v, 'birthDate', 'birthDateError')"
            />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <AutosaveText
              label="Home phone"
              type="text"
              :value="home"
              :error="homeError"
              :loading="loading"
              @save="(v) => update(v, 'home', 'homeError')"
            />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <AutosaveText
              label="Work phone"
              type="text"
              :value="work"
              :error="workError"
              :loading="loading"
              @save="(v) => update(v, 'work', 'workError')"
            />
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <AutosaveText
              label="Cell phone"
              type="text"
              :value="cell"
              :error="cellError"
              :loading="loading"
              @save="(v) => update(v, 'cell', 'cellError')"
            />
          </v-col>

          <v-col cols="12">
            <AutosaveText
              label="Address"
              type="textarea"
              :value="address"
              :error="addressError"
              :loading="loading"
              @save="(v) => update(v, 'address', 'addressError')"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Default Contact Person</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" xl="6">
            <v-row dense>
              <v-col cols="12">
                <p class="mb-0">
                  If you normally use the same contact person in your Activity
                  Intention Forms, you can set a default person here.
                </p>
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Name"
                  type="text"
                  :value="contact.name"
                  :error="contactNameError"
                  :loading="loading"
                  @save="(v) => update(v, 'contact.name', 'contactNameError')"
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Home phone"
                  type="text"
                  :value="contact.home"
                  :error="contactHomeError"
                  :loading="loading"
                  @save="(v) => update(v, 'contact.home', 'contactHomeError')"
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Work phone"
                  type="text"
                  :value="contact.work"
                  :error="contactWorkError"
                  :loading="loading"
                  @save="(v) => update(v, 'contact.work', 'contactWorkError')"
                />
              </v-col>

              <v-col cols="12" lg="4">
                <AutosaveText
                  label="Cell phone"
                  type="text"
                  :value="contact.cell"
                  :error="contactCellError"
                  :loading="loading"
                  @save="(v) => update(v, 'contact.cell', 'contactCellError')"
                />
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Address"
                  type="textarea"
                  :value="contact.address"
                  :error="contactAddressError"
                  :loading="loading"
                  @save="
                    (v) => update(v, 'contact.address', 'contactAddressError')
                  "
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Alert from "../../../components/Alert";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";

export default {
  components: { Alert, AutosaveText },
  data() {
    return {
      // Firebase auth fields
      displayName: null,
      displayNameError: null,

      // Firestore fields
      error: null,
      loading: false,

      birthDate: null,
      birthDateError: null,
      home: null,
      homeError: null,
      work: null,
      workError: null,
      cell: null,
      cellError: null,
      address: null,
      addressError: null,

      contact: {},
      contactNameError: null,
      contactHomeError: null,
      contactWorkError: null,
      contactCellError: null,
      contactAddressError: null,
    };
  },

  mounted() {
    this.load();
    this.displayName = this.$currentUser.displayName;
  },

  methods: {
    load() {
      // Display activities
      this.error = null;
      this.loading = true;

      this.$functions
        .httpsCallable("userGet")()
        .then((data) => {
          // Success
          this.loading = false;

          this.birthDate = data.data.birthDate;
          this.home = data.data.home;
          this.work = data.data.work;
          this.cell = data.data.cell;
          this.address = data.data.address;
          this.contact = data.data.contact;
        })
        .catch((error) => {
          // Error
          this.loading = false;

          this.error =
            error.message === "internal"
              ? "An error occurred when connecting to the server."
              : error.message;
        });
    },

    update(v, fieldName, errorName) {
      // Display activities
      this[errorName] = null;

      this.$functions
        .httpsCallable("userUpdate")({
          [fieldName]: v,
        })
        .then(() => {
          // Success
          const fieldPath = fieldName.split("."); // e.g. if fieldName is activityLeader.name, split into ["activityLeader", "name"]

          if (fieldPath.length == 2) {
            this[fieldPath[0]] = { ...this[fieldPath[0]], [fieldPath[1]]: v };
          } else {
            this[fieldName] = v;
          }
        })
        .catch((error) => {
          // Error
          this[errorName] = { message: error.message };
        });
    },

    saveDisplayName(newDisplayName) {
      this.$currentUser
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          this.displayName = newDisplayName;
          this.displayNameError = null;

          this.$updateUser(); // Update the global user object to match
        })
        .catch((error) => {
          this.displayNameError = error;
        });
    },
  },
};
</script>
