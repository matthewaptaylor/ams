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
    location: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
  },

  async mounted() {
    this.$refs.pdf.setAttribute(
      "src",
      await this.generateAIF({
        Activity: this.activityName,
        "Activity Name 2": this.activityName,
        "Activity Name 3": this.activityName,
        "Activity Name 4": this.activityName,
        "Location of the activity": this.location,
        "Start date": this.startDate,
        "Start time": this.startTime,
        "End date": this.endDate,
        "End time": this.endTime,
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
      const form = pdfDoc.getForm();

      // Fill form fields
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
