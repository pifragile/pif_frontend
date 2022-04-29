// To a potential reviwer:
// This script currently uses the fxhash infrastructure and is a prototype
// It will be no problem for me to adapt to artblocks PRG or other requirements


let cs = 2000;
let is;
let pg, pg2, pg3;
let grainShader;

let frequency;
let amplitude;

GR = 0.61803398875;

function preload() {
    // load the shader
    grainShader = loadShader("shader.vert", "shader.frag");
}

console.log(fxhash);
function setup() {
    num = fxhash.split("").reduce((acc, cur) => acc * cur.charCodeAt(0), 1);
    num = num / 10 ** 90;
    randomSeed(num);
    noiseSeed(num);

    pg = createGraphics(cs, cs);
    pg2 = createGraphics(cs, cs, WEBGL);
    pg.colorMode(HSB);

    baseHue = hueF(fxrand() * 360);
    hueStep = fxrand() * 10 + 0.1;

    frequency = 0.03 * fxrand();
    amplitude = 0.01 * fxrand();

    pg.background(0);

    let b = new Box(0, 0, cs, cs);

    pg.push();
    pg.noFill();
    pg.stroke(pg.color(hueF(baseHue), 100, 100));
    pg.stroke(0);
    pg.strokeWeight(b.w * 0.2 * GR);
    pg.rect(b.x, b.y, b.w, b.h);
    pg.pop();

    linesInBox(b);
}

// this does a very weird thing and should be considered
// garbage by every logical thinking human being
function hueF(h) {
    h = h % 360;
    return map(h, 0, 360, 160, 430) % 360;
}

let alpha = fxrand() * 0.6 + 0.6;
function linesInBox(b, numLines) {
    numLines = Math.round(fxrand() * 40 + 6);
    numLinesList = [6, 7, 8, 9, 10, 11, 12, 18];
    numLines = random(numLinesList);

    // baseHue = 165;
    // hueShift = 29;

    // baseHue = 140;
    // hueShift = 35;

    hueShift = map(fxrand(), 0, 1, 30, 40);

    hueShift *= map(numLines, 5, 45, 1, 0.3);
    pg.noStroke();

    let colorSteps = [];

    let base = fxrand() * 360;

    let numColors = random([4, 6, 9, 14, 22, 35, 56]);
    let colorsPerLine = random([2, 3, 4, 5]);
    // let colors = [...Array(numColors).keys()]
    //     .map((x) =>
    //         pg.color(
    //             (fxrand() * 50 + base) % 360,
    //             random([20, 50, 80 ,100, 100]),
    //             random([20, 50, 80 ,100, 100]),
    //             alpha
    //         )
    //     );

    palettes = [
        "https://coolors.co/c200fb-ec0868-fc2f00-ec7d10-ffbc0a-c4bbaf-3c0919-f6e8ea-22181c-312f2f",
        "https://coolors.co/ffa270-ffe7d6-fffbdb-ffee33-143d00-e0004f-660000",
        "https://coolors.co/02010a-04052e-140152-22007c-0d00a4-5bc0eb-adffde",
        "https://coolors.co/c40000-ff0e0a-3d0000-cc0000-290000-ff474a-530000",

        'https://coolors.co/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08',
    ];
    colors = random(palettes);
    //colors = palettes[1];
    colors = colors.split("https://coolors.co/")[1].split("-");
    colors = colors.map((x) => pg.color(`#${x}`));
    colors.forEach((c) => c.setAlpha(alpha));
    colors = shuffle(colors);
    //colors = colors.slice(5)
    let FULL = 0;
    let MIXED = 1;
    let MODE = random([FULL, MIXED, MIXED, MIXED]);
    //MODE = FULL;
    if (MODE == FULL) colorsPerLine = 4;
    for (let i = 0; i < numLines + colorsPerLine; i++) {
        switch (MODE) {
            case FULL:
                let h = hueF(baseHue + i * hueShift);
                colorSteps.push(pg.color(h, 100, 100, alpha));
                break;
            case MIXED:
                colorSteps.push(colors[i % colors.length]);
                break;
        }
    }

    let lineStep = 1 / (numLines + 1);

    let margin = 0.3 * GR;
    let [x1, y1] = b.coords(margin, margin);
    let subBox = new Box(
        x1,
        y1,
        b.w * (1 - 2 * margin),
        b.h * (1 - 2 * margin)
    );

    let w = subBox.h / (numLines - Math.round(fxrand() * numLines) + 1);
    w = map(fxrand(), 0, 1, 0.15, 0.5);

    let freq = fxrand() * 15 + 7;
    let ampl = b.w * 0.2 * fxrand();
    let lineWidth = map(fxrand(), 0, 1, 0.15, 0.5);

    w *= subBox.h;
    for (let i = 0; i < numLines; i++) {
        steps = colorSteps.slice(i, i + colorsPerLine);
        let y = lineStep * (i + 1);
        pg.push();
        pg.translate(sin(y * freq) * ampl, 0);
        shapeInBoxWithGradient(
            subBox,
            0.5 - 0.5 * lineWidth,
            y,
            0.5 + 0.5 * lineWidth,
            y,
            w,
            steps
        );
        pg.pop();
    }
}

function setImage() {
    clear();
    is = min(windowHeight, windowWidth);
    createCanvas(is, is);
    img = pg2.get();
    image(img, 0, 0, is, is);
}

let numShift = randomChoice([2, 3, 4]);
if (numShift == 2) space = randomChoice([0.03, 0.04, 0.05, 0.07, 0.3]);
if (numShift == 3) space = randomChoice([0.07, 0.3]);
if (numShift == 4) space = randomChoice([0.2, 0.3]);
console.log(numShift, space);

function shapeInBoxWithGradient(b, x1r, y1r, x2r, y2r, w, steps) {
    let a = pg.drawingContext.globalAlpha;
    for (let i = 1; i < numShift; i++) {
        let f = map(i, 0, numShift - 1, 0, space);

        pg.drawingContext.globalAlpha =
            pg.drawingContext.globalAlpha - a / numShift;

        lineInBoxWithGradient(b, x1r + f, y1r, x2r + f, y2r, w, steps);

        lineInBoxWithGradient(b, x1r - f, y1r, x2r - f, y2r, w, steps);
    }
    pg.drawingContext.globalAlpha = a;
    lineInBoxWithGradient(b, x1r, y1r, x2r, y2r, w, steps);
}

function lineInBoxWithGradient(b, x1r, y1r, x2r, y2r, w, steps) {
    gradient = getBoxGradient(b, x1r, y1r, x2r, y2r, steps);
    fillGradient(gradient);
    lineInBox(b, x1r, y1r, x2r, y2r, w);
}
let edges = randomChoice([0, 0.5, 1]);
function lineInBox(b, x1r, y1r, x2r, y2r, w) {
    let [x1, y1] = b.coords(x1r, y1r);
    let [x2, y2] = b.coords(x2r, y2r);

    // this only works with horizontal lines and is a nasty hack
    pg.rect(x1, y1 - 0.5 * w, x2 - x1, w, w * edges);
}

function getBoxGradient(b, x1r, y1r, x2r, y2r, steps) {
    let [x1, y1] = b.coords(x1r, y1r);
    let [x2, y2] = b.coords(x2r, y2r);
    return getGradient(x1, y1, x2, y2, steps);
}

function draw() {
    if (frameCount > 2) noLoop();
    grainShader.setUniform("u_resolution", [cs, cs]);
    grainShader.setUniform("u_background", pg);
    pg2.shader(grainShader);

    pg2.rect(0, 0, cs, cs);

    setImage();
    //if (frameCount > 2) save()
}

function getGradient(x1, y1, x2, y2, steps) {
    gradient = pg.drawingContext.createLinearGradient(x1, y1, x2, y2);

    s = 1 / (steps.length - 1);
    for (let i = 0; i < steps.length; i++) {
        gradient.addColorStop(i * s, steps[i]);
    }

    return gradient;
}

function fillGradient(g) {
    pg.drawingContext.fillStyle = g;
}

function strokeGradient(g) {
    pg.drawingContext.strokeStyle = g;
}

function randomChoice(arr) {
    return arr[Math.floor(fxrand() * arr.length)];
}

Box = class {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = createVector(x + w * 0.5, y + h * 0.5);
        this.tl = createVector(x, y);
        this.tr = createVector(x + w, y);
        this.br = createVector(x + w, y + h);
        this.bl = createVector(x, y + h);
        this.tc = createVector(x + w * 0.5, y);
        this.rc = createVector(x + w, y + h * 0.5);
        this.bc = createVector(x + w * 0.5, y + h);
        this.lc = createVector(x, y + h * 0.5);
    }
    gridify(gridWidth, gridHeight) {
        let grid = [];
        let boxWidth = this.w / gridWidth;
        let boxHeight = this.h / gridHeight;

        for (let i = 0; i < gridHeight; i++) {
            grid.push([]);
            for (let j = 0; j < gridWidth; j++) {
                grid[i].push(
                    new Box(
                        this.x + boxWidth * j,
                        this.y + boxHeight * i,
                        boxWidth,
                        boxHeight
                    )
                );
            }
        }
        return grid;
    }
    randomPoint() {
        return createVector(
            this.x + fxrand() * this.w,
            this.y + fxrand() * this.h
        );
    }

    coords(xRatio, yRatio) {
        let x = this.x + this.w * xRatio;
        let y = this.y + this.h * yRatio;
        return [x, y];
    }
};

function shiftVertex(v) {
    v.y += sin(v.x * frequency) * cs * amplitude; //noise(v.y * 0.01, v.x * 0.01) * 0.1
}

function shiftBox(box) {
    shiftVertex(box);
    shiftVertex(box.c);
    shiftVertex(box.tl);
    shiftVertex(box.tr);
    shiftVertex(box.br);
    shiftVertex(box.bl);
    shiftVertex(box.tc);
    shiftVertex(box.rc);
    shiftVertex(box.bc);
    shiftVertex(box.lc);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        pg2.save(`${fxhash}.png`);
    }
}

function windowResized() {
    setImage()
}