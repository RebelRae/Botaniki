//----------  Display ----------//
var canvas = new Display(window.innerWidth, window.innerHeight)
var context = canvas.getContext()
var WIDTH = canvas.width
var HEIGHT = canvas.height

//---------- Firebase ----------//
// var database = firebase.database()
// var kingdomsRef = database.ref("kingdoms")
// var ref = database.ref("tests")

//---------- Initialize ----------//
var gradientBGT = context.createLinearGradient(0, 0, 0, HEIGHT)
gradientBGT.addColorStop(0, black)
gradientBGT.addColorStop(.35, alpha)
gradientBGT.addColorStop(1, alpha)
var gradientBGB = context.createLinearGradient(0, HEIGHT, 0, 0)
gradientBGB.addColorStop(0, black)
gradientBGB.addColorStop(.5, alpha)
gradientBGB.addColorStop(1, alpha)

var domains = ["Prokaryotes", "Eukaryotes"]
var kingdoms = ["Bacteria", "Archaea", "Protozoa", "Chromista", "Plantae", "Fungi", "Animalia"]
var nodeLayers = [
  domains,
  []
]

var mouse = {
  x: 0,
  y: 0
}
var cursor = {
  x: 0,
  y: 0
}

// kingdomsRef.once("value", function(snapshot) {
//   snapshot.forEach(function(kingdom) {
//     // TODO : set each of their radians
//     let node = new Particle(WIDTH/2, HEIGHT/2, 0, 50, "Green", kingdom.key)
//     node.setVelocity(.001)
//     node.setColor('rgba(60, 129, 113, .85)')
//     node.setNode()
//     node.setRadians(2/rads)
//     particles.push(node)
//     numNodesN++
//     rads++
//   })
//   for (var i = 0; i < kingdoms.length; i++) {
//     console.log(kingdoms[i].text);
//   }
// })

//---------- Particle System ----------//
var particles = []
for (var i = 0; i < 400; i++) {
  let particle = new Particle(WIDTH/2, HEIGHT/2, 0, Math.floor(Math.random()*(5-2+1)+2), "Green", "")//xPos, yPos, zPos, radius, color, text
  particles.push(particle)
}

var lifeNode = particles[299]
lifeNode.setColor('rgba(40, 220, 100, .85)')
lifeNode.setText("Life")
lifeNode.setRadius(50)
lifeNode.setSpawn(10, 10, 0)
lifeNode.setNode(true)

for (var i = 0; i < 7; i++) {
  let particle = particles[300+i]
  particle.setColor('rgba(40, 140, 100, .85)')
  particle.setText(kingdoms[i])
  particle.setRadius(Math.floor(Math.random()*(55-45+1)+45))
  particle.setSpawn(250, 120, 150)
  particle.setRadians((2*Math.PI/7)*i)
  particle.setNode(true)
}

var helpNode = particles[0]
helpNode.setColor('rgba(60, 190, 255, .75)')
helpNode.setText("\uF128")
helpNode.setVelocity(.01)
helpNode.setSpawn(10, 10, 0)
helpNode.setNode(true)
// below
helpNode.setRadius(20)
helpNode.setPosition(WIDTH-40, 40, 999)
// helpNode.select(WIDTH-40, 40, 999, 20, 0, .1)

var cursorParticles = []
for (var i = 0; i < 4; i++) {
  let mouseNode = new Particle(mouse.x, mouse.y, 999, "Green", "")
  mouseNode.setColor('rgba(60, 190, 255, .95)')
  mouseNode.setRadius(2)
  mouseNode.setRadians((2*Math.PI/4)*i)
  mouseNode.setVelocity(.05)
  mouseNode.setSpawn(10, 10, 10)
  mouseNode.setPosition(WIDTH/2, HEIGHT/2, 999)
  cursorParticles.push(mouseNode)
}

var selection = new Particle(0, 0, 0, "", "")

//---------- User Inputs ----------//
addEventListener('mousemove', event => {
  this.mouse.x = event.clientX
  this.mouse.y = event.clientY
})
addEventListener('click',  event => {
  if (!selection.isNode)
  return
  click()
  switch (selection) {
    case helpNode:
      console.log("help node clicked")
      tick()
      break
    default:
      break
  }
})
addEventListener("keydown", event => {
  // console.log("Key " + event.keyCode + " pressed")
  switch (event.keyCode) {
    case 1:
      // do something for key 1
      break;
    default:
      break;
  }
})

//---------- Animatioons ----------//

//---------- Process Loop ----------//
function processLoop(timestamp) {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = gradientBGT
  context.fillRect(0, 0, WIDTH, HEIGHT)
  context.fillStyle = gradientBGB
  context.fillRect(0, 0, WIDTH, HEIGHT)
  particles.sort(function(a, b){ return a.position.z-b.position.z })
  let mouseOn = new Particle(0, 0, 0, "", "")
  particles.forEach(particle => {
    particle.update(context)
    if (particle.isNode) {
      let distX = particle.position.x - mouse.x
      let distY = particle.position.y - mouse.y
      if (distX*distX + distY*distY <= particle.radius*particle.radius)
        mouseOn = particle
      if (particle.moving)
        particle.moveSelect()
    }
  })
  cursorParticles.forEach((particle, i) => {
    if (selection.isNode) {
      particle.setPosition(selection.position.x, selection.position.y, 999)
      particle.setSpawn(selection.radius+5, selection.radius+5, 10)
    } else {
      particle.setPosition(mouse.x, mouse.y, 999)
      particle.setSpawn(10, 10, 10)
    }
    particle.update(context)
  })

  if (selection != mouseOn) {
    selection = mouseOn
    if (selection.isNode)
      boop()
  }

  requestAnimationFrame(processLoop)
}

processLoop()
