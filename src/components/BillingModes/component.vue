<script lang="ts" src="./index.ts" />

<template>
  <v-btn-toggle
    v-model="billingMode"
    color="primary"
    borderless
    class="d-flex flex-wrap"
  >
    <v-btn text value="daily"> Jour </v-btn>
    <v-btn text value="weekly"> Semaine </v-btn>
    <v-btn text value="monthly"> Mois </v-btn>
    <!-- <v-btn text value="quaterly"> Trimestrielle </v-btn> -->
    <v-btn text value="yearly"> Année </v-btn>
  </v-btn-toggle>
</template>
