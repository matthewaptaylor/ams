<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Activity Intention Form</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row dense>
          <iframe
            ref="pdf"
            style="border: none; width: 100%; height: 40rem"
          ></iframe>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default {
  async mounted() {
    const url = "/aif.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // eslint-disable-next-line no-unused-vars
    const { width, height } = firstPage.getSize();

    firstPage.drawText(
      "Yeet yeet AIF generation is hard to code\n\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ",
      {
        x: 50,
        y: height / 2 + 300,
        size: 35,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
      }
    );

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    this.$refs.pdf.src = pdfDataUri;
  },
};
</script>
