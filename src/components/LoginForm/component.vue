<script lang="ts" src="./index.ts" />

<template>
  <v-container>
    <p v-if="formErrors">{{ formErrors }}</p>
    <form @submit.prevent="login">
      <v-text-field type="text" placeholder="login" v-model="form.username" />
      <v-text-field
        type="password"
        placeholder="password"
        v-model="form.password"
      />
      <v-btn :disabled="loginLoading" type="submit">Submit</v-btn>
    </form>
    <p>
      Don't have an account ?
      <router-link :to="registerLink">register</router-link>
    </p>
  </v-container>
</template>
