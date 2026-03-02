<template>
  <div id="app"></div>
</template>

<script setup></script>

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
