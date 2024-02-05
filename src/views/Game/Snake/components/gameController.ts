import { RandomNum } from "@/utils/utils";
import { cloneDeep } from "lodash";
export interface AxisPoint {
  x: number;
  y: number;
  color: string;
}
export class Actor {
  private x: number = 0;
  private y: number = 0;
  protected axisX: number = 0; //坐标轴
  protected axisY: number = 0; //坐标轴
  protected color: string = "green";
  protected shape: AxisPoint[] = [{ x: 0, y: 0, color: this.color }]; //形状
  constructor(axisX: number = 0, axisY: number = 0, color: string = "green") {
    this.setAxis(axisX, axisY);
    this.setColor(color);
  }
  //设置颜色
  setColor(color: string) {
    this.color = color;
  }
  getColor(): string {
    return this.color;
  }
  //设置坐标系
  setAxis(axisX: number, axisY: number) {
    this.axisX = axisX;
    this.axisY = axisY;
  }
  getShape(): AxisPoint[] {
    return this.shape;
  }
  //生成原点
  createPoint(): AxisPoint {
    this.x = RandomNum(0, this.axisX);
    this.y = RandomNum(0, this.axisY);
    // this.x = 2;
    // this.y = 2;
    this.shape.forEach((val) => {
      let isLegitimate =
        this.x + val.x < 0 ||
        this.x + val.x > this.axisX ||
        this.y + val.y < 0 ||
        this.y + val.y > this.axisY;
      if (isLegitimate) {
        // console.log("形状超出边界", val.x, val.y, this.axisX, this.axisY);
        return this.createPoint();
      }
    });
    let pAxisPoint: AxisPoint = {
      x: this.x,
      y: this.y,
      color: this.color,
    };
    return pAxisPoint;
  }
  getPoint(): AxisPoint {
    let pAxisPoint: AxisPoint = {
      x: this.x,
      y: this.y,
      color: this.color,
    };
    return pAxisPoint;
  }
  getCurRenderPointList(): AxisPoint[] {
    let pointList: AxisPoint[] = [];
    this.shape.forEach((val) => {
      let point: AxisPoint = {
        x: this.x + val.x,
        y: this.y + val.y,
        color: this.color,
      };
      pointList.push(point);
    });
    return pointList;
  }
  getNewRenderPointList(obstacleList: AxisPoint[]): AxisPoint[] {
    this.createPoint();
    let pointList: AxisPoint[] = [];
    for (let index = 0; index < this.shape.length; index++) {
      let val = this.shape[index];
      let point: AxisPoint = {
        x: this.x + val.x,
        y: this.y + val.y,
        color: this.color,
      };
      let isObstacle = obstacleList.some((element) => {
        return element.x == point.x && element.y == point.y;
      });
      if (isObstacle) {
        return this.getNewRenderPointList(obstacleList);
      }
      pointList.push(point);
    }
    return pointList;
  }
}

export class Food extends Actor {
  private shapeList: AxisPoint[][] = [
    [{ x: 0, y: 0, color: this.color }],
    [
      { x: 0, y: 0, color: this.color },
      { x: 1, y: 0, color: this.color },
      { x: 0, y: 1, color: this.color },
      { x: 1, y: 1, color: this.color },
    ],
    [
      { x: 0, y: 0, color: this.color },
      { x: 1, y: 0, color: this.color },
      { x: -1, y: 0, color: this.color },
      { x: 0, y: 1, color: this.color },
      { x: 0, y: -1, color: this.color },
      { x: 2, y: 0, color: this.color },
      { x: -2, y: 0, color: this.color },
      { x: 0, y: 2, color: this.color },
      { x: 0, y: -2, color: this.color },
      { x: 1, y: 1, color: this.color },
      { x: -1, y: 1, color: this.color },
      { x: -1, y: -1, color: this.color },
      { x: 1, y: -1, color: this.color },
    ],
  ];
  constructor(axisX: number = 0, axisY: number = 0, color: string = "green") {
    super(axisX, axisY, color);
  }
  setLevel(level: number = 0) {
    this.shape = this.shapeList[level] || this.shapeList[0];
  }
}

//运动方向
export enum SnakeDirection {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

export class Snake extends Actor {
  private bodyColor: string = "red";
  private direction: SnakeDirection = SnakeDirection.Right;
  private controller = {
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Left: "ArrowLeft",
  };
  constructor(axisX: number = 0, axisY: number = 0, color: string = "green") {
    super(axisX, axisY, color);
    this.setAddEventListenerKeyDown();
  }
  shape: AxisPoint[] = [
    { x: 3, y: 0, color: this.color },
    { x: 2, y: 0, color: this.bodyColor },
    { x: 1, y: 0, color: this.bodyColor },
    { x: 0, y: 0, color: this.bodyColor },
  ];
  //记录尾部残留坐标，用于吃食物
  private snakeTail: AxisPoint = this.shape[this.shape.length - 1];
  setBodyColor(color: string = "red") {
    this.bodyColor = color;
  }
  setDirection(direction: SnakeDirection) {
    let p0 = cloneDeep(this.shape[0]);
    let p1 = cloneDeep(this.shape[1]);
    switch (direction) {
      case SnakeDirection.Up:
        p0.y--;
        if (p0.y < 0) {
          p0.y = this.axisY;
        }
        break;
      case SnakeDirection.Down:
        p0.y++;
        if (p0.y > this.axisY) {
          p0.y = 0;
        }
        break;
      case SnakeDirection.Left:
        p0.x--;
        if (p0.x < 0) {
          p0.x = this.axisX;
        }
        break;
      case SnakeDirection.Right:
        p0.x++;
        if (p0.x > this.axisX) {
          p0.x = 0;
        }
        break;

      default:
        break;
    }

    if (p0.x == p1.x && p0.y == p1.y) {
      return;
    }
    this.direction = direction;
  }

  private setAddEventListenerKeyDown() {
    document.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (!this || !this.controller) {
        console.log("this", this);
        return;
      }
      let values = Object.values(this.controller);
      let index = values.indexOf(ev.code);
      if (index < 0) return;
      let keys = Object.keys(this.controller);
      switch (keys[index]) {
        case "Up":
          this.setDirection(SnakeDirection.Up);
          break;
        case "Right":
          this.setDirection(SnakeDirection.Right);
          break;
        case "Down":
          this.setDirection(SnakeDirection.Down);
          break;
        case "Left":
          this.setDirection(SnakeDirection.Left);
          break;

        default:
          break;
      }
    });
  }
  move() {
    this.snakeTail = this.shape[this.shape.length - 1];
    for (let index = this.shape.length - 1; index > 0; index--) {
      this.shape[index].x = this.shape[index - 1].x;
      this.shape[index].y = this.shape[index - 1].y;
    }
    switch (this.direction) {
      case SnakeDirection.Up:
        this.shape[0].y--;
        if (this.shape[0].y < 0) {
          this.shape[0].y = this.axisY;
        }
        break;
      case SnakeDirection.Down:
        this.shape[0].y++;
        if (this.shape[0].y > this.axisY) {
          this.shape[0].y = 0;
        }
        break;
      case SnakeDirection.Left:
        this.shape[0].x--;
        if (this.shape[0].x < 0) {
          this.shape[0].x = this.axisX;
        }
        break;
      case SnakeDirection.Right:
        this.shape[0].x++;
        if (this.shape[0].x > this.axisX) {
          this.shape[0].x = 0;
        }
        break;

      default:
        break;
    }
  }
}
