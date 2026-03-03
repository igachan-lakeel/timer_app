<script setup>
defineProps({
  isSetDisabled: Boolean,
  isStartDisabled: Boolean,
  isStopDisabled: Boolean,
});

const emit = defineEmits(["setTime", "startTimer", "stopTimer", "resetTimer"]);

const setTime = () => {
  emit("setTime");
};
const startTimer = () => {
  emit("startTimer");
};
const stopTimer = () => {
  emit("stopTimer");
};
const resetTimer = () => {
  emit("resetTimer");
};
</script>

<template>
  <div class="controls">
    <button @click="setTime" :disabled="isSetDisabled">セット</button>
    <button @click="startTimer" :disabled="isStartDisabled">スタート</button>
    <button @click="stopTimer" :disabled="isStopDisabled">ストップ</button>
    <button @click="resetTimer">リセット</button>
  </div>
</template>
