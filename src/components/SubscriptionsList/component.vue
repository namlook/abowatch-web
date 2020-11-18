<script lang="ts" src="./index.ts" />

<template>
  <div class="d-flex flex-wrap justify-center align-center">
    <Subscription
      v-for="subscription in subscriptions"
      :key="subscription.id"
      :value="subscription"
      class="subscription ma-3"
    />
    <v-btn
      outlined
      color="primary"
      height="110"
      min-width="400"
      class="ma-3"
      :to="newSubscriptonLink"
    >
      new
    </v-btn>
  </div>
</template>
