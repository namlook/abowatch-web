<script lang="ts" src="./index.ts" />

<template>
  <div>
    <v-app>
      <v-app-bar app dark color="#333">
        <v-toolbar-items>
          <v-btn text @click="goToHome">Abowatch</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="isAuthenticated" @click="onLogout" text>
            {{ username }} <v-icon>mdi-logout</v-icon>
          </v-btn>
          <v-btn v-else text :to="loginLink">login</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
