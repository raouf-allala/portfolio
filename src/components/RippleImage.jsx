import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/*
 * Hover distortion: on pointer devices, hovering a screenshot swaps in a
 * WebGL canvas that bends the image like liquid glass around the cursor,
 * with a slight chromatic split. The context is created on hover and
 * released after the effect settles, so at most one or two are ever alive.
 * Everywhere else (touch, reduced motion, no WebGL) it is a plain <img>.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform float uTime;
uniform float uAmt;
uniform float uAspect;
uniform vec2 uScale;
uniform vec2 uPos;
uniform vec3 uBg;
varying vec2 vUv;

vec3 sampleImg(vec2 uv) {
  vec2 t = uv * uScale + (1.0 - uScale) * uPos;
  if (t.x < 0.0 || t.x > 1.0 || t.y < 0.0 || t.y > 1.0) return uBg;
  return texture2D(uTex, t).rgb;
}

void main() {
  vec2 d = vUv - uMouse;
  vec2 da = d * vec2(uAspect, 1.0);
  float dist = length(da);
  // lens bulge under the cursor
  float lens = exp(-dist * 7.0);
  // travelling ripple rings
  float ring = sin(dist * 46.0 - uTime * 5.0) * exp(-dist * 4.5);
  vec2 dir = normalize(da + 1e-5) / vec2(uAspect, 1.0);
  vec2 uv = vUv - d * lens * 0.16 * uAmt + dir * ring * 0.007 * uAmt;
  float split = (0.0035 + lens * 0.006) * uAmt;
  vec3 col;
  col.r = sampleImg(uv + dir * split).r;
  col.g = sampleImg(uv).g;
  col.b = sampleImg(uv - dir * split).b;
  // faint mint glow at the lens edge, in the site's own ink
  col += vec3(0.71, 1.0, 0.91) * smoothstep(0.02, 0.0, abs(dist - 0.18)) * 0.08 * uAmt;
  gl_FragColor = vec4(col, 1.0);
}`;

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !prefersReducedMotion();

const hexToRgb = (hex = '#1b1e22') => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function RippleImage({
  src,
  alt,
  fit = 'cover',
  position = [0.5, 0],
  bg,
  className = '',
  imgClassName = '',
  imgStyle,
  ...imgProps
}) {
  const wrap = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const fx = useRef(null);

  useEffect(() => () => fx.current?.destroy(), []);

  const start = () => {
    if (fx.current || !canHover()) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl || !img?.complete || !img.naturalWidth) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

    const u = (n) => gl.getUniformLocation(prog, n);
    const uni = {
      mouse: u('uMouse'),
      time: u('uTime'),
      amt: u('uAmt'),
      aspect: u('uAspect'),
      scale: u('uScale'),
      pos: u('uPos'),
      bg: u('uBg'),
    };
    gl.uniform1i(u('uTex'), 0);
    gl.uniform3fv(uni.bg, hexToRgb(bg));
    gl.uniform2fv(uni.pos, position);

    const resize = () => {
      const r = wrap.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const ac = r.width / r.height;
      const ai = img.naturalWidth / img.naturalHeight;
      // Reproduce CSS object-fit in texture space.
      const wider = ai > ac;
      const scale =
        fit === 'cover'
          ? wider
            ? [ac / ai, 1]
            : [1, ai / ac]
          : wider
            ? [1, ai / ac]
            : [ac / ai, 1];
      gl.uniform2fv(uni.scale, scale);
      gl.uniform1f(uni.aspect, ac);
    };
    resize();

    const s = {
      target: 0,
      amt: 0,
      mouse: [0.5, 0.5],
      goal: [0.5, 0.5],
      raf: 0,
      t0: performance.now(),
      running: false,
    };

    const frame = (now) => {
      s.amt += (s.target - s.amt) * 0.09;
      s.mouse[0] += (s.goal[0] - s.mouse[0]) * 0.16;
      s.mouse[1] += (s.goal[1] - s.mouse[1]) * 0.16;
      gl.uniform1f(uni.amt, s.amt);
      gl.uniform2fv(uni.mouse, s.mouse);
      gl.uniform1f(uni.time, (now - s.t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (s.target === 0 && s.amt < 0.004) {
        s.running = false;
        canvas.style.opacity = '0';
        destroy();
        return;
      }
      s.raf = requestAnimationFrame(frame);
    };

    const destroy = () => {
      cancelAnimationFrame(s.raf);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      fx.current = null;
    };

    fx.current = {
      enter() {
        s.target = 1;
        canvas.style.opacity = '1';
        if (!s.running) {
          s.running = true;
          s.raf = requestAnimationFrame(frame);
        }
      },
      leave() {
        s.target = 0;
      },
      move(x, y) {
        s.goal = [x, y];
        if (s.amt < 0.05) s.mouse = [x, y];
      },
      destroy,
    };
  };

  const toLocal = (e) => {
    const r = wrap.current.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
  };

  return (
    <div
      ref={wrap}
      className={`relative ${className}`}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return;
        start();
        fx.current?.move(...toLocal(e));
        fx.current?.enter();
      }}
      onPointerMove={(e) => fx.current?.move(...toLocal(e))}
      onPointerLeave={() => fx.current?.leave()}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ backgroundColor: bg, ...imgStyle }}
        {...imgProps}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-150"
      />
    </div>
  );
}
