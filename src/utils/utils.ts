//范围内随机数
export function RandomNum(Min: number, Max: number): number {
  let Range: number = Max - Min;
  let Rand: number = Math.random();
  let num: number = Min + Math.floor(Rand * Range); //舍去
  return num;
}

//file图片转base64
export async function fileToBase64(file: File) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = function (evt) {
      if (!evt || !evt.target) {
        reject();
        return;
      }
      let base64: string | ArrayBuffer | null = evt.target.result;
      resolve(base64);
    };
    reader.readAsDataURL(file);
  });
}
//base64转file图片
export function convertBase64UrlToFile(base64: string, fileName: string) {
  let parts = base64.split(";base64,");
  let contentType = parts[0].split(":")[1];
  let raw = window.atob(parts[1]); //解码一个已经被base-64编码过的数据，即解码Base64编码的字符串
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; i++) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new File([uInt8Array], fileName, { type: contentType });
}

//全屏切换
export function onFullScreen() {
  let cfs = document as any;
  /*判断是否全屏*/
  let isFullscreen =
    cfs.fullScreenElement || //W3C
    cfs.msFullscreenElement || //IE
    cfs.mozFullScreenElement || //火狐
    cfs.webkitFullscreenElement || //谷歌
    false;
  if (!isFullscreen) {
    let el = document.documentElement as any;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  } else {
    if (cfs.exitFullscreen) {
      cfs.exitFullscreen();
    } else if (cfs.msExitFullscreen) {
      cfs.msExitFullscreen();
    } else if (cfs.mozCancelFullScreen) {
      cfs.mozCancelFullScreen();
    } else if (cfs.webkitCancelFullScreen) {
      cfs.webkitCancelFullScreen();
    }
  }
}
