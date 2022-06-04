let cs = 2000
let is
let pg

let m0, m1, m2, m3, m4, m5

function truncate(i) {
  return max(min(i, 1), 0)
}
function getParam(p) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get(p)
    if(param) {
        return truncate(parseFloat(param))
    }
    return null
}

let anim=false
function setup() {
    pg = createGraphics(cs, cs)
    pg.colorMode(HSB)
    pg.pixelDensity(1);

    window.editart_m0 = getParam('m0')
    window.editart_m1 = getParam('m1')
    window.editart_m2 = getParam('m2')
    window.editart_m3 = getParam('m3')
    window.editart_m4 = getParam('m4')
    anim = Boolean(getParam('anim'))
}

function setImage() {
    clear();
    is = min(windowHeight, windowWidth);
    createCanvas(is, is);
    copy(pg, 0, 0, cs, cs, 0, 0, is, is);
}



function draw() {
    pg.clear()
    pg.noStroke()
    m0 = window.parent.editart_m0 || window.editart_m0
    m1 = window.parent.editart_m1 || window.editart_m1
    m2 = window.parent.editart_m2 || window.editart_m2
    m3 = window.parent.editart_m3 || window.editart_m3
    m4 = window.parent.editart_m4 || window.editart_m4
    pg.background(m0 * 360, 100, 100)
    pg.fill(m1 * 360, 100, 100)
    if (anim) {
        pg.circle(m2 * cs + frameCount % 200, m3 * cs, m4 * cs)
    }else {
        pg.circle(m2 * cs, m3 * cs, m4 * cs)
    }
    setImage()
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    save()
  }
}

  function windowResized() {
    setImage()
}