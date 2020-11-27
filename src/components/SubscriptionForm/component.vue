<script lang="ts" src="./index.ts" />

<template>
  <v-container>
    <h2 class="text-h4 mb-2">
      <span v-if="subscriptionId">{{ form.name }}</span>
      <span v-else>New subscription</span>
    </h2>
    <form @submit.prevent="saveSubscription">
      <v-card class="pa-5">
        <v-text-field
          v-model="form.name"
          label="Nom de l'entreprise"
          required
        />

        <v-text-field
          type="number"
          v-model.number="form.price"
          label="Prix"
          required
          clearable
        />

        <div class="my-7">
          <label>Facturé par :</label>
          <BillingModes v-model="form.billingMode" />
        </div>

        <div class="d-flex align-center">
          <div v-if="form.split > 1">
            <label>Partagé en {{ form.split }}</label>
            <v-btn text small @click="decrementSplit">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-icon v-for="i in form.split" :key="`${i}-icon`">
              mdi-account
            </v-icon>
            <v-btn text small @click="incrementSplit">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn small depressed @click="incrementSplit">
              <v-icon>mdi-plus</v-icon> partager cet abonnement
            </v-btn>
          </div>
        </div>

        <v-card-actions class="d-flex mt-9">
          <v-btn
            v-if="subscriptionId"
            @click="deleteSubscription"
            color="error"
            text
            :disabled="deleteSubscriptionLoading"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
          <div class="mr-auto"></div>
          <v-btn depressed :to="homeLink">Annuler</v-btn>
          <v-btn color="primary" :disabled="mutationLoading" type="submit">
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-container>
</template>
