<script lang="ts" src="./index.ts" />

<template>
  <div>
    <ApolloMutation
      :mutation="mutation"
      :variables="mutationVariables"
      @done="onSave"
    >
      <template v-slot="{ mutate, loading, error }">
        <p v-if="error">An error occurred: {{ error }}</p>
        <input type="text" name="name" v-model="form.name" />
        <input type="number" name="price" v-model.number="form.price" />
        <input
          type="number"
          name="divided-by"
          v-model.number="form.dividedBy"
        />
        <input
          type="text"
          name="billing-mode"
          v-model.number="form.billingMode"
        />
        <button :disabled="loading" @click="mutate()">Save</button>
      </template>
    </ApolloMutation>
  </div>
</template>
