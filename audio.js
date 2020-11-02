var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

function boop() {
  let oscillator = audioCtx.createOscillator()
  oscillator.connect(audioCtx.destination)
  oscillator.type = 'triangle'
  let startTime = audioCtx.currentTime
  let frequencyMax = Math.floor(Math.random()*(9000-4000+1)+4000)
  oscillator.frequency.setValueAtTime(frequencyMax, startTime)
  oscillator.start()
  oscillator.stop(startTime+.05)
}

function tick() {
  let oscillator = audioCtx.createOscillator()
  oscillator.connect(audioCtx.destination)
  oscillator.type = 'sine'
  let startTime = audioCtx.currentTime
  let frequencyMax = 500
  oscillator.frequency.setValueAtTime(frequencyMax, startTime)
  oscillator.start()
  oscillator.stop(startTime+.02)
}
