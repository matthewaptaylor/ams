<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Activity Intention</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="6">
        <v-row dense>
          <v-col cols="12">
            <AutosaveRadio
              label="Activity category"
              :categories="categoryOptions"
              :value="category"
              :error="categoryError"
              @save="(v) => update(v, 'category', 'categoryError')"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Numbers</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" xl="6">
            <v-row dense>
              <v-col cols="6" sm="3">
                <AutosaveText
                  label="Keas"
                  type="number"
                  :value="numbers.keas ? numbers.keas.toString() : null"
                  :error="numbersKeasError"
                  @save="(v) => update(v, 'numbers.keas', 'numbersKeasError')"
                />
              </v-col>

              <v-col cols="6" sm="3">
                <AutosaveText
                  label="Cubs"
                  type="number"
                  :value="numbers.cubs ? numbers.cubs.toString() : null"
                  :error="numbersCubsError"
                  @save="(v) => update(v, 'numbers.cubs', 'numbersCubsError')"
                />
              </v-col>

              <v-col cols="6" sm="3">
                <AutosaveText
                  label="Scouts"
                  type="number"
                  :value="numbers.scouts ? numbers.scouts.toString() : null"
                  :error="numbersScoutsError"
                  @save="
                    (v) => update(v, 'numbers.scouts', 'numbersScoutsError')
                  "
                />
              </v-col>

              <v-col cols="6" sm="3">
                <AutosaveText
                  label="Venturers"
                  type="number"
                  :value="
                    numbers.venturers ? numbers.venturers.toString() : null
                  "
                  :error="numbersVenturersError"
                  @save="
                    (v) =>
                      update(v, 'numbers.venturers', 'numbersVenturersError')
                  "
                />
              </v-col>

              <v-col cols="4">
                <AutosaveText
                  label="Rovers"
                  type="number"
                  :value="numbers.rovers ? numbers.rovers.toString() : null"
                  :error="numbersRoversError"
                  @save="
                    (v) => update(v, 'numbers.rovers', 'numbersRoversError')
                  "
                />
              </v-col>

              <v-col cols="4">
                <AutosaveText
                  label="Leaders"
                  type="number"
                  :value="numbers.leaders ? numbers.leaders.toString() : null"
                  :error="numbersLeadersError"
                  @save="
                    (v) => update(v, 'numbers.leaders', 'numbersLeadersError')
                  "
                />
              </v-col>

              <v-col cols="4">
                <AutosaveText
                  label="Others"
                  type="number"
                  :value="numbers.others ? numbers.others.toString() : null"
                  :error="numbersOthersError"
                  @save="
                    (v) => update(v, 'numbers.others', 'numbersOthersError')
                  "
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center flex-wrap"
            style="column-gap: 1rem; row-gap: 0.5rem"
          >
            <h2 class="text-h5">Activity Leader</h2>

            <v-btn
              color="primary"
              :disabled="defaultActivityLeaderLoading"
              :loading="defaultActivityLeaderLoading"
              @click="loadDefault('Activity Leader')"
              v-if="activityLeaderUID === $currentUser.uid"
            >
              <v-icon left dark>{{ formatColorFillIcon }}</v-icon>
              Use my Default
            </v-btn>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" xl="6">
            <Alert
              type="error"
              fullWidth
              :message="defaultActivityLeaderError"
              :action="{
                text: 'Retry',
                callback: () => loadDefault('Activity Leader'),
              }"
              dismissable
              class="mb-2"
            />

            <v-row dense>
              <v-col cols="12" lg="8">
                <p class="mb-0" v-if="activityLeaderUID === $currentUser.uid">
                  You're the Activity Leader, so only you can change this. If
                  you'd like to set default contact information for the future,
                  you can do so in
                  <router-link :to="{ name: 'AccountProfile' }">
                    Profile</router-link
                  >.
                </p>

                <p class="mb-0" v-else>
                  Only the Activity Leader can change this. See more in
                  <router-link
                    :to="{ name: 'ActivityPeople', params: $route.params }"
                  >
                    People </router-link
                  >.
                </p>
              </v-col>

              <v-col cols="12" lg="8">
                <AutosaveText
                  label="Name"
                  type="text"
                  :value="activityLeader.name"
                  :error="activityLeaderNameError"
                  :disabled="
                    activityLeaderUID !== $currentUser.uid ||
                    defaultActivityLeaderLoading
                  "
                  @save="
                    (v) =>
                      update(
                        v,
                        'activityLeader.name',
                        'activityLeaderNameError'
                      )
                  "
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Age"
                  type="number"
                  :value="
                    activityLeader.age ? activityLeader.age.toString() : null
                  "
                  :error="activityLeaderAgeError"
                  :disabled="
                    activityLeaderUID !== $currentUser.uid ||
                    defaultActivityLeaderLoading
                  "
                  @save="
                    (v) =>
                      update(v, 'activityLeader.age', 'activityLeaderAgeError')
                  "
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Home phone"
                  type="text"
                  :value="activityLeader.home"
                  :error="activityLeaderHomeError"
                  :disabled="
                    activityLeaderUID !== $currentUser.uid ||
                    defaultActivityLeaderLoading
                  "
                  @save="
                    (v) =>
                      update(
                        v,
                        'activityLeader.home',
                        'activityLeaderHomeError'
                      )
                  "
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Work phone"
                  type="text"
                  :value="activityLeader.work"
                  :error="activityLeaderWorkError"
                  :disabled="
                    activityLeaderUID !== $currentUser.uid ||
                    defaultActivityLeaderLoading
                  "
                  @save="
                    (v) =>
                      update(
                        v,
                        'activityLeader.work',
                        'activityLeaderWorkError'
                      )
                  "
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Cell phone"
                  type="text"
                  :value="activityLeader.cell"
                  :error="activityLeaderCellError"
                  :disabled="
                    activityLeaderUID !== $currentUser.uid ||
                    defaultActivityLeaderLoading
                  "
                  @save="
                    (v) =>
                      update(
                        v,
                        'activityLeader.cell',
                        'activityLeaderCellError'
                      )
                  "
                />
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Address"
                  type="textarea"
                  :value="activityLeader.address"
                  :error="activityLeaderAddressError"
                  :disabled="
                    activityLeaderUID !== $currentUser.uid ||
                    defaultActivityLeaderLoading
                  "
                  @save="
                    (v) =>
                      update(
                        v,
                        'activityLeader.address',
                        'activityLeaderAddressError'
                      )
                  "
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center flex-wrap"
            style="column-gap: 1rem; row-gap: 0.5rem"
          >
            <h2 class="text-h5">Contact Person</h2>

            <v-btn
              color="primary"
              :disabled="defaultContactPersonLoading"
              :loading="defaultContactPersonLoading"
              @click="loadDefault('Contact Person')"
            >
              <v-icon left dark>{{ formatColorFillIcon }}</v-icon>
              Use my Default
            </v-btn>
          </v-col>
        </v-row>

        <v-row dense>
          <p class="mb-0">
            If you'd like to set default contact information for the future, you
            can do so in
            <router-link :to="{ name: 'AccountProfile' }"> Profile</router-link
            >.
          </p>

          <v-col cols="12" xl="6">
            <Alert
              type="error"
              fullWidth
              :message="defaultContactPersonError"
              :action="{
                text: 'Retry',
                callback: () => loadDefault('Contact Person'),
              }"
              dismissable
              class="mb-2"
            />

            <v-row dense>
              <v-col cols="12">
                <AutosaveText
                  label="Name"
                  type="text"
                  :value="contact.name"
                  :error="contactNameError"
                  :disabled="defaultContactPersonLoading"
                  @save="(v) => update(v, 'contact.name', 'contactNameError')"
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Home phone"
                  type="text"
                  :value="contact.home"
                  :error="contactHomeError"
                  :disabled="defaultContactPersonLoading"
                  @save="(v) => update(v, 'contact.home', 'contactHomeError')"
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Work phone"
                  type="text"
                  :value="contact.work"
                  :error="contactWorkError"
                  :disabled="defaultContactPersonLoading"
                  @save="(v) => update(v, 'contact.work', 'contactWorkError')"
                />
              </v-col>

              <v-col cols="12" lg="4">
                <AutosaveText
                  label="Cell phone"
                  type="text"
                  :value="contact.cell"
                  :error="contactCellError"
                  :disabled="defaultContactPersonLoading"
                  @save="(v) => update(v, 'contact.cell', 'contactCellError')"
                />
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Address"
                  type="textarea"
                  :value="contact.address"
                  :error="contactAddressError"
                  :disabled="defaultContactPersonLoading"
                  @save="
                    (v) => update(v, 'contact.address', 'contactAddressError')
                  "
                />
              </v-col>

              <v-col cols="12">
                <p class="mb-0">
                  The contact person is to inform the Group Leader and the
                  Police if the party has not made contact by:
                </p>
              </v-col>

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Time"
                  type="time"
                  :value="contact.time"
                  :icon="clockIcon"
                  :error="contactTimeError"
                  @save="(v) => update(v, 'contact.time', 'contactTimeError')"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Date"
                  type="date"
                  :value="contact.date"
                  :icon="calendarIcon"
                  :error="contactDateError"
                  @save="(v) => update(v, 'contact.date', 'contactDateError')"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Activity Intention Form</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12">
            <iframe
              ref="pdf"
              style="border: none; width: 100%; height: 40rem"
            ></iframe>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <VueSignaturePad
      width="500px"
      height="500px"
      ref="signaturePad"
    ></VueSignaturePad>
  </v-container>
</template>

<script>
import { mdiFormatColorFill, mdiCalendar, mdiClock } from "@mdi/js";
import { PDFDocument } from "pdf-lib";
import Alert from "../../../components/Alert";
import AutosaveRadio from "../../../components/inputs/AutosaveRadio.vue";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";
import VueSignaturePad from "vue-signature-pad";

export default {
  components: {
    Alert,
    AutosaveRadio,
    AutosaveText,
    VueSignaturePad,
  },

  data() {
    return {
      // Icons
      formatColorFillIcon: mdiFormatColorFill,
      calendarIcon: mdiCalendar,
      clockIcon: mdiClock,

      // Default activity leader/contact person fields
      defaultLoaded: false,
      defaultContact: null,
      defaultBirthDate: null,
      defaultHome: null,
      defaultWork: null,
      defaultCell: null,
      defaultAddress: null,

      defaultActivityLeaderLoading: false,
      defaultContactPersonLoading: false,
      defaultActivityLeaderError: null,
      defaultContactPersonError: null,

      // Fields
      categoryError: null,

      numbersKeasError: null,
      numbersCubsError: null,
      numbersScoutsError: null,
      numbersVenturersError: null,
      numbersRoversError: null,
      numbersLeadersError: null,
      numbersOthersError: null,

      activityLeaderNameError: null,
      activityLeaderAgeError: null,
      activityLeaderHomeError: null,
      activityLeaderWorkError: null,
      activityLeaderCellError: null,
      activityLeaderAddressError: null,

      contactNameError: null,
      contactHomeError: null,
      contactWorkError: null,
      contactCellError: null,
      contactAddressError: null,
      contactTimeError: null,
      contactDateError: null,

      categoryOptions: {
        "Type A - Low Risk": [
          "Group event",
          "Zone event",
          "Region event",
          "National event",
          "Picnic",
          "Walk",
          "Visit to town",
          "Visit a Group",
          "Other A",
        ],
        "Type B - High Risk": [
          "Abseiling",
          "Air activity",
          "Camping",
          "Caving",
          "Day hike",
          "Patrol activity",
          "Tramping",
          "Water activity",
          "Other B",
        ],
      },
    };
  },

  props: {
    activityName: String,
    category: String,
    description: String,
    location: String,
    scoutGroup: String,
    scoutZoneRegion: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    numbers: Object,
    activityLeader: Object,
    contact: Object,
    activityLeaderUID: String,
  },

  async mounted() {
    // Display AIF
    this.generateAIF();
  },

  watch: {
    // Update PDF when values updated on page
    category() {
      this.generateAIF();
    },

    numbers() {
      this.generateAIF();
    },

    activityLeader() {
      this.generateAIF();
    },

    contact() {
      this.generateAIF();
    },
  },

  methods: {
    // Loads the user's default values for the activity leader/contact person
    async loadDefault(person) {
      // Get user defaults
      const loadingVar =
        person === "Activity Leader"
          ? "defaultActivityLeaderLoading"
          : "defaultContactPersonLoading";
      const errorVar =
        person === "Activity Leader"
          ? "defaultActivityLeaderError"
          : "defaultContactPersonError";

      this[errorVar] = null;
      this[loadingVar] = true;

      // Get user defaults if not already loaded
      if (!this.defaultLoaded) {
        await this.$functions
          .httpsCallable("userGet")()
          .then((data) => {
            // Success
            this.defaultLoaded = true;

            this.defaultBirthDate = data.data.birthDate;
            this.defaultHome = data.data.home;
            this.defaultWork = data.data.work;
            this.defaultCell = data.data.cell;
            this.defaultAddress = data.data.address;
            this.defaultContact = data.data.contact;
          })
          .catch((error) => {
            // Error
            this[loadingVar] = false;

            this[errorVar] =
              error.message === "internal"
                ? "An error occurred when connecting to the server."
                : error.message;
          });
      }

      if (!this[errorVar]) {
        // Fill fields
        let params;

        if (person === "Activity Leader") {
          // Activity leader

          // Determine age
          let age;
          if (this.defaultBirthDate) {
            const dateParts = this.defaultBirthDate.split("-");
            const timeSinceBirth =
              new Date().getTime() -
              new Date(dateParts[0], dateParts[1], dateParts[2]).getTime();
            age = Math.abs(new Date(timeSinceBirth).getUTCFullYear() - 1970);
          }

          params = {
            "activityLeader.name": this.$currentUser.displayName,
            "activityLeader.age": age,
            "activityLeader.home": this.defaultHome,
            "activityLeader.work": this.defaultWork,
            "activityLeader.cell": this.defaultCell,
            "activityLeader.address": this.defaultAddress,
          };
        } else {
          // Contact person

          params = {
            "contact.name": this.defaultContact.name,
            "contact.home": this.defaultContact.home,
            "contact.work": this.defaultContact.work,
            "contact.cell": this.defaultContact.cell,
            "contact.address": this.defaultContact.address,
          };
        }

        this.$functions
          .httpsCallable("activityOverviewSet")({
            id: this.$route.params.activityId,
            ...params,
          })
          .then(() => {
            // Success
            this[loadingVar] = false;

            // Update fields
            Object.entries(params).forEach(([fieldName, v]) => {
              this.$emit("update", fieldName, v);
            });
          })
          .catch((error) => {
            // Error
            this[loadingVar] = false;

            this[errorVar] =
              error.message === "internal"
                ? "An error occurred when connecting to the server."
                : error.message;
          });
      }
    },

    update(v, fieldName, errorName) {
      // Display activities
      this[errorName] = null;

      this.$functions
        .httpsCallable("activityOverviewSet")({
          id: this.$route.params.activityId,
          [fieldName]: v,
        })
        .then(() => {
          // Success
          this.$emit("update", fieldName, v);
        })
        .catch((error) => {
          // Error
          this[errorName] = { message: error.message };
        });
    },

    async generateAIF() {
      // Generate the AIF PDF
      if (this.$refs.pdf) {
        const fields = {
          Activity: this.activityName,
          "Activity Name 2": this.activityName,
          "Activity Name 3": this.activityName,
          "Activity Name 4": this.activityName,
          "Scout Group": this.scoutGroup,
          "Scout Zone/Region": this.scoutZoneRegion,

          "Kea numbers": this.numbers.keas
            ? this.numbers.keas.toString()
            : null,
          "Cub numbers": this.numbers.cubs
            ? this.numbers.cubs.toString()
            : null,
          "Scout numbers": this.numbers.scouts
            ? this.numbers.scouts.toString()
            : null,
          "Venturer numbers": this.numbers.venturers
            ? this.numbers.venturers.toString()
            : null,
          "Rover numbers": this.numbers.rovers
            ? this.numbers.rovers.toString()
            : null,
          "Leader numbers": this.numbers.leaders
            ? this.numbers.leaders.toString()
            : null,
          "Other numbers": this.numbers.others
            ? this.numbers.others.toString()
            : null,
          "Total numbers": Object.values(this.numbers)
            .reduce((prev, item) => prev + item, 0)
            .toString(),

          "Description A": this.description,
          "Description B": this.description,

          "Location of the activity": this.location,
          "Start date": this.startDate,
          "Start time": this.startTime,
          "End date": this.endDate,
          "End time": this.endTime,

          "Activity Leader Name": this.activityLeader.name,
          "Activity Leader Age": this.activityLeader.age
            ? this.activityLeader.age.toString()
            : null,
          "Activity Leader Home Phone": this.activityLeader.home,
          "Activity Leader Work Phone": this.activityLeader.work,
          "Activity Leader Cell Phone": this.activityLeader.cell,
          "Activity Leader Address": this.activityLeader.address,

          "Contact Person Name": this.contact.name,
          "Contact Person Home Phone": this.contact.home,
          "Contact Person Work Phone": this.contact.work,
          "Contact Person Cell Phone": this.contact.cell,
          "Contact Person Address": this.contact.address,
          "Emergency Call Time": this.contact.time,
          "Emergency Call Date": this.contact.date,
        };

        // Get template
        const url = "/aif.pdf";
        const existingPdfBytes = await fetch(url).then((res) =>
          res.arrayBuffer()
        );

        // Fill form
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.setTitle(`${fields.Activity} - Activity Intention Form`);
        pdfDoc.setAuthor(
          fields["Activity Leader Name"]
            ? fields["Activity Leader Name"]
            : "Scouts Aotearoa"
        );
        pdfDoc.setCreator("Activity Management System");
        pdfDoc.setProducer(
          "AMS - Scouts Aotearoa (https://ams.matthewtaylor.codes)"
        );
        const form = pdfDoc.getForm();

        // Loop form text fields
        Object.entries(fields).forEach((field) => {
          form.getTextField(field[0]).setText(field[1] ? field[1] : "");
        });

        // Check activity category
        if (this.category) form.getCheckBox(this.category).check();

        // Remove all but first page if Type A
        if (this.categoryOptions["Type A - Low Risk"].includes(this.category)) {
          pdfDoc.removePage(3);
          pdfDoc.removePage(2);
          pdfDoc.removePage(1);
        }

        // form.getFields().forEach((field) => {
        //   console.log(field.getName());
        // });

        this.$refs.pdf.setAttribute(
          "src",
          await pdfDoc.saveAsBase64({ dataUri: true })
        );
      }
    },
  },
};
</script>
