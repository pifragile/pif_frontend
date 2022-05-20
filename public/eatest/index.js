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
    return truncate(parseFloat(urlParams.get(p)))
}

function setup() {
    pg = createGraphics(cs, cs)
    pg.colorMode(HSB)
    pg.pixelDensity(1);

    window.editart_m0 = getParam('m0')
    window.editart_m1 = getParam('m1')
    window.editart_m2 = getParam('m2')
    window.editart_m3 = getParam('m3')
    window.editart_m4 = getParam('m4')

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
    m0 = window.editart_m0
    m1 = window.editart_m1
    m2 = window.editart_m2
    m3 = window.editart_m3 
    m4 = window.editart_m4
    pg.background(m0 * 360, 100, 100)
    pg.fill(m1 * 360, 100, 100)
    pg.circle(m2 * cs, m3 * cs, m4 * cs)
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