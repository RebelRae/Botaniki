class Particle {
  constructor(xPos, yPos, zPos, radius, color, text) {
    this.text = text
    this.fontSize = 14
    this.opacity = 1.0
    this.x = xPos
    this.y = yPos
    this.z = zPos
    this.spawn = {
      x: Math.floor(Math.random()*(650-50+1)+50),
      y: Math.floor(Math.random()*(150-20+1)+20),
      z: Math.floor(Math.random()*(150-20+1)+20)
    }
    this.position = {
      x: xPos,
      y: yPos,
      z: zPos
    }
    this.radius = radius
    this.setColor(color)
    this.radians = Math.random()*Math.PI*2
    this.velocity = .001
  }

  setText(text) { this.text = text }
  setRadius(radius) { this.radius = radius }
  setVelocity(velocity) { this.velocity = velocity }
  setColor(color) { this.color = randomShade(color, this.opacity) }
  setNode(isNode) { this.isNode = isNode }
  setRadians(radians) { this.radians = radians}
  setSpawn(xSpawn, ySpawn, zSpawn) {
    this.spawn.x = xSpawn
    this.spawn.y = ySpawn
    this.spawn.z = zSpawn
  }
  setPosition(xPos, yPos, zPos) {
    this.x = xPos
    this.y = yPos
    this.z = zPos
  }

  // select(xTo, yTo, zTo, rTo, pTo, runV) {
  //   this.moving = true
  //   this.velocitySave = this.velocity
  //   this.velocity = runV
  //   this.xyzSave = {
  //     x: this.x,
  //     y: this.y,
  //     z: this.z
  //   }
  //   this.radiansSave = this.radians
  //   this.to = {
  //     x: xTo,
  //     y: yTo,
  //     z: zTo,
  //     r: rTo,
  //     p: pTo
  //   }
  // }
  //
  // moveSelect() {
  //   let xDiff = this.to.x-this.x
  //   if (Math.abs(xDiff) > 1)
  //     this.x += xDiff*this.velocity
  //   let yDiff = this.to.y-this.y
  //   if (Math.abs(yDiff) > 1)
  //     this.y += yDiff*this.velocity
  //   let zDiff = this.to.z-this.z
  //   if (Math.abs(zDiff) > 1)
  //     this.z += zDiff*this.velocity
  //   let rDiff = this.to.r-this.radius
  //   if (Math.abs(rDiff) > 1)
  //     this.radius += rDiff*this.velocity
  //   if (Math.abs(xDiff)<1 && Math.abs(yDiff)<1 && Math.abs(zDiff)<1 && Math.abs(rDiff)<1) {
  //     this.moving = false
  //     this.velocity = this.velocitySave
  //     console.log("done");
  //   }
  // }

  draw(context) {
    if (this.isNode) {
      context.beginPath()
      context.fillStyle = this.color
      context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
      context.fill()
      let gradient = context.createRadialGradient(this.position.x, this.position.y, this.radius/3*1.5, this.position.x, this.position.y, this.radius)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, .5)')
      context.fillStyle = gradient
      context.font = this.fontSize + "px FontAwesome"
      let textWidth = context.measureText(this.text).width
      context.beginPath()
      context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
      context.fill()
      context.fillStyle = background
      context.fillText(this.text, this.position.x-textWidth/2, this.position.y+this.fontSize/2)
    } else {
      context.beginPath()
      context.fillStyle = this.color
      context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
      context.fill()
    }
  }

  update(context) {
    this.radians += this.velocity
    if (!this.isNode) {
      this.position.x = this.x + (Math.cos(this.radians)*this.spawn.x)
      this.position.y = this.y + (Math.sin(this.radians)*this.spawn.y)
      this.position.z = this.z + (Math.sin(this.radians)*this.spawn.z)
    } else {
      this.position.x = this.x + (Math.cos(this.radians)*this.spawn.x)
      this.position.y = this.y + (Math.sin(this.radians)*this.spawn.y)
      this.position.z = this.z + (Math.sin(this.radians)*this.spawn.z)
    }
    this.draw(context)
  }
}
