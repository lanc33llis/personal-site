import { useEffect, useRef } from "react";
import * as THREE from "three";

const main = () => {
  const width = 200;
  const height = 200;
  // init

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshBasicMaterial({
    color: "#b5c0ff",
    vertexColors: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  new THREE.Color(0xff0000);
  new THREE.Color(0x00ff00);
  new THREE.Color(0x0000ff);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animate);

  // animation

  function animate(time) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
  }

  return renderer;
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = main();

    // for safe-mode react
    if (containerRef.current?.hasChildNodes()) {
      containerRef.current.replaceChild(
        r.domElement,
        containerRef.current.firstChild!
      );
    } else {
      containerRef.current?.appendChild(r.domElement);
    }
  }, []);

  return (
    <section className="h-screen flex w-full ">
      <div className="w-1/2 h-full flex items-center justify-center">
        <h1 className="w-[500px] font-semibold text-foreground/80 text-left text-5xl">
          I&apos;m
          <span className="text-foreground/100"> Lance Ellis</span>
          <br />
          {` a software engineer`}
          <br className="hidden lg:inline" />
          {` and designer.`}
        </h1>
      </div>
      <div className="w-1/2 h-full" ref={containerRef}></div>
    </section>
  );
};

export default Hero;
