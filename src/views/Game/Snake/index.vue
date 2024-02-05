<template>
  <div class="game-title">贪吃蛇</div>
  <SnakeScene ref="snakeScene"></SnakeScene>
  <div class="btn-box">
    <el-button type="primary" @click="gameStart">开始</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SnakeScene, { API as SceneAPI } from "./components/SnakeScene.vue";
const snakeScene = ref<SceneAPI | null>(null);
const gameStart = () => {
  if (!snakeScene.value) {
    return;
  }
  snakeScene.value.initFood();
};
</script>

<style scoped lang="scss">
.game-title {
  background-image: url("game/common/title.png");
  width: 200px;
  height: 100px;
  background-size: cover;
  background-position: center;
  text-align: center;
  line-height: 87px;
  letter-spacing: 10px;
  margin: auto;
}
.btn-box {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
