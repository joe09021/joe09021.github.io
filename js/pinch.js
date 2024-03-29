var angleScale = {
  angle: 0,
  scale: 1
}
var gestureArea = document.getElementById('gesture-area')
var scaleElement = document.getElementById('scale-element')
var resetTimeout

interact(gestureArea)
  .gesturable({
    onstart: function (event) {
      angleScale.angle -= event.angle

      clearTimeout(resetTimeout)
      scaleElement.classList.remove('reset')
    },
    onmove: function (event) {
      // document.body.appendChild(new Text(event.scale))
      var currentAngle = event.angle + angleScale.angle
      var currentScale = event.scale * angleScale.scale

      scaleElement.style.webkitTransform =
      scaleElement.style.transform =
        'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')'

      // uses the dragMoveListener from the draggable demo above
      dragMoveListener(event)
    },
    onend: function (event) {
      angleScale.angle = angleScale.angle + event.angle
      angleScale.scale = angleScale.scale * event.scale

      resetTimeout = setTimeout(reset, 1000)
      scaleElement.classList.add('reset')
    }
  })
  .draggable({ onmove: dragMoveListener })

function reset () {
  scaleElement.style.webkitTransform =
    scaleElement.style.transform =
    'scale(1)'

  angleScale.angle = 0
  angleScale.scale = 1
}