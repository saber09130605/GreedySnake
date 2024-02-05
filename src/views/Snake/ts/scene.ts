class Scene {
  private row: number;
  private col: number;
  private bgColor: string;
  private node: any;
  private itemArray: [];
  constructor(
    node: any,
    row: number = 20,
    col: number = 20,
    bg: string = "#efefef"
  ) {
    this.node = node;
    this.row = row;
    this.col = col;
    this.bgColor = bg;
    this.itemArray = [];
    this.init();
  }
  init() {
    let itemWidth = this.node.offsetWidth / this.row;
    let itemHeight = this.node.offsetHeight / this.col;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.createItem();
      }
    }
    console.log(this.node.offsetWidth);
    console.log("itemWidth:", itemWidth);
  }
  createItem() {
    //let item = document.create
  }
  test() {
    // console.log("测试row", this.row);
    // console.log("测试col", this.col);
  }
}

export { Scene };
