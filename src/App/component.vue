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
          <v-btn :to="aboutLink" text>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
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
