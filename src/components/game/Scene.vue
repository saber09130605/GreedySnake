<template>
  <div class="game-scene">
    <div class="game-content">
      <div
        class="game-scene-item"
        v-for="item in sceneItemList"
        :style="{ backgroundColor: item.bgColor }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed, defineExpose } from "vue";

import type { AxisPoint } from "../../views/Game/Snake/components/gameController";
//抛出类型，ts需要
export interface API {
  getAxis: Function;
  renderPoint: Function;
  clearPoint: Function;
  renderPointList: Function;
  clearPointList: Function;
}
//获取坐标系
const getAxis = () => {
  return {
    axisX: props.row - 1,
    axisY: props.col - 1,
  };
};
const setPoint = (point: AxisPoint, color: string) => {
  let index: number = point.x + point.y * props.col;
  if (sceneItemList.value[index]) {
    sceneItemList.value[index].bgColor = color;
  } else {
    console.log("非法坐标", point.x, point.y);
  }
};
//渲染点
const renderPoint = (point: AxisPoint) => {
  setPoint(point, point.color);
};
const renderPointList = (pointList: AxisPoint[]) => {
  pointList.forEach((element) => {
    renderPoint(element);
  });
};
//清除点
const clearPoint = (point: AxisPoint) => {
  setPoint(point, props.sceneBgColor);
};
const clearPointList = (pointList: AxisPoint[]) => {
  pointList.forEach((val) => {
    clearPoint(val);
  });
};
//抛出给外部使用
defineExpose({
  getAxis,
  renderPoint,
  renderPointList,
  clearPoint,
  clearPointList,
});
const props = defineProps({
  row: {
    type: Number, //列数
    default: 20,
  },
  col: {
    type: Number, //行数
    default: 20,
  },
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 200,
  },
  itemWidth: {
    type: Number,
    default: 10,
  },
  itemHeight: {
    type: Number,
    default: 10,
  },
  sceneBgColor: {
    type: String,
    default: "#efefef",
  },
});

const sceneWidth = computed(() => {
  return props.width + "px";
});
const sceneHeight = computed(() => {
  return props.height + "px";
});

const itemWidth = computed(() => {
  return props.itemWidth + "px";
});
const itemHeight = computed(() => {
  return props.itemHeight + "px";
});

const contentWidth = ref<string>("0px");

interface SceneItem {
  bgColor: string;
}
let sceneItemList = ref<SceneItem[]>([]);
gameStart();
//游戏开始
function gameStart() {
  contentWidth.value = props.row * props.itemWidth + "px";
  initScene();
}

//初始化场景
function initScene() {
  sceneItemList.value = [];
  for (let i = 0; i < props.row; i++) {
    for (let j = 0; j < props.col; j++) {
      let m: SceneItem = {
        bgColor: props.sceneBgColor,
      };
      sceneItemList.value.push(m);
    }
  }
}
</script>

<style scoped lang="scss">
.game-scene {
  width: v-bind(sceneWidth);
  height: v-bind(sceneHeight);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  background-color: #f7f8fa;
  .game-content {
    display: flex;
    flex-wrap: wrap;
    width: v-bind(contentWidth);
    .game-scene-item {
      width: v-bind(itemWidth);
      height: v-bind(itemHeight);
      border: 1px #fff solid;
      box-sizing: border-box;
    }
  }
}
</style>
