<script lang="ts" src="./index.ts" />

<template>
  <div>
    <form @submit.prevent="saveSubscription">
      <v-card class="pa-5">
        <v-text-field
          v-model="form.name"
          label="Nom de l'entreprise"
          clearable
          required
        />
        <v-text-field
          v-model.number="form.price"
          label="Prix"
          required
          clearable
        />

        <v-select
          :items="billingModes"
          v-model="form.billingMode"
          label="Facturation"
        />

        <v-text-field
          v-model.number="form.dividedBy"
          label="Divisé en"
          required
          clearable
        />

        <v-card-actions class="d-flex justify-end">
          <v-btn
            v-if="subscriptionId"
            @click="deleteSubscription"
            color="error"
            :disabled="deleteSubscriptionLoading"
          >
            Delete
          </v-btn>
          <v-btn color="primary" :disabled="mutationLoading" type="submit">
            Save
          </v-btn>
          <v-btn depressed :to="homeLink">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>
