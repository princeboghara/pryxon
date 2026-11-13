"use client";

import { useEffect, useRef } from "react";

export default function AtmosphericSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: false, depth: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;
    const glCtx = gl;

    const VERT_SRC = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
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
        float wMax = min(2.15, 0.72 * uSize);

        for (int j = -1; j <= 1; j++){
          for (int i = -1; i <= 1; i++){
            vec2 o = vec2(float(i), float(j));
            vec2 h = hash22(id + o + seed);
            if (fract(h.x * 37.1) > uCoverage) continue;
            vec2 c = o + 0.15 + h * 0.7;
            float w = min(2.15, (0.30 + 0.42 * fract(h.y * 19.7)) * uSize);
            vec2 d = f - c;
            float ry = (d.y > 0.0 ? 0.34 : 0.19) * uSize * (0.8 + 0.5 * fract(h.y * 7.3));
            float e = length(vec2(d.x / max(w, 1e-3), d.y / max(ry, 1e-3)));
            float val = 1.0 - e;
            float yN = d.y / max(ry, 1e-3);
            if (val > best){
              float k = exp(12.0 * (best - val));
              wsum = wsum * k + 1.0;
              ysum = ysum * k + yN;
              best = val;
            } else {
              float g = exp(12.0 * (val - best));
              wsum += g;
              ysum += g * yN;
            }
          }
        }
        return vec2(best, ysum / max(wsum, 1e-4));
      }

      void main(){
        vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
        float skyV = clamp(gl_FragCoord.y / uRes.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(skyV, 0.85));

        // High cirrus veil
        if (uCirrus > 0.001){
          vec2 cUV = p * 1.8 + vec2(uCirrusX, 0.0) + uParallax * 0.25;
          float cN = fbm(cUV * 2.2 + vec2(cUV.y * 1.4, 0.0));
          float cVal = smoothstep(0.35, 0.82, cN) * uCirrus * 0.28;
          col = mix(col, uCloud, cVal);
        }

        // Layer 2: Far drifting cumulus
        vec2 uvFar = p * 2.15 + vec2(uFarX, 0.0) + uParallax * 0.45;
        vec2 bFar = blobs(uvFar, 41.17);
        float dFar = bFar.x - 0.7 * fbm(uvFar * 1.6);
        float aFar = smoothstep(-0.25 * uSoftness, 0.25 * uSoftness, dFar);
        if (aFar > 0.001){
          float shFar = mix(1.0 - 0.28 * uShadow, 1.0, clamp(bFar.y * 0.5 + 0.5, 0.0, 1.0));
          col = mix(col, uCloud * shFar, aFar * 0.55);
        }

        // Layer 1: Near puffy cumulus clouds
        vec2 uvNear = p * 1.05 + vec2(uNearX, 0.0) + uParallax;
        vec2 bNear = blobs(uvNear, 0.0);
        float dNear = bNear.x - 0.7 * fbm(uvNear * 1.6);
        float aNear = smoothstep(-0.25 * uSoftness, 0.25 * uSoftness, dNear);
        if (aNear > 0.001){
          vec2 stepV = normalize(uSun) * 0.085;
          vec2 bSun = blobs(uvNear + stepV, 0.0);
          float dSun = bSun.x - 0.7 * fbm((uvNear + stepV) * 1.6);
          float lit = clamp((dNear - dSun) * 1.6 + 0.55, 0.0, 1.0);
          float shNear = mix(1.0 - 0.45 * uShadow, 1.0, mix(lit, clamp(bNear.y * 0.5 + 0.5, 0.0, 1.0), 0.4));
          vec3 nearCol = uCloud * shNear;
          col = mix(col, nearCol, aNear);
        }

        // Atmospheric sun glow
        float sunD = length(p - (uSun - vec2(0.5 * (uRes.x / uRes.y), 0.5)));
        float glowA = exp(-sunD * 2.4) * uGlow.a;
        col += uGlow.rgb * glowA * 0.35;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type: number, src: string) {
      const s = glCtx.createShader(type);
      if (!s) return null;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      return s;
    }

    const vs = compile(glCtx.VERTEX_SHADER, VERT_SRC);
    const fs = compile(glCtx.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const prog = glCtx.createProgram();
    if (!prog) return;
    glCtx.attachShader(prog, vs);
    glCtx.attachShader(prog, fs);
    glCtx.linkProgram(prog);
    glCtx.useProgram(prog);

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(glCtx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), glCtx.STATIC_DRAW);
    const aPos = glCtx.getAttribLocation(prog, "a_pos");
    glCtx.enableVertexAttribArray(aPos);
    glCtx.vertexAttribPointer(aPos, 2, glCtx.FLOAT, false, 0, 0);

    const locs: Record<string, WebGLUniformLocation | null> = {};
    const u = (name: string) => {
      if (!(name in locs)) locs[name] = glCtx.getUniformLocation(prog, name);
      return locs[name];
    };

    let animId: number;
    let last = performance.now();
    let nearX = 0;
    let farX = 0;
    let cirrusX = 0;
    let leanX = 0;
    let leanY = 0;
    const ptr = { x: 0, y: 0, inside: false };

    const handlePointerMove = (e: PointerEvent) => {
      ptr.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.y = 1 - (e.clientY / window.innerHeight) * 2;
      ptr.inside = true;
    };

    const handlePointerLeave = () => {
      ptr.inside = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    function render(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const k = 1 - Math.exp(-30 * 0.12 * dt);
      leanX += ((ptr.inside ? ptr.x : 0) - leanX) * k;
      leanY += ((ptr.inside ? ptr.y : 0) - leanY) * k;

      const gust = 1 + leanX * 1.8;
      const rate = 1.2 * gust;
      nearX = (nearX - 0.055 * rate * dt) % 1000;
      farX = (farX - 0.026 * rate * dt) % 1000;
      cirrusX = (cirrusX - 0.014 * rate * dt) % 1000;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));

      if (canvasEl.width !== bw || canvasEl.height !== bh) {
        canvasEl.width = bw;
        canvasEl.height = bh;
      }
      glCtx.viewport(0, 0, bw, bh);

      glCtx.uniform2f(u("uRes"), bw, bh);
      glCtx.uniform1f(u("uNearX"), nearX);
      glCtx.uniform1f(u("uFarX"), farX);
      glCtx.uniform1f(u("uCirrusX"), cirrusX);
      glCtx.uniform1f(u("uCoverage"), 0.62);
      glCtx.uniform1f(u("uSize"), 1.3);
      glCtx.uniform1f(u("uSoftness"), 2.4);
      glCtx.uniform1f(u("uShadow"), 0.65);
      glCtx.uniform1f(u("uCirrus"), 0.7);
      glCtx.uniform2f(u("uSun"), 0.82, 0.94);
      glCtx.uniform2f(u("uParallax"), -leanX * 0.14, -leanY * 0.1);

      // Zenith: Sky Blue (#0284c7)
      glCtx.uniform3f(u("uZenith"), 0.008, 0.518, 0.78);
      // Horizon: Soft Mist (#d4eafc)
      glCtx.uniform3f(u("uHorizon"), 0.83, 0.918, 0.988);
      // Cloud: Pure White
      glCtx.uniform3f(u("uCloud"), 1.0, 1.0, 1.0);
      // Glow: Warm White Sunlight
      glCtx.uniform4f(u("uGlow"), 1.0, 0.98, 0.95, 0.95);

      glCtx.drawArrays(glCtx.TRIANGLES, 0, 3);
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        id="atmosphericSkyCanvas"
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
