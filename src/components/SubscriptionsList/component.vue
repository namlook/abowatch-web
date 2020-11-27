<script lang="ts" src="./index.ts" />

<template>
  <div class="d-flex flex-wrap justify-center align-center">
    <Subscription
      v-for="subscription in subscriptions"
      :key="subscription.id"
      :value="subscription"
      class="subscription ma-3"
    />
  </div>
</template>
