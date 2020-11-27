<script lang="ts" src="./index.ts" />

<template>
  <v-container>
    <v-row>
      <v-col class="main">
        <h1>Suivez vos abonnements facilement</h1>
        <div class="ma-5">
          <p>
            Gardez un oeil sur vos dépense quotidienne, mensuelle ou annuelle.
          </p>
          <p>En couple ou en coloc ? Suivez votre propre part de dépense</p>
          <p>Tous les services d'abonnements sont supportés</p>
        </div>
        <v-btn class="ma-5" @click="login">Allons-y !</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.main {
  text-align: center;
}
</style>
