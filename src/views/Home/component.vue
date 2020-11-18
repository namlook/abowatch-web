<script lang="ts" src="./index.ts" />

<template>
  <div class="home">
    <div v-if="loading">loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <SubscriptionsList v-else :subscriptions="subscriptions" />
    <div class="d-flex justify-center">
      <v-btn
        outlined
        color="primary"
        width="100%"
        max-width="600"
        :to="newSubscriptonLink"
        class="mt-5"
      >
        new
      </v-btn>
    </div>
  </div>
</template>
