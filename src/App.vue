<script setup>
import { ref, computed, onMounted } from "vue";
import ButtonControl from "./components/ButtonControl.vue";

const inputMinutes = ref(0);
const time = ref(0);
const startingTime = ref(0);
const timerId = ref(null);
const timeSet = ref(false);

const formatTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

function setTime() {
  time.value = inputMinutes.value * 60;
  startingTime.value = time.value;
  timeSet.value = true;
}

function startTimer() {
  if (timerId.value) return;
  localStorage.setItem("timerRunning", "true");

  timerId.value = setInterval(() => {
    if (time.value > 0) {
      time.value--;
      localStorage.setItem("savedTime", time.value);
      localStorage.setItem("savedTimestamp", Date.now());
    } else {
      completeTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId.value);
  timerId.value = null;
  localStorage.setItem("timerRunning", "false");
}

function resetTimer() {
  stopTimer();
  time.value = startingTime.value;
  timeSet.value = false;
  localStorage.removeItem("savedTime");
  localStorage.removeItem("savedTimestamp");
  localStorage.removeItem("timerRunning");
}

function completeTimer() {
  stopTimer();
  alert("時間になりました！");
  resetTimer();
}

onMounted(() => {
  // 1. 保存庫からデータを取ってくる
  const savedTime = localStorage.getItem("savedTime"); // 停止した時の残り秒数
  const savedTimestamp = localStorage.getItem("savedTimestamp"); // 保存した瞬間の時刻(ミリ秒)
  const timerRunning = localStorage.getItem("timerRunning") === "true"; // 動いていたか？

  if (savedTime !== null && savedTimestamp !== null) {
    // 2. 「今」と「保存した時」の差（経過時間）を計算
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor(
      (currentTime - Number(savedTimestamp)) / 1000,
    );

    // 3. 本当の残り時間を算出
    let calculatedTime = Number(savedTime) - elapsedSeconds;

    if (calculatedTime > 0 && timerRunning) {
      // ケースA: まだ時間が残っていて、前回実行中だったなら、カウントダウンを再開！
      time.value = calculatedTime;
      timeSet.value = true;
      startTimer();
    } else if (!timerRunning) {
      // ケースB: 前回一時停止中だったなら、その時の残り時間を表示して待機
      calculatedTime = Number(savedTime);
      time.value = calculatedTime > 0 ? calculatedTime : 0;
      timeSet.value = true;
    } else {
      // ケースC: 離れている間に時間が過ぎきってしまったら、リセット
      time.value = 0;
      timeSet.value = false;
    }
  }
});
</script>

<template>
  <div id="app">
    <div>
      <label for="timeInput">カウントダウン時間（分）:</label>
      <input
        id="timeInput"
        type="number"
        v-model.number="inputMinutes"
        step="1"
        min="0"
      />
    </div>

    <div class="timer">{{ formatTime }}</div>

    <ButtonControl
      :isSetDisabled="timerId !== null"
      :isStartDisabled="timerId !== null || !timeSet"
      :isStopDisabled="timerId === null"
      @setTime="setTime"
      @startTimer="startTimer"
      @stopTimer="stopTimer"
      @resetTimer="resetTimer"
    />
  </div>
</template>

<style>
html,
body {
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}
.timer {
  font-size: 2.5em;
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #4caf50;
}
div > div {
  margin-bottom: 15px;
}
label {
  margin-right: 10px;
}
input[type="number"] {
  font-size: 1em;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 80px;
  box-sizing: border-box;
}
.controls {
  display: flex;
  gap: 10px;
}
button {
  cursor: pointer;
  font-size: 1em;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #2196f3;
  color: white;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #1976d2;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
