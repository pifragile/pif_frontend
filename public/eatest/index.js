let pg;
let cs = 2000;

function setup() {
    is = min(windowHeight, windowWidth);
    createCanvas(is, is)
    pg = createGraphics(cs, cs);
    pg.colorMode(HSB);
    pg.pixelDensity(1);
}

function setImage() {
    clear();
    is = min(windowHeight, windowWidth);
    resizeCanvas(is, is);
    copy(pg, 0, 0, cs, cs, 0, 0, is, is);
}

function draw() {
    noLoop();
    pg.clear();
    pg.noStroke();

    pg.background(m0 * 360, 100, 100);
    pg.fill(m1 * 360, 100, 100);

    pg.circle(m2 * cs, m3 * cs, m4 * cs);
    setImage();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        save();
    }
}

function windowResized() {
    setImage();
}