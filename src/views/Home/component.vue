<script lang="ts" src="./index.ts" />

<template>
  <div class="home">
    <img alt="Vue logo" src="./logo.png" />
    <button @click="gotToNewSubcription">new</button>

    <ApolloQuery :query="query">
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading">loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="data">
          <SubscriptionsList :subscriptions="data.subscriptions" />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
