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
          <label>Partagé en</label>
          <v-btn
            :depressed="form.split === 1"
            class="mx-2"
            :class="{ primary: form.split === 1 }"
            small
            @click="form.split = 1"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn
            :depressed="form.split === 2"
            class="mx-2"
            :class="{ primary: form.split === 2 }"
            small
            @click="form.split = 2"
          >
            <v-icon>mdi-account</v-icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn
            :depressed="form.split === 3"
            class="mx-2"
            :class="{ primary: form.split === 3 }"
            small
            @click="form.split = 3"
          >
            <v-icon>mdi-account</v-icon>
            <v-icon>mdi-account</v-icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn class="mx-2" text small @click="decrementSplit">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          {{ form.split }}
          <v-btn class="mx-2" text small @click="incrementSplit">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
