<script setup>
import { defineProps } from "vue";
defineProps({
  title: String,
  description: String,
  isVisible: Boolean,
});
</script>

<template>
  <div v-if="isVisible">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>
