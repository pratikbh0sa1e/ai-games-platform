import { useRef, useEffect } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import "./RippleGrid.css";

const vert = `attribute vec2 position;varying vec2 vUv;void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;

const frag = `precision highp float;
uniform float iTime;uniform vec2 iResolution;uniform bool enableRainbow;uniform vec3 gridColor;
uniform float rippleIntensity;uniform float gridSize;uniform float gridThickness;
uniform float fadeDistance;uniform float vignetteStrength;uniform float glowIntensity;
uniform float opacity;uniform float gridRotation;uniform bool mouseInteraction;
uniform vec2 mousePosition;uniform float mouseInfluence;uniform float mouseInteractionRadius;
varying vec2 vUv;
float pi=3.141592;
mat2 rotate(float a){float s=sin(a);float c=cos(a);return mat2(c,-s,s,c);}
void main(){
  vec2 uv=vUv*2.0-1.0;uv.x*=iResolution.x/iResolution.y;
  if(gridRotation!=0.0){uv=rotate(gridRotation*pi/180.0)*uv;}
  float dist=length(uv);
  float func=sin(pi*(iTime-dist));
  vec2 rippleUv=uv+uv*func*rippleIntensity;
  if(mouseInteraction&&mouseInfluence>0.0){
    vec2 mouseUv=(mousePosition*2.0-1.0);mouseUv.x*=iResolution.x/iResolution.y;
    float mouseDist=length(uv-mouseUv);
    float influence=mouseInfluence*exp(-mouseDist*mouseDist/(mouseInteractionRadius*mouseInteractionRadius));
    float mouseWave=sin(pi*(iTime*2.0-mouseDist*3.0))*influence;
    rippleUv+=normalize(uv-mouseUv)*mouseWave*rippleIntensity*0.3;
  }
  vec2 a=sin(gridSize*0.5*pi*rippleUv-pi/2.0);vec2 b=abs(a);
  float aaWidth=0.5;
  vec2 smoothB=vec2(smoothstep(0.0,aaWidth,b.x),smoothstep(0.0,aaWidth,b.y));
  vec3 color=vec3(0.0);
  color+=exp(-gridThickness*smoothB.x*(0.8+0.5*sin(pi*iTime)));
  color+=exp(-gridThickness*smoothB.y);
  color+=0.5*exp(-(gridThickness/4.0)*sin(smoothB.x));
  color+=0.5*exp(-(gridThickness/3.0)*smoothB.y);
  if(glowIntensity>0.0){
    color+=glowIntensity*exp(-gridThickness*0.5*smoothB.x);
    color+=glowIntensity*exp(-gridThickness*0.5*smoothB.y);
  }
  float ddd=exp(-2.0*clamp(pow(dist,fadeDistance),0.0,1.0));
  vec2 vc=vUv-0.5;float vd=length(vc);
  float vignette=clamp(1.0-pow(vd*2.0,vignetteStrength),0.0,1.0);
  vec3 t;
  if(enableRainbow){t=vec3(uv.x*0.5+0.5*sin(iTime),uv.y*0.5+0.5*cos(iTime),pow(cos(iTime),4.0))+0.5;}
  else{t=gridColor;}
  float finalFade=ddd*vignette;
  float alpha=length(color)*finalFade*opacity;
  gl_FragColor=vec4(color*t*finalFade*opacity,alpha);
}`;

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
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return r
        ? [
            parseInt(r[1], 16) / 255,
            parseInt(r[2], 16) / 255,
            parseInt(r[3], 16) / 255,
          ]
        : [1, 1, 1];
    };
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    containerRef.current.appendChild(gl.canvas);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      enableRainbow: { value: enableRainbow },
      gridColor: { value: hexToRgb(gridColor) },
      rippleIntensity: { value: rippleIntensity },
      gridSize: { value: gridSize },
      gridThickness: { value: gridThickness },
      fadeDistance: { value: fadeDistance },
      vignetteStrength: { value: vignetteStrength },
      glowIntensity: { value: glowIntensity },
      opacity: { value: opacity },
      gridRotation: { value: gridRotation },
      mouseInteraction: { value: mouseInteraction },
      mousePosition: { value: [0.5, 0.5] },
      mouseInfluence: { value: 0 },
      mouseInteractionRadius: { value: mouseInteractionRadius },
    };
    uniformsRef.current = uniforms;

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w, h];
    };

    const onMouseMove = (e) => {
      if (!mouseInteraction || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };
    const onMouseEnter = () => {
      if (mouseInteraction) mouseInfluenceRef.current = 1.0;
    };
    const onMouseLeave = () => {
      if (mouseInteraction) mouseInfluenceRef.current = 0.0;
    };

    window.addEventListener("resize", resize);
    if (mouseInteraction) {
      containerRef.current.addEventListener("mousemove", onMouseMove);
      containerRef.current.addEventListener("mouseenter", onMouseEnter);
      containerRef.current.addEventListener("mouseleave", onMouseLeave);
    }
    resize();

    let rafId;
    const render = (t) => {
      rafId = requestAnimationFrame(render);
      uniforms.iTime.value = t * 0.001;
      mousePositionRef.current.x +=
        (targetMouseRef.current.x - mousePositionRef.current.x) * 0.1;
      mousePositionRef.current.y +=
        (targetMouseRef.current.y - mousePositionRef.current.y) * 0.1;
      uniforms.mouseInfluence.value +=
        (mouseInfluenceRef.current - uniforms.mouseInfluence.value) * 0.05;
      uniforms.mousePosition.value = [
        mousePositionRef.current.x,
        mousePositionRef.current.y,
      ];
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(render);

    const container = containerRef.current;
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (mouseInteraction && container) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (container && gl.canvas.parentNode === container)
        container.removeChild(gl.canvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!uniformsRef.current) return;
    const hexToRgb = (hex) => {
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return r
        ? [
            parseInt(r[1], 16) / 255,
            parseInt(r[2], 16) / 255,
            parseInt(r[3], 16) / 255,
          ]
        : [1, 1, 1];
    };
    uniformsRef.current.enableRainbow.value = enableRainbow;
    uniformsRef.current.gridColor.value = hexToRgb(gridColor);
    uniformsRef.current.rippleIntensity.value = rippleIntensity;
    uniformsRef.current.gridSize.value = gridSize;
    uniformsRef.current.gridThickness.value = gridThickness;
    uniformsRef.current.fadeDistance.value = fadeDistance;
    uniformsRef.current.vignetteStrength.value = vignetteStrength;
    uniformsRef.current.glowIntensity.value = glowIntensity;
    uniformsRef.current.opacity.value = opacity;
    uniformsRef.current.gridRotation.value = gridRotation;
    uniformsRef.current.mouseInteraction.value = mouseInteraction;
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;
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
