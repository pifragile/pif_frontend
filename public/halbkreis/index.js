////////////////////
//////Config
////////////////////
let cs = 2000;
let cs2 = cs * 0.5;
let palettes = [];
let permutePalettes = true;

////////////////////
//////Sketch
////////////////////
let paramSet = [
    {
        baseHue: 0,
        baseSat: 50,
        baseBri: 90,
        baseAlpha: 0.99,
        hueShift: 0.1,
        circleSat: 50,
        circleBri: 50,
        circleAlpha: 0.2,
        rectOff: 50,
        rectSat: 50,
        rectBri: 80,
        rectAlpha: 0.1,
    },
    {
        baseHue: 250,
        baseSat: 10,
        baseBri: 50,
        baseAlpha: 1,
        hueShift: 0.05,
        circleSat: 10,
        circleBri: 40,
        circleAlpha: 0.2,
        rectOff: 100,
        rectSat: 40,
        rectBri: 80,
        rectAlpha: 0.1,
    },
    {
        baseHue: 200,
        baseSat: 40,
        baseBri: 30,
        baseAlpha: 0.5,
        hueShift: 0.5,
        circleSat: 30,
        circleBri: 60,
        circleAlpha: 0.1,
        rectOff: 60,
        rectSat: 40,
        rectBri: 100,
        rectAlpha: 0.1,
    },
    {
        baseHue: 300,
        baseSat: 40,
        baseBri: 50,
        baseAlpha: 0.8,
        hueShift: 0.2,
        circleSat: 90,
        circleBri: 90,
        circleAlpha: 0.1,
        rectOff: 150,
        rectSat: 40,
        rectBri: 90,
        rectAlpha: 0.1,
    },
];

function makeSketch() {
    let params = random(paramSet);

    let {
        baseHue,
        baseSat,
        baseBri,
        baseAlpha,
        hueShift,
        circleSat,
        circleBri,
        circleAlpha,
        rectOff,
        rectSat,
        rectBri,
        rectAlpha,
    } = params;


    pg.colorMode(HSB);
    pg.blendMode(SOFT_LIGHT);
    let b = new Box(0, 0, cs, cs);
    pg.noStroke();
    pg.fill(baseHue, baseSat, baseBri, baseAlpha);
    b.rect();
    let h = baseHue;

    let yShift = random(0.5) + 0.7;
    for (let i = 0; i < 700; i++) {
        if (i % 5) {
            h = (h + hueShift) % 360;
            let a = random(PI) + PI;
            let r = random(cs2);
            let x = cs * 0.5 + cos(a) * r;
            let y = cs * yShift + sin(a) * r;
            pg.fill(h, circleSat, circleBri, circleAlpha);
            pg.circle(x, y, random(cs * 0.3));
        } else {
            pg.fill((baseHue + rectOff) % 360, rectSat, rectBri, rectAlpha);
            let p = b.randomPoint();
            pg.rect(p.x, p.y, random(b.w), random(b.h));
        }
    }
    let nf = random(100);
    nf = 0.003;
    pg.blendMode(BLEND);
    b.rotate(Math.floor(random(4)));
    pg.blendMode(HARD_LIGHT);

    let gx = Math.ceil(random(3));
    let gy = Math.ceil(random(6 - gx));

    if (random() < 0.5) {
        let tmp = gx;
        gx = gy;
        gy = tmp;
    }

    let grid = b.gridify(gx, gy);
    grid.forEach((r) =>
        r.forEach((bo) => bo.rotate(noise(bo.x * nf, bo.y * nf) * 1))
    );

    let g = pg.get()
    pg.blendMode(BLEND)
    pg.fill(100)
    b.rect()
    pg.image(g, 0, 0, cs, cs)
}
