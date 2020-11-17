<script lang="ts" src="./index.ts" />

<template>
  <div class="d-flex flex-wrap justify-space-around">
    <div v-for="subscription in subscriptions" :key="subscription.id">
      <Subscription :value="subscription" class="subscription my-3" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.subscription {
  min-width: 200px;
}
</style>
