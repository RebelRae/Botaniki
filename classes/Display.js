class Display {

  constructor(Width, Height) {
    this.width = Width
    this.height = Height
    this.createDisplay()
  }

  createDisplay() {
    let container = document.getElementById("container")
    container.innerHTML = ("<canvas id='canvas' width='" + this.width + "' height='" + this.height + "'></canvas>")
    this.context = document.getElementById("canvas").getContext("2d")
  }

  getWidth() {
    return this.width
  }

  getHeight() {
    return this.height
  }

  getContext() {
    return this.context
  }
}
