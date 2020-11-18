<script lang="ts" src="./index.ts" />

<template>
  <v-card elevation="2" min-width="400" outlined :to="editSubscriptionLink">
    <v-card-text>
      <div>
        <span>{{ value.price }}€ {{ value.billingMode }}</span>
        <span v-if="value.split > 1">&nbsp;split in {{ value.split }}</span>
      </div>
      <p class="display-1 text--primary">{{ value.name }}</p>
    </v-card-text>
  </v-card>
</template>
