<script lang="ts" src="./index.ts" />

<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex">
        <BillingModes v-model="billingMode" />
        <div>
          <h3>Total {{ priceForBillingMode }}€</h3>
          <p v-if="hasSplit">My share {{ splitPriceForBillingMode }}€</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div v-if="loading">loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <SubscriptionsList v-else :subscriptions="subscriptions" />
      </v-col>
    </v-row>
  </v-container>
</template>
