<script lang="ts" src="./index.ts" />

<template>
  <div>
    <div v-for="subscription in subscriptions" :key="subscription.id">
      <h3>{{ subscription.name }}</h3>
      <p>
        {{ subscription.price }}€ (divided by {{ subscription.dividedBy }})
        {{ subscription.billingMode }}
      </p>
      <a :href="`#/edit/${subscription.id}`">edit</a>
      <button @click="deleteSubscription(subscription.id)">delete</button>
    </div>
  </div>
</template>
