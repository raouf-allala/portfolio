import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/*
 * Hero light: a soft green glow from above whose edges break up into
 * nebula dust, fringed with violet, magenta and deep blue. A small fragment
 * shader (domain-warped noise), rendered at half resolution and paused when
 * off-screen. Falls back to a plain CSS glow without WebGL.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.035;

  // the light sits above the top edge and spills down
  vec2 c = vec2(uMouse.x * 0.06, 0.5 + uMouse.y * 0.03);
  vec2 q = p - c;
  q.x *= 0.62;

  // domain-warped noise: the wispy, cloudy structure
  vec2 w = vec2(fbm(p * 1.8 + t), fbm(p * 1.8 - t + 5.2));
  float n = fbm(p * 2.6 + w * 1.8 + t * 0.6);
  float d = length(q) + (n - 0.5) * 0.3;

  vec3 bg = vec3(0.039, 0.047, 0.043);
  vec3 green = vec3(0.12, 0.46, 0.35);
  vec3 mint = vec3(0.71, 1.0, 0.91);
  vec3 teal = vec3(0.04, 0.30, 0.38);
  vec3 violet = vec3(0.33, 0.14, 0.58);
  vec3 magenta = vec3(0.62, 0.14, 0.46);
  vec3 blue = vec3(0.10, 0.18, 0.58);

  float core = smoothstep(0.44, 0.0, d);
  float halo = smoothstep(0.66, 0.3, d);
  float rim = halo - smoothstep(0.46, 0.26, d);

  // the nebula fringe shifts hue across the edge
  float h = fbm(p * 1.3 - t * 0.7 + 11.0);
  vec3 fringe = mix(violet, magenta, smoothstep(0.35, 0.68, h));
  fringe = mix(fringe, blue, smoothstep(0.5, 0.78, fbm(p * 1.7 + 20.0 + t)));

  vec3 col = bg;
  col += teal * halo * 0.22;
  col += fringe * rim * (0.2 + 0.75 * n) * 0.85;
  col += green * core * 0.95;
  col += mint * pow(core, 3.0) * 0.16;

  // fine dust filaments drifting through the edge
  float fil = smoothstep(0.56, 0.78, fbm(p * 5.5 + w * 3.0 - t));
  col += mix(teal, fringe, 0.6) * fil * rim * 0.7;

  // keep the lower half calm so the content reads
  col = mix(bg, col, smoothstep(-0.55, 0.1, p.y));
  gl_FragColor = vec4(col, 1.0);
}`;

export default function Nebula({ className = '' }) {
  const canvas = useRef(null);

  useEffect(() => {
    const c = canvas.current;
    const gl = c.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      c.style.display = 'none';
      return;
    }
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      c.style.display = 'none';
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    const reduced = prefersReducedMotion();
    const SCALE = 0.5; // soft by nature, so half resolution is plenty
    let raf = 0, visible = true;
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const t0 = performance.now() - 40000; // start mid-drift

    const resize = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.round(r.width * SCALE));
      c.height = Math.max(1, Math.round(r.height * SCALE));
      gl.viewport(0, 0, c.width, c.height);
    };
    const draw = (now) => {
      mx += (tmx - mx) * 0.03;
      my += (tmy - my) * 0.03;
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uMouse, mx, -my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };
    const onMove = (e) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    };

    resize();
    draw(performance.now());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(draw);
    });
    io.observe(c);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    ro.observe(c);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* CSS fallback glow sits underneath in case WebGL is unavailable */}
      <div className="absolute left-1/2 top-[-30%] h-[80vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(30_117_90/0.45),transparent)] blur-2xl" />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
