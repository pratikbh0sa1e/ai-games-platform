import { useRef, useEffect } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import "./RippleGrid.css";

const RippleGrid = ({
  enableRainbow = false,
  gridColor = "#ffffff",
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  fadeDistance = 1.5,
  vignetteStrength = 2.0,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1,
}) => {
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluenceRef = useRef(0);
  const uniformsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
          ]
        : [1, 1, 1];
    };

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    containerRef.current.appendChild(gl.canvas);

    const resize = () => {
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight,
      );
      if (uniformsRef.current) {
        uniformsRef.current.uResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
        ];
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const vertex = /* glsl */ `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uMouseInfluence;
      uniform float uRippleIntensity;
      uniform float uGridSize;
      uniform float uGridThickness;
      uniform float uFadeDistance;
      uniform float uVignetteStrength;
      uniform float uGlowIntensity;
      uniform float uOpacity;
      uniform float uGridRotation;
      uniform float uMouseRadius;
      uniform vec3 uGridColor;
      uniform bool uEnableRainbow;
      varying vec2 vUv;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 uv = vUv;
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 uvAspect = (uv - 0.5) * aspect;
        vec2 mouseAspect = (uMouse - 0.5) * aspect;

        float dist = length(uvAspect - mouseAspect);
        float mouseEffect = uMouseInfluence * smoothstep(uMouseRadius, 0.0, dist);

        float ripple = sin(dist * 20.0 - uTime * 3.0) * uRippleIntensity * mouseEffect;

        float cosR = cos(uGridRotation);
        float sinR = sin(uGridRotation);
        vec2 rotUv = vec2(
          cosR * uvAspect.x - sinR * uvAspect.y,
          sinR * uvAspect.x + cosR * uvAspect.y
        );
        rotUv += ripple;

        vec2 grid = fract(rotUv * uGridSize) - 0.5;
        float line = min(
          smoothstep(0.5 - 1.0/uGridThickness, 0.5 - 0.5/uGridThickness, abs(grid.x)),
          smoothstep(0.5 - 1.0/uGridThickness, 0.5 - 0.5/uGridThickness, abs(grid.y))
        );
        line = 1.0 - line;

        float glow = uGlowIntensity * exp(-dist * 5.0) * mouseEffect;
        line = clamp(line + glow, 0.0, 1.0);

        float fade = 1.0 - smoothstep(0.0, uFadeDistance, length(uvAspect));
        float vignette = pow(fade, uVignetteStrength);
        line *= vignette;

        vec3 color;
        if (uEnableRainbow) {
          float hue = fract(atan(uvAspect.y, uvAspect.x) / (2.0 * 3.14159) + uTime * 0.05);
          color = hsv2rgb(vec3(hue, 0.8, 1.0));
        } else {
          color = uGridColor;
        }

        gl_FragColor = vec4(color * line, line * uOpacity);
      }
    `;

    const colorRgb = hexToRgb(gridColor);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [gl.canvas.width, gl.canvas.height] },
      uMouse: { value: [0.5, 0.5] },
      uMouseInfluence: { value: 0 },
      uRippleIntensity: { value: rippleIntensity },
      uGridSize: { value: gridSize },
      uGridThickness: { value: gridThickness },
      uFadeDistance: { value: fadeDistance },
      uVignetteStrength: { value: vignetteStrength },
      uGlowIntensity: { value: glowIntensity },
      uOpacity: { value: opacity },
      uGridRotation: { value: gridRotation },
      uMouseRadius: { value: mouseInteractionRadius },
      uGridColor: { value: colorRgb },
      uEnableRainbow: { value: enableRainbow },
    };
    uniformsRef.current = uniforms;

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex, fragment, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    let animId;
    const animate = (t) => {
      animId = requestAnimationFrame(animate);
      uniforms.uTime.value = t * 0.001;

      // Smooth mouse lerp
      mousePositionRef.current.x +=
        (targetMouseRef.current.x - mousePositionRef.current.x) * 0.08;
      mousePositionRef.current.y +=
        (targetMouseRef.current.y - mousePositionRef.current.y) * 0.08;
      uniforms.uMouse.value = [
        mousePositionRef.current.x,
        mousePositionRef.current.y,
      ];

      mouseInfluenceRef.current += (1 - mouseInfluenceRef.current) * 0.05;
      uniforms.uMouseInfluence.value = mouseInfluenceRef.current;

      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.render({ scene: mesh });
    };
    animId = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      if (!mouseInteraction || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };

    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (
        containerRef.current &&
        gl.canvas.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    enableRainbow,
    gridColor,
    rippleIntensity,
    gridSize,
    gridThickness,
    fadeDistance,
    vignetteStrength,
    glowIntensity,
    opacity,
    gridRotation,
    mouseInteraction,
    mouseInteractionRadius,
  ]);

  return <div ref={containerRef} className="ripple-grid-container" />;
};

export default RippleGrid;
