import { useFBO, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Scene } from "three";
import { useAppStoreActions } from "../stores/useAppStore";
import { easings, useSpring } from "@react-spring/three";
import { useLocation } from "react-router-dom";

export default function useRenderScenePortals() {
  const { pathname } = useLocation();
  const { setActiveScene } = useAppStoreActions();

  const noise = useTexture(
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318276/Portfolio/Model/mgc28ibcemeqqoztq6vs.jpg"
  );

  const screenMesh = useRef();
  const textRef = useRef();
  const homeScene = useMemo(() => new Scene(), []);
  const projectsScene = useMemo(() => new Scene(), []);
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const renderTargetC = useFBO();
  const progress = useRef(pathname !== "/projects" ? -2.0 : 2.0);
  const { gl } = useThree();

  // Animate the transition between home and projects scenes -2 to 2
  useSpring({
    from: { progress: progress.current },
    to: { progress: pathname !== "/projects" ? -2.0 : 2.0 },
    config: { duration: 1500, easing: easings.easeInOut, precision: 0.0001 },
    onChange: (e) => {
      progress.current = e.value.progress;
      // Scene activation logic according to progress
      if (e.value.progress < -0.05) {
        setActiveScene("home");
      } else if (e.value.progress > 0.76) {
        setActiveScene("projects");
      } else {
        setActiveScene(null);
      }
    },
  });

  useFrame((state, delta) => {
    const { camera } = state;
    gl.setRenderTarget(renderTargetA);
    gl.render(homeScene, camera);

    gl.setRenderTarget(renderTargetB);
    gl.render(projectsScene, camera);

    if (textRef.current) {
      gl.setRenderTarget(renderTargetC);
      textRef.current.material.visible = false;
      gl.render(projectsScene, camera);
      textRef.current.material.visible = true;
    }

    screenMesh.current.material.uniforms.textureA.value = renderTargetA.texture;
    screenMesh.current.material.uniforms.textureB.value = renderTargetB.texture;
    screenMesh.current.material.uniforms.uNoise.value = noise;
    screenMesh.current.material.uniforms.uProgress.value = progress.current;
    screenMesh.current.material.uniforms.uTime.value += delta;
    gl.setRenderTarget(null);
  });
  return {
    screenMesh,
    renderTargetC,
    textRef,
    homeScene,
    projectsScene,
  };
}

useTexture.preload(
  "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318276/Portfolio/Model/mgc28ibcemeqqoztq6vs.jpg"
);
