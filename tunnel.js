const $ = (sel) => document.querySelector(sel) || {}
const regl = createREGL()
const $code = (sel) => (
  document.getElementById(sel) || {}
).textContent || "void main() {}"



const drawFrame = regl({
  frag: $code('fragmentShader'),
  vert: $code('vertexShader'),
  
  attributes: {
    position: [[-1,-1],
               [-1, 1],
               [ 1,-1],
               [ 1,-1],
               [-1, 1],
               [ 1, 1]]
  },
  
  uniforms: {
    color: [1,0,0],
    width: ctx => ctx.viewportWidth,
    height: ctx => ctx.viewportHeight,
    ringDistance: ctx => parseFloat($('#ringDistance').value),
    maxRings: ctx => parseInt($('#maxRings').value),
    waveCount: ctx => parseInt($('#waveCount').value),
    waveDepth: ctx => parseFloat($('#waveDepth').value),
    yCenter: ctx => parseFloat($('#yCenter').value),
    direction: ctx => parseFloat($('#direction').value),
    time: ctx => ctx.tick
  },
  
  count: 6
})

regl.frame(ctx => {
  regl.clear({
    color: [1,1,1,1],
    depth: 1
  })
  drawFrame()
})
