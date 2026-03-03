<script setup>
import { ref } from "vue";
import Children from "./components/Children.vue";

const title = "このタイトルは親コンポーネントから渡されています";
const description = "この説明文は親コンポーネントから渡されています";
const isVisible = ref(false);

const toggle = () => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <div id="app">
    <div>
      <button @click="toggle">表示にする</button>
      <Children
        :title="title"
        :description="description"
        :isVisible="isVisible"
      />
    </div>
  </div>
</template>
