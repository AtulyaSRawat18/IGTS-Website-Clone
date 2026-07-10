"use client";

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** Static fallback shown on mobile, when WebGL is unsupported, or if the
 * scene throws. Replace the radial glow below with a real screenshot of
 * the loaded scene when you have one. */
function StaticFallback() {
  return (
    <div className="fixed inset-0 h-screen w-full bg-gradient-to-b from-ink via-navy to-navy-light">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      </div>
    </div>
  );
}

/** Lives OUTSIDE the Canvas as a plain DOM overlay. Reads load progress via
 * drei's global loading manager (useProgress) — this never touches the
 * Canvas's mount state, so it can't trigger a remount/context loss like a
 * Suspense-wrapped-Canvas would. Fades itself out once loading completes. */
function LoadingOverlay() {
  const { active, progress } = useProgress();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => setDismissed(true), 250);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  if (dismissed) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 flex h-screen w-full items-center justify-center bg-navy transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Loading scene
        </p>
      </div>
    </div>
  );
}

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <StaticFallback />;
    return this.props.children;
  }
}

const cameraViews = [
  { position: [1.373, 0.966, 0.676], target: [-0.138, 1.281, -0.122] },
  { position: [1.736, 1.686, -0.806], target: [-0.055, 1.273, 0.047] },
  { position: [1.458, 1.957, -2.154], target: [-0.055, 1.273, 0.047] },
  { position: [-0.123, 2.146, -2.88], target: [-0.055, 1.273, 0.047] },
  { position: [-2.143, 2.492, -3.075], target: [-0.055, 1.273, 0.047] },
  { position: [-4.66, 4.362, 5.4], target: [-0.046, 1.122, 0.169] },
];

function Environment() {
  const { scene } = useGLTF("/models/environment.glb");
  return <primitive object={scene} position={[0, 0, 0]} scale={1} />;
}

function ChessPiece() {
  const { scene } = useGLTF("/models/piece.glb");
  return <primitive object={scene} position={[0, 0, 0]} scale={1.3} />;
}

function SnapCamera() {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(...cameraViews[0].position));
  const targetLookAt = useRef(new THREE.Vector3(...cameraViews[0].target));
  const currentLookAt = useRef(new THREE.Vector3(...cameraViews[0].target));

  useEffect(() => {
    const scrollContainer = document.getElementById("home-scroll-container");
    if (!scrollContainer) return;
    const sections = Array.from(scrollContainer.querySelectorAll("section"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleEntry) return;
        const index = sections.indexOf(visibleEntry.target as HTMLElement);
        if (index === -1 || index >= cameraViews.length) return;
        const view = cameraViews[index];
        targetPosition.current.set(
          ...(view.position as [number, number, number])
        );
        targetLookAt.current.set(...(view.target as [number, number, number]));
      },
      { root: scrollContainer, threshold: [0.5, 0.6, 0.7, 0.8, 0.9] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useFrame((_, delta) => {
    const speed = 2.5;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetPosition.current.x,
      speed,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetPosition.current.y,
      speed,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetPosition.current.z,
      speed,
      delta
    );
    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      targetLookAt.current.x,
      speed,
      delta
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      targetLookAt.current.y,
      speed,
      delta
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      targetLookAt.current.z,
      speed,
      delta
    );
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function KnightScene() {
  // null = not yet determined (avoids SSR/client mismatch), then true/false
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    setCanRender3D(supportsWebGL());
  }, []);

  if (canRender3D === null || canRender3D === false) {
    return <StaticFallback />;
  }

  return (
    <div className="fixed inset-0 h-screen w-full">
      <SceneErrorBoundary>
        <Canvas
          camera={{
            position: cameraViews[0].position as [number, number, number],
            fov: 45,
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={3.2} />
          <directionalLight
            position={[-6, 3, -4]}
            intensity={0.6}
            color="#a8842f"
          />
          <fog attach="fog" args={["#0a0c16", 6, 22]} />

          {/* Suspense lives INSIDE Canvas, around the meshes only — never
           * wrap the Canvas itself in Suspense, or resolving the GLTFs
           * remounts the whole canvas and can crash the WebGL context. */}
          <Suspense fallback={null}>
            <Environment />
            <ChessPiece />
          </Suspense>

          <SnapCamera />
        </Canvas>
      </SceneErrorBoundary>
      <LoadingOverlay />
      {/* Cinematic vignette — darkens edges so the placard cards and navbar
       * always read against a controlled backdrop, regardless of what's
       * bright in the scene beneath. */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,6,12,0.75) 100%)",
        }}
      />
    </div>
  );
}
