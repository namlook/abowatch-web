<script lang="ts" src="./index.ts" />

<template>
  <div class="home">
    <div v-if="loading">loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <SubscriptionsList v-else :subscriptions="subscriptions" />
    <div class="actions">
      <v-btn
        outlined
        color="primary"
        :to="newSubscriptonLink"
        class="new-button"
      >
        new
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  .actions {
    text-align: center;
    .new-button {
      width: 600px !important;
    }
  }
}
</style>
