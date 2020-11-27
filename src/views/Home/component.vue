<script lang="ts" src="./index.ts" />

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="5">
        <BillingModes v-model="billingMode" space-beetween />
        <div class="pa-3">
          <h3 class="d-flex justify-space-between">
            <span>Total dépensé</span> <span>{{ priceForBillingMode }}€</span>
          </h3>
          <p v-if="hasSplit" class="d-flex justify-space-between">
            <span>Ma part</span> <span>{{ splitPriceForBillingMode }}€</span>
          </p>
        </div>
        <v-btn outlined color="primary" class="mx-3" :to="newSubscriptonLink">
          <v-icon>mdi-plus</v-icon> ajouter
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="7">
        <div v-if="loading">loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <SubscriptionsList v-else :subscriptions="subscriptions" />
      </v-col>
    </v-row>
  </v-container>
</template>
