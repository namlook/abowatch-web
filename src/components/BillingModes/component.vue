<script lang="ts" src="./index.ts" />

<template>
  <v-btn-toggle
    v-model="billingMode"
    color="primary"
    borderless
    class="d-flex flex-wrap"
    :class="{ 'justify-space-between': spaceBeetween }"
  >
    <v-btn text small value="daily"> Jour </v-btn>
    <v-btn text small value="weekly"> Semaine </v-btn>
    <v-btn text small value="monthly"> Mois </v-btn>
    <!-- <v-btn text value="quaterly"> Trimestrielle </v-btn> -->
    <v-btn text small value="yearly"> Année </v-btn>
  </v-btn-toggle>
</template>
