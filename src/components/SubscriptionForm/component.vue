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

        <div class="d-flex align-center mb-5">
          <label>Facturation</label>
          <v-btn-toggle
            v-model="form.billingMode"
            borderless
            class="d-flex flex-wrap"
          >
            <v-btn text value="daily"> Quotidienne </v-btn>
            <v-btn text value="weekly"> Hebdomadaire </v-btn>
            <v-btn text value="monthly"> Mensuelle </v-btn>
            <v-btn text value="quaterly"> Trimestrielle </v-btn>
            <v-btn text value="yearly"> Annuelle </v-btn>
          </v-btn-toggle>
        </div>

        <div class="d-flex align-center">
          <label>Partagé en</label>
          <v-btn class="mx-2" small @click="decrementSplit"> - </v-btn>
          {{ form.dividedBy }}
          <v-btn class="mx-2" small @click="incrementSplit"> + </v-btn>
        </div>

        <v-card-actions class="d-flex">
          <v-btn
            v-if="subscriptionId"
            @click="deleteSubscription"
            color="error"
            text
            :disabled="deleteSubscriptionLoading"
          >
            Supprimer
          </v-btn>
          <div class="mr-auto"></div>
          <v-btn color="primary" :disabled="mutationLoading" type="submit">
            Enregistrer
          </v-btn>
          <v-btn depressed :to="homeLink">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>
