<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Activity Intention Form</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <p>This feature is still in development.</p>

        <iframe
          ref="pdf"
          style="border: none; width: 100%; height: 40rem"
        ></iframe>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PDFDocument } from "pdf-lib";

export default {
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
  },

  async mounted() {
    // Display AIF
    this.$refs.pdf.setAttribute(
      "src",
      await this.generateAIF({
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
        "Activity Leader Name": "Scouts Aotearoa",
      })
    );
  },

  methods: {
    // Generate the AIF PDF
    async generateAIF(fields) {
      // Get template
      const url = "/aif.pdf";
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );

      // Fill form
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.setTitle(`${fields.Activity} - Activity Intention Form`);
      pdfDoc.setAuthor(fields["Activity Leader Name"]);
      pdfDoc.setCreator("Activity Management System");
      pdfDoc.setProducer(
        "AMS - Scouts Aotearoa (https://ams.matthewtaylor.codes)"
      );
      const form = pdfDoc.getForm();

      // Loop form fields
      Object.entries(fields).forEach((field) => {
        form.getTextField(field[0]).setText(field[1]);
      });
      form.getFields().forEach((field) => {
        console.log(field.getName());
      });

      return await pdfDoc.saveAsBase64({ dataUri: true });
    },
  },
};
</script>
