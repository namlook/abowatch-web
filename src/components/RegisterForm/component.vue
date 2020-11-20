<script lang="ts" src="./index.ts" />

<template>
  <v-container>
    <p v-if="formErrors">{{ formErrors }}</p>
    <form @submit.prevent="register">
      <v-text-field type="text" placeholder="login" v-model="form.username" />
      <v-text-field
        type="password"
        placeholder="password"
        v-model="form.password"
      />
      <v-btn :disabled="registerLoading" type="submit">Submit</v-btn>
    </form>
    <p>
      Have already an account ? <router-link :to="loginLink">login</router-link>
    </p>
  </v-container>
</template>
