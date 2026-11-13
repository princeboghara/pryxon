/**
 * Originkit "Cloud Sky" WebGL Component
 * Procedural atmospheric GPU cloud sky with wind, volumetric shading, and mouse parallax
 */

(function () {
  const MAX_DPR = 1.0;
  const PUFF_UP = 0.34;
  const PUFF_DOWN = 0.19;
  const ERODE = 0.7;
  const SHADOW_STEP = 0.085;
  const NEAR_CELL = 1.05;
  const FAR_CELL = 2.15;
  const FAR_MIX = 0.55;
  const NEAR_DRIFT = 0.055;
  const FAR_DRIFT = 0.026;
  const CIRRUS_DRIFT = 0.014;
  const PUFF_WMAX = 2.15;
  const SHADE_BLEND = 12.0;

  const VERT_SRC = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

  const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uNearX, uFarX, uCirrusX;
uniform float uCoverage, uSize, uSoftness, uShadow, uCirrus;
uniform vec3 uZenith, uHorizon, uCloud;
uniform vec4 uGlow;
uniform vec2 uSun;
uniform vec2 uParallax;

vec2 hash22(vec2 p){
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy);
}

float hash12(vec2 p){
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float vnoise(vec2 x){
  vec2 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), f.x),
             mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p){
  float a = 0.55, s = 0.0;
  for (int i = 0; i < 3; i++){
    s += a * vnoise(p);
    p *= 2.04;
    a *= 0.5;
  }
  return s;
}

vec2 blobs(vec2 uv, float seed){
  vec2 id = floor(uv), f = fract(uv);
  float best = -1e4;
  float wsum = 0.0, ysum = 0.0;
  float wMax = min(${PUFF_WMAX.toFixed(3)}, 0.72 * uSize);

  for (int j = -1; j <= 1; j++){
    for (int i = -1; i <= 1; i++){
      vec2 o = vec2(float(i), float(j));
      vec2 h = hash22(id + o + seed);
      if (fract(h.x * 37.1) > uCoverage) continue;
      vec2 c = o + 0.15 + h * 0.7;
      float w = min(${PUFF_WMAX.toFixed(3)}, (0.30 + 0.42 * fract(h.y * 19.7)) * uSize);
      vec2 d = f - c;
      float ry = (d.y > 0.0 ? ${PUFF_UP.toFixed(3)} : ${PUFF_DOWN.toFixed(3)}) * uSize * (0.8 + 0.5 * fract(h.y * 7.3));
      float e = length(vec2(d.x / max(w, 1e-3), d.y / max(ry, 1e-3)));
      float val = 1.0 - e;
      float yN = d.y / max(ry, 1e-3);
      if (val > best){
        float k = exp(${SHADE_BLEND.toFixed(1)} * (best - val));
        wsum = wsum * k + 1.0;
        ysum = ysum * k + yN;
        best = val;
      } else {
        float g = exp(${SHADE_BLEND.toFixed(1)} * (val - best));
        wsum += g;
        ysum += g * yN;
      }
    }
  }
  return vec2(best, ysum / max(wsum, 1e-4));
}

vec2 cloudField(vec2 uv, float seed, float detailScale){
  vec2 b = blobs(uv, seed);
  float n = fbm(uv * detailScale + seed * 3.1) * 0.72
          + fbm(uv * detailScale * 3.3 + seed * 7.7) * 0.28;
  return vec2(b.x - (1.0 - n) * ${ERODE.toFixed(3)}, b.y);
}

vec3 shadeCloud(float dyNorm, vec3 sky){
  float t = smoothstep(-0.95, 0.25, dyNorm);
  vec3 base = mix(uCloud * 0.52, sky, 0.34);
  return mix(mix(uCloud, base, uShadow), uCloud, t);
}

void main(){
  vec2 frag = gl_FragCoord.xy / max(uRes.y, 1.0);
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(frag.x, frag.y);

  // Sky
  vec3 sky = mix(uHorizon, uZenith, smoothstep(-0.15, 1.05, p.y));
  vec2 sunP = vec2(uSun.x * aspect, uSun.y);
  float sd = length(p - sunP);
  sky += uGlow.rgb * uGlow.a * exp(-sd * 3.4) * 0.30;

  vec3 col = sky;

  // Cirrus veil
  if (uCirrus > 0.0) {
    vec2 cuv = vec2(p.x * 1.4 + uCirrusX, p.y * 5.5);
    float veil = fbm(cuv) * fbm(cuv * 2.3 + 9.0);
    veil = smoothstep(0.24, 0.55, veil) * smoothstep(0.15, 0.7, p.y);
    col = mix(col, uCloud, veil * uCirrus * 0.5);
  }

  // Far cumulus layer
  vec2 fuv = vec2(p.x + uFarX, p.y) * ${FAR_CELL.toFixed(3)} + uParallax * 0.4;
  vec2 fd = cloudField(fuv, 17.0, 11.0);
  float fa = clamp(fd.x * uSoftness, 0.0, 1.0);
  if (fa > 0.0) {
    vec3 lit = shadeCloud(fd.y, sky);
    col = mix(col, mix(lit, sky, ${FAR_MIX.toFixed(3)}), fa);
  }

  // Near cumulus layer
  vec2 nuv = vec2(p.x + uNearX, p.y) * ${NEAR_CELL.toFixed(3)} + uParallax;
  vec2 nd = cloudField(nuv, 3.0, 8.5);
  float na = clamp(nd.x * uSoftness, 0.0, 1.0);
  if (na > 0.0) {
    vec3 lit = shadeCloud(nd.y, sky);
    float above = clamp(cloudField(nuv + vec2(0.0, ${SHADOW_STEP.toFixed(3)}), 3.0, 8.5).x * uSoftness, 0.0, 1.0);
    lit *= 1.0 - 0.18 * uShadow * above;
    lit += uGlow.rgb * uGlow.a * 0.22 * exp(-length(p - sunP) * 1.6);
    col = mix(col, lit, na);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error("CloudSky shader error:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function parseColor(input, fb) {
    if (!input) return fb;
    const str = String(input).trim();
    if (str.charAt(0) === "#") {
      let hex = str.slice(1);
      if (hex.length === 3 || hex.length === 4) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + (hex.length === 4 ? hex[3] + hex[3] : "");
      }
      if (hex.length >= 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const a = hex.length >= 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255, a];
      }
      return fb;
    }
    const m = str.match(/[\d.]+/g);
    if (m && m.length >= 3) {
      return [
        Math.min(255, parseFloat(m[0])) / 255,
        Math.min(255, parseFloat(m[1])) / 255,
        Math.min(255, parseFloat(m[2])) / 255,
        m.length >= 4 ? Math.min(1, parseFloat(m[3])) : 1
      ];
    }
    return fb;
  }

  function initCloudSky(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false }) ||
               canvas.getContext("experimental-webgl");
    if (!gl) {
      console.warn("CloudSky: WebGL not supported");
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("CloudSky program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Full-screen triangle covering canvas
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const locs = {};
    const u = (name) => {
      if (!(name in locs)) locs[name] = gl.getUniformLocation(prog, name);
      return locs[name];
    };

    const opts = Object.assign({
      zenith: "#0284c7",     // Vibrant sky blue matching brand
      horizon: "#cce4f7",    // Soft horizon sky
      cloud: "#ffffff",      // Crisp white clouds
      glow: "rgba(255, 255, 255, 0.95)",
      coverage: 0.58,        // Cloud density
      speed: 1.1,            // Drift speed
      size: 1.25,            // Cloud size
      softness: 2.2,         // Fluffy soft edges
      shadow: 0.65,          // Soft natural depth shading
      cirrus: 0.55,          // High wispy cirrus veil
      sunX: 0.85,
      sunY: 0.92,
      parallax: 1.8,         // Mouse parallax response
      wind: 1.6,             // Mouse wind acceleration
      damping: 35
    }, options);

    let last = performance.now();
    let nearX = 0;
    let farX = 0;
    let cirrusX = 0;
    let leanX = 0;
    let leanY = 0;
    const ptr = { x: 0, y: 0, inside: false };

    function render(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const k = 1 - Math.exp(-opts.damping * 0.12 * dt);
      leanX += ((ptr.inside ? ptr.x : 0) - leanX) * k;
      leanY += ((ptr.inside ? ptr.y : 0) - leanY) * k;

      const gust = 1 + leanX * opts.wind;
      const rate = opts.speed * gust;
      nearX = (nearX - NEAR_DRIFT * rate * dt) % 1000;
      farX = (farX - FAR_DRIFT * rate * dt) % 1000;
      cirrusX = (cirrusX - CIRRUS_DRIFT * rate * dt) % 1000;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = canvas.clientWidth || window.innerWidth;
      const ch = canvas.clientHeight || window.innerHeight;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));

      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, bw, bh);

      const zen = parseColor(opts.zenith, [0.01, 0.52, 0.78, 1]);
      const hor = parseColor(opts.horizon, [0.8, 0.89, 0.97, 1]);
      const cld = parseColor(opts.cloud, [1, 1, 1, 1]);
      const glow = parseColor(opts.glow, [1, 1, 1, 0.95]);

      gl.uniform2f(u("uRes"), bw, bh);
      gl.uniform1f(u("uNearX"), nearX);
      gl.uniform1f(u("uFarX"), farX);
      gl.uniform1f(u("uCirrusX"), cirrusX);
      gl.uniform1f(u("uCoverage"), opts.coverage);
      gl.uniform1f(u("uSize"), opts.size);
      gl.uniform1f(u("uSoftness"), opts.softness);
      gl.uniform1f(u("uShadow"), opts.shadow);
      gl.uniform1f(u("uCirrus"), opts.cirrus);
      gl.uniform2f(u("uSun"), opts.sunX, opts.sunY);
      gl.uniform2f(u("uParallax"), -leanX * opts.parallax * 0.07, -leanY * opts.parallax * 0.05);
      gl.uniform3f(u("uZenith"), zen[0], zen[1], zen[2]);
      gl.uniform3f(u("uHorizon"), hor[0], hor[1], hor[2]);
      gl.uniform3f(u("uCloud"), cld[0], cld[1], cld[2]);
      gl.uniform4f(u("uGlow"), glow[0], glow[1], glow[2], glow[3]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestAnimationFrame(render);
    }

    window.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.y = 1 - ((e.clientY - r.top) / r.height) * 2;
      ptr.inside = true;
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
      ptr.inside = false;
    });

    requestAnimationFrame(render);
  }

  window.initCloudSky = initCloudSky;
})();

