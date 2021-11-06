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
          <v-col cols="12">
            <h2 class="text-h5">Activity Leader</h2>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" xl="6">
            <v-row dense>
              <v-col cols="12" lg="8">
                <AutosaveText
                  label="Name"
                  type="text"
                  :value="activityLeader.name"
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

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Age"
                  type="number"
                  :value="activityLeader.age"
                  :error="activityLeaderAgeError"
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
          <v-col cols="12" xl="6">
            <v-row dense>
              <v-col cols="12">
                <AutosaveText
                  label="Name"
                  type="text"
                  :value="contact.name"
                  :error="contactNameError"
                  @save="(v) => update(v, 'contact.name', 'contactNameError')"
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Home phone"
                  type="text"
                  :value="contact.home"
                  :error="contactHomeError"
                  @save="(v) => update(v, 'contact.home', 'contactHomeError')"
                />
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <AutosaveText
                  label="Work phone"
                  type="text"
                  :value="contact.work"
                  :error="contactWorkError"
                  @save="(v) => update(v, 'contact.work', 'contactWorkError')"
                />
              </v-col>

              <v-col cols="12" lg="4">
                <AutosaveText
                  label="Cell phone"
                  type="text"
                  :value="contact.cell"
                  :error="contactCellError"
                  @save="(v) => update(v, 'contact.cell', 'contactCellError')"
                />
              </v-col>

              <v-col cols="12">
                <AutosaveText
                  label="Address"
                  type="textarea"
                  :value="contact.address"
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
import AutosaveRadio from "../../../components/inputs/AutosaveRadio.vue";
import AutosaveText from "../../../components/inputs/AutosaveText.vue";

export default {
  components: {
    AutosaveRadio,
    AutosaveText,
  },
  data() {
    return {
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
          "Activity Leader Age": this.activityLeader.age,
          "Activity Leader Home Phone": this.activityLeader.home,
          "Activity Leader Work Phone": this.activityLeader.work,
          "Activity Leader Cell Phone": this.activityLeader.cell,
          "Activity Leader Address": this.activityLeader.address,

          "Contact Person Name": this.contact.name,
          "Contact Person Home Phone": this.contact.home,
          "Contact Person Work Phone": this.contact.work,
          "Contact Person Cell Phone": this.contact.cell,
          "Contact Person Address": this.contact.address,
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
        form.getCheckBox(this.category).check();

        form.getFields().forEach((field) => {
          console.log(field.getName());
        });

        this.$refs.pdf.setAttribute(
          "src",
          await pdfDoc.saveAsBase64({ dataUri: true })
        );
      }
    },
  },
};
</script>
