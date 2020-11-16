<script lang="ts" src="./index.ts" />

<template>
  <div>
    <form @submit.prevent="saveSubscription">
      <input type="text" name="name" v-model="form.name" />
      <input type="number" name="price" v-model.number="form.price" />
      <input type="number" name="divided-by" v-model.number="form.dividedBy" />
      <input
        type="text"
        name="billing-mode"
        v-model.number="form.billingMode"
      />
      <button :disabled="mutationLoading" type="submit">Save</button>
    </form>
  </div>
</template>
