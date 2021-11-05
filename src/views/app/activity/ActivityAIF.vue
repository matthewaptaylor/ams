<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Activity Intention</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <h2 class="text-h5">Activity Leader</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" lg="8" xl="6">
            <v-row dense>
              <v-col cols="12">
                <AutosaveText
                  label="Name"
                  type="text"
                  :value="activityLeader ? activityLeader.name : null"
                  :error="activityLeaderNameError"
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

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Age"
                  type="number"
                  :value="activityLeader ? activityLeader.age : null"
                  :error="activityLeaderAgeError"
                  @save="
                    (v) =>
                      update(v, 'activityLeader.age', 'activityLeaderAgeError')
                  "
                />
              </v-col>

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Home phone"
                  type="text"
                  :value="activityLeader ? activityLeader.home : null"
                  :error="activityLeaderHomeError"
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

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Work phone"
                  type="text"
                  :value="activityLeader ? activityLeader.work : null"
                  :error="activityLeaderWorkError"
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

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Cell phone"
                  type="text"
                  :value="activityLeader ? activityLeader.cell : null"
                  :error="activityLeaderCellError"
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
                  :value="activityLeader ? activityLeader.address : null"
                  :error="activityLeaderAddressError"
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
          <v-col cols="12">
            <h2 class="text-h5">Contact Person</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" lg="8" xl="6">
            <v-row dense>
              <v-col cols="12">
                <AutosaveText
                  label="Name"
                  type="text"
                  :value="contact ? contact.name : null"
                  :error="contactNameError"
                  @save="(v) => update(v, 'contact.name', 'contactNameError')"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Home phone"
                  type="text"
                  :value="contact ? contact.home : null"
                  :error="contactHomeError"
                  @save="(v) => update(v, 'contact.home', 'contactHomeError')"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <AutosaveText
                  label="Work phone"
                  type="text"
                  :value="contact ? contact.work : null"
                  :error="contactWorkError"
                  @save="(v) => update(v, 'contact.work', 'contactWorkError')"
                />
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Cell phone"
                  type="text"
                  :value="contact ? contact.cell : null"
                  :error="contactCellError"
                  @save="(v) => update(v, 'contact.cell', 'contactCellError')"
                />
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Address"
                  type="textarea"
                  :value="contact ? contact.address : null"
                  :error="contactAddressError"
                  @save="
                    (v) => update(v, 'contact.address', 'contactAddressError')
                  "
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
  </v-container>
</template>

<script>
import { PDFDocument } from "pdf-lib";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";

export default {
  components: {
    AutosaveText,
  },
  data() {
    return {
      // Fields
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
    };
  },

  props: {
    activityName: String,
    description: String,
    location: String,
    scoutGroup: String,
    scoutZoneRegion: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    activityLeader: Object,
    contact: Object,
  },

  async mounted() {
    // Display AIF
    this.generateAIF();
  },

  watch: {
    // Update PDF when values updated on page
    activityLeader() {
      this.generateAIF();
    },

    contact() {
      this.generateAIF();
    },
  },

  methods: {
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
      const fields = {
        Activity: this.activityName,
        "Activity Name 2": this.activityName,
        "Activity Name 3": this.activityName,
        "Activity Name 4": this.activityName,
        "Scout Group": this.scoutGroup,
        "Scout Zone/Region": this.scoutZoneRegion,
        "Description A": this.description,
        "Description B": this.description,
        "Location of the activity": this.location,
        "Start date": this.startDate,
        "Start time": this.startTime,
        "End date": this.endDate,
        "End time": this.endTime,

        "Activity Leader Name": this.activityLeader?.name,
        "Activity Leader Age": this.activityLeader?.age,
        "Activity Leader Home Phone": this.activityLeader?.home,
        "Activity Leader Work Phone": this.activityLeader?.work,
        "Activity Leader Cell Phone": this.activityLeader?.cell,
        "Activity Leader Address": this.activityLeader?.address,

        "Contact Person Name": this.contact?.name,
        "Contact Person Home Phone": this.contact?.home,
        "Contact Person Work Phone": this.contact?.work,
        "Contact Person Cell Phone": this.contact?.cell,
        "Contact Person Address": this.contact?.address,
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

      // Loop form fields
      Object.entries(fields).forEach((field) => {
        form.getTextField(field[0]).setText(field[1] ? field[1] : "");
      });
      form.getFields().forEach((field) => {
        console.log(field.getName());
      });

      this.$refs.pdf.setAttribute(
        "src",
        await pdfDoc.saveAsBase64({ dataUri: true })
      );
    },
  },
};
</script>
