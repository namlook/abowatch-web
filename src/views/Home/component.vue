<script lang="ts" src="./index.ts" />

<template>
  <div class="home">
    <img alt="Vue logo" src="./logo.png" />
    <button @click="goToNewSubscriptionPage">new</button>

    <div v-if="loading">loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <SubscriptionsList
      v-else
      :subscriptions="subscriptions"
      @delete-subscription="onDeleteSubscription"
    />
  </div>
</template>
