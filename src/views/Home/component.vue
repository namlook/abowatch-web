<script lang="ts" src="./index.ts" />

<template>
  <div class="home">
    <v-row>
      <v-col class="order-2 order-sm-1">
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
      </v-col>
      <v-col cols="12" sm="4" md="2" class="order-1 order-sm-2">
        <h3>Total {{ totalPrice }}</h3>
      </v-col>
    </v-row>
  </div>
</template>
