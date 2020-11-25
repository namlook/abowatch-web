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
          <v-btn v-if="isAuthenticating" text> ... </v-btn>
          <v-btn v-else-if="isAuthenticated" text @click="logout">
            {{ username }} <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-main>
        <div v-if="!authRequired || (!isAuthenticating && isAuthenticated)">
          <v-container>
            <router-view />
          </v-container>
        </div>
        <div v-else>authenticating...</div>
      </v-main>
    </v-app>
  </div>
</template>
