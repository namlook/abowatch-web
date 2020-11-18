<script lang="ts" src="./index.ts" />

<template>
  <v-row>
    <v-col cols="12" sm="5" md="3">
      <BillingModes v-model="state.billingMode" />
      <h3>Total {{ priceForBillingMode }}€</h3>
      <p v-if="hasSplit">My share {{ splitPriceForBillingMode }}€</p>
    </v-col>
    <v-col>
      <div v-if="loading">loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <SubscriptionsList v-else :subscriptions="subscriptions" />
    </v-col>
  </v-row>
</template>
