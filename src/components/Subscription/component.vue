<script lang="ts" src="./index.ts" />

<template>
  <v-card elevation="2" outlined :to="editSubscriptionLink">
    <v-card-text>
      <div>{{ value.price }}€ {{ value.billingMode }}</div>
      <p class="display-1 text--primary">{{ value.name }}</p>
      <p>divided by {{ value.dividedBy }}</p>
    </v-card-text>
  </v-card>
</template>
