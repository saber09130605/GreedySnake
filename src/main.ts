import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// vue-router 路由管理
import { router } from "./router";
app.use(router);

//引入element
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
// import locale from "element-plus/lib/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// import "./assets/ShuSiSDK/ShuSi.umd";
// console.log({ ShuSi });

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// app.directive("drag", {
//   mounted(el: HTMLElement) {
//     el.onclick = () => {
//       console.log("onclick");
//     };
//     el.onmousedown = function (e: MouseEvent) {
//       function isDragArea(node: HTMLElement, spot: MouseEvent) {
//         let Box: DOMRect = node.getBoundingClientRect(); //获取元素位置
//         if (
//           spot.clientX < Box.left ||
//           spot.clientX > Box.right ||
//           spot.clientY < Box.top
//         ) {
//           return false;
//         } else {
//           return true;
//         }
//       }
//       let event: MouseEvent = e || window.event;

//       if (!isDragArea(el, event)) {
//         return;
//       }
//       e.stopPropagation();
//       e.preventDefault();
//       let disx: number = event.pageX - el.offsetLeft;
//       let disy: number = event.pageY - el.offsetTop;
//       document.onmousemove = function (e: MouseEvent) {
//         e.stopPropagation();
//         //拖拽ing
//       };
//       document.onmouseup = function () {
//         document.onmousemove = document.onmouseup = null;
//       };
//       console.log("onmousedown");
//     };
//   },
// });

app.mount("#app");
