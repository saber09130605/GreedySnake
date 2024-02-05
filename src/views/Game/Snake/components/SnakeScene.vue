<template>
  <Scene
    :width="202"
    :height="200"
    :class="[isBorder ? 'snake-scene' : '']"
    ref="sceneNode"
  ></Scene>
</template>

<script setup lang="ts">
import Scene, { API as SceneAPI } from "@/components/game/Scene.vue";
import {
  ref,
  onMounted,
  defineProps,
  computed,
  ComputedRef,
  defineExpose,
} from "vue";
import { Food, Snake } from "./gameController";
import type { AxisPoint } from "./gameController";
export interface API {
  initFood: Function;
}
const sceneNode = ref<SceneAPI | null>(null);
const level = ref<number>(1);

const isBorder: ComputedRef<boolean> = computed(() => {
  return level.value > 1;
});

// let obstacleList: AxisPoint[] = [];

let curFood = new Food();
let palyer1 = new Snake();
let timer = null;
onMounted(() => {
  if (sceneNode.value) {
    let axis = sceneNode.value.getAxis();
    palyer1.setAxis(axis.axisX, axis.axisY);
    randerSnake();

    timer = setInterval(() => {
      if (sceneNode.value) {
        let m = palyer1.getShape();
        sceneNode.value.clearPointList([...m]);
        palyer1.move();
        m = palyer1.getShape();
        sceneNode.value.renderPointList([...m]);
      }
    }, 300);
    // curFood.setAxis(axis.axisX, axis.axisY);
    // initFood();
  }
});

const randerSnake = () => {
  if (!sceneNode.value) {
    return;
  }

  let m = palyer1.getShape();

  sceneNode.value.renderPointList([...m]);
};

// const initFood = () => {
//   if (!sceneNode.value) {
//     return;
//   }
//   sceneNode.value.clearPointList(curFood.getCurRenderPointList());
//   let m = curFood.getNewRenderPointList([]);
//   sceneNode.value.renderPointList([...m]);
// };

// defineExpose({
//   initFood,
// });
</script>

<style scoped lang="scss">
.snake-scene {
  border: 1px #000 solid;
}
</style>
