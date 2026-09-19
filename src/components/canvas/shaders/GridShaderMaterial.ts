import * as THREE from 'three';

export const GridVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying float vElevation;
  uniform float uTime;
  uniform float uScrollProgress;

  // Simple pseudo-noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Subtle wave ripples modulated by time and scroll
    float wave1 = sin(pos.x * 0.15 + uTime * 0.8 + uScrollProgress * 3.0) * 0.35;
    float wave2 = cos(pos.y * 0.18 + uTime * 0.6) * 0.25;
    float n = noise(pos.xy * 0.1 + vec2(uTime * 0.1));
    float elevation = (wave1 + wave2 + n * 0.4) * 0.8;

    pos.z += elevation;
    vElevation = elevation;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const GridFragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying float vElevation;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec2 uMouse;

  void main() {
    // Grid coordinate calculations
    vec2 gridPos = vWorldPosition.xy * 0.4;
    vec2 grid = abs(fract(gridPos - 0.5) - 0.5) / fwidth(gridPos);
    float line = min(grid.x, grid.y);
    float gridIntensity = 1.0 - min(line, 1.0);

    // Distance falloff from camera center
    float dist = length(vWorldPosition.xy);
    float fade = smoothstep(28.0, 4.0, dist);

    // Interactive mouse proximity pulse
    vec2 mouseWorld = (uMouse * 15.0);
    float mouseDist = length(vWorldPosition.xy - mouseWorld);
    float mouseInfluence = smoothstep(8.0, 0.0, mouseDist) * 0.45;

    // Moving pulse rings across grid
    float pulse = sin(dist * 0.8 - uTime * 2.0) * 0.5 + 0.5;

    vec3 baseColor = mix(uColorA, uColorB, clamp(vElevation * 1.5 + 0.5, 0.0, 1.0));
    vec3 glowColor = uColorB * (pulse * 0.5 + 0.5 + mouseInfluence);

    vec3 finalColor = mix(vec3(0.02, 0.04, 0.08), baseColor + glowColor, gridIntensity * 0.9);
    float alpha = (gridIntensity * 0.85 + mouseInfluence * 0.2) * fade;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function createGridMaterial(colorA: THREE.Color, colorB: THREE.Color) {
  return new THREE.ShaderMaterial({
    vertexShader: GridVertexShader,
    fragmentShader: GridFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
      uMouse: { value: new THREE.Vector2(0, 0) },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}
