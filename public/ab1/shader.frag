#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform vec2 u_resolution;
uniform sampler2D u_background;

float random (vec2 st, float f) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233) * f))*
        43758.5453123);
}

float PHI = 1.61803398874989484820459;  // Φ = Golden Ratio   

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}


float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}


void main() {

  // position of the pixel divided by resolution, to get normalized positions on the canvas
  vec2 st = gl_FragCoord.xy/u_resolution.xy; 


  
  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  vec4 tex = texture2D(u_background, uv);

  // try the green component
  float range = 0.1;
  float r = map(random(vTexCoord, 2.5) + random(vTexCoord, 3.14) + random(vTexCoord, 2.), 0., 3., -range, range);

  gl_FragColor = vec4(tex.r + r, tex.g + r, tex.b + r, tex.a);

}