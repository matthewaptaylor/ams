<template>
  <v-col cols="12" class="mt-2">
    <v-row dense>
      <v-col cols="12" sm="6" lg="4">
        <v-sheet
          outlined
          class="d-flex align-center fill-height"
          style="min-height: 80px"
        >
          <img
            v-if="image"
            :src="image"
            alt="Signature"
            class="d-block"
            style="width: 100%"
            draggable="false"
          />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6" lg="8" class="d-flex flex-column">
        <p class="flex-grow-1 mb-0" v-if="signature">
          Signed by {{ signature.name }} ({{ signature.email }}) on
          {{ signature.date }}.
        </p>

        <p class="flex-grow-1 mb-0" v-else>Not yet signed.</p>

        <v-btn
          color="primary"
          outlined
          v-if="!disabled"
          class="mt-4"
          @click="$emit('changeSignature')"
        >
          {{ signature ? "Change signature" : "Add signature" }}
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    signature: Object,
    image: String,
    disabled: Boolean,
  },
};
</script>
