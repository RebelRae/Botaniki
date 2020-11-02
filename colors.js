let alpha = 'rgba(0,0,0,0)'
let black = 'rgba(0,0,0,1)'
let white = 'rgba(255,255,255,1)'
let background = '#383838'
let bgcyan = '#003838'
let bgmagenta = '#380038'
let bgyellow = '#383800'
let lavender = '#ad7ff6'// rgba(173, 127, 246, 1)
let red = '#ff0000'
let green = '#00ff00'
let blue = '#0000ff'
let intensity = 60
let hueMin = 70
let hueMax = 200

randomShade = function(color, opacity) {
  switch (color) {
    case "Red":
      return 'rgba(' + Math.floor(Math.random()*(hueMax-hueMin+1)+hueMin) + ', ' + intensity + ', ' + intensity + ', ' + opacity + ')'
      break;
    case "Green":
      return 'rgba(' + intensity + ', ' + Math.floor(Math.random()*(hueMax-hueMin+1)+hueMin) + ', ' + intensity + ', ' + opacity + ')'
      break;
    case "Blue":
      return 'rgba(' + intensity + ', ' + intensity + ', ' + Math.floor(Math.random()*(hueMax-hueMin+1)+hueMin) + ', ' + opacity + ')'
      break;
    default:
      return color
  }
}
