<template>
  <div class="title">贪吃蛇</div>
  <div ref="gameSceneNode" class="game-scene">
    <div
      class="game-scene-item"
      v-for="item in sceneItemList"
      :style="{ backgroundColor: item.bgColor }"
    ></div>
  </div>
  <div class="info-box">
    <div>{{ tips }}</div>
    <div>分数：{{ snake.length - 4 }}</div>
  </div>
  <div class="ctl-btn-box">
    <el-button type="primary" @click="gameStart">开始</el-button>
    <el-button type="primary" @click="gameStop">暂停</el-button>
    <el-button type="primary" @click="initConfig">刷新</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RandomNum } from "../../utils/utils";
// import { Scene } from "./ts/scene";
let gameSceneNode = ref<HTMLDivElement>();
interface sceneItem {
  bgColor: string;
}
let sceneItemList = ref<sceneItem[]>([]);

let row: number = 20;
let col: number = 20;
const sceneBgColor: string = "#efefef";
const footBgColor: string = "green";

const snakeColor: string = "red";
const snakeHeaderColor: string = "gold";

enum SnakeDirection {
  Up,
  Right,
  Down,
  Left,
}
let tips = ref<string>("");

let snake = ref([
  { x: 3, y: 0 },
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
]);
let snakeTail = { x: 0, y: 0 };
let curSnakeDirection: SnakeDirection = SnakeDirection.Right;

let itemWidth = ref<string>("0px");
let itemHeight = ref<string>("0px");
onMounted(() => {
  bindKeyDown();
  initConfig();
});
//
function bindKeyDown() {
  document.onkeydown = (ev) => {
    switch (ev.code) {
      case "ArrowUp":
        if (curSnakeDirection != SnakeDirection.Down) {
          curSnakeDirection = SnakeDirection.Up;
        }
        break;
      case "ArrowRight":
        if (curSnakeDirection != SnakeDirection.Left) {
          curSnakeDirection = SnakeDirection.Right;
        }

        break;
      case "ArrowDown":
        if (curSnakeDirection != SnakeDirection.Up) {
          curSnakeDirection = SnakeDirection.Down;
        }

        break;
      case "ArrowLeft":
        if (curSnakeDirection != SnakeDirection.Right) {
          curSnakeDirection = SnakeDirection.Left;
        }

        break;

      default:
        break;
    }
  };
}
//初始化场景
function initScene() {
  let sceneWidth: number | undefined = gameSceneNode.value?.offsetWidth;
  if (sceneWidth) {
    itemWidth.value = sceneWidth / row + "px";
    itemHeight.value = itemWidth.value;
  }
  sceneItemList.value = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let m: sceneItem = {
        bgColor: sceneBgColor,
      };
      sceneItemList.value.push(m);
    }
  }
}

//初始化玩家，食物
function initConfig() {
  initScene();
  createFoot();
  snake.value = [
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ];
  snakeTail = { x: 0, y: 0 };
  curSnakeDirection = SnakeDirection.Right;
  tips.value = "";
  renderSnake();
}
//生成食物
let footIndex: number = 0;
function createFoot() {
  if (!sceneItemList.value) {
    return;
  }

  let m = RandomNum(0, sceneItemList.value.length);
  if (
    snake.value.some((element) => {
      return element.x + element.y * col == m;
    })
  ) {
    createFoot();
    return;
  }

  sceneItemList.value[footIndex].bgColor = sceneBgColor;
  footIndex = m;
  sceneItemList.value[footIndex].bgColor = footBgColor;
}

//渲染玩家
function renderSnake() {
  sceneItemList.value[getSnakeByScene(0)].bgColor = snakeHeaderColor;
  for (let index = 1; index < snake.value.length; index++) {
    sceneItemList.value[getSnakeByScene(index)].bgColor = snakeColor;
  }
}
function getSnakeByScene(index: number): number {
  return snake.value[index].x + snake.value[index].y * col;
}
//
function snakeMove() {
  //记录尾部坐标，用于吃食物
  snakeTail = snake.value[snake.value.length - 1];
  sceneItemList.value[getSnakeByScene(snake.value.length - 1)].bgColor =
    sceneBgColor;
  let pSnake = [snake.value[0]];
  for (let index = 1; index < snake.value.length; index++) {
    let x = snake.value[index - 1].x;
    let y = snake.value[index - 1].y;
    pSnake.push({ x, y });
  }
  snake.value = pSnake;
  switch (curSnakeDirection) {
    case SnakeDirection.Up:
      snake.value[0].y--;
      break;
    case SnakeDirection.Right:
      snake.value[0].x++;
      break;
    case SnakeDirection.Down:
      snake.value[0].y++;
      break;
    case SnakeDirection.Left:
      snake.value[0].x--;
      break;

    default:
      break;
  }
  if (!checkSnakeHeader()) {
    gameStop();
    return;
  }
  if (checkSnakeEatFoot()) {
    snakeEatFoot();
  }
  renderSnake();
}
function checkSnakeEatFoot(): boolean {
  if (getSnakeByScene(0) == footIndex) {
    return true;
  }
  return false;
}
function snakeEatFoot() {
  let x = snakeTail.x;
  let y = snakeTail.y;
  snake.value.push({ x, y });
  createFoot();
}

function checkSnakeHeader(): boolean {
  for (let index = 1; index < snake.value.length; index++) {
    if (
      snake.value[0].x == snake.value[index].x &&
      snake.value[0].y == snake.value[index].y
    ) {
      tips.value = "撞到自己了";
      return false;
    }
  }
  if (snake.value[0].x >= row || snake.value[0].x < 0) {
    tips.value = "撞到墙了";
    return false;
  }
  if (snake.value[0].y >= col || snake.value[0].y < 0) {
    tips.value = "撞到墙了";
    return false;
  }
  return true;
}

let timer: number | null = null;
function gameStart() {
  snakeMove();
  if (timer) {
    return;
  }
  timer = window.setInterval(() => {
    snakeMove();
  }, 300);
}
function gameStop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 36px;
}
.game-scene {
  width: 200px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  .game-scene-item {
    width: v-bind(itemWidth);
    height: v-bind(itemHeight);
    border: 1px #fff solid;
    box-sizing: border-box;
  }
}
.ctl-btn-box {
  display: flex;
  justify-content: center;
}
.info-box {
  text-align: center;
  margin-bottom: 16px;
  font-size: 16px;
}
</style>
