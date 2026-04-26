import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Simplified continent outlines as [lon, lat] arrays
const LAND_POLYGONS: [number, number][][] = [
  // North America
  [[-168,72],[-140,72],[-100,72],[-80,72],[-70,47],[-56,47],[-67,44],[-82,42],
   [-80,25],[-88,16],[-83,9],[-77,8],[-77,4],[-90,18],[-97,20],[-105,24],
   [-110,30],[-117,35],[-124,40],[-126,49],[-130,56],[-145,60],[-168,66]],

  // South America
  [[-80,12],[-75,10],[-62,11],[-52,5],[-50,-2],[-35,-8],[-35,-25],
   [-53,-33],[-72,-40],[-75,-50],[-68,-55],[-63,-55],[-58,-40],[-65,-20],[-68,-15],[-80,0],[-80,12]],

  // Europe (simplified)
  [[-10,36],[15,37],[28,37],[36,37],[42,42],[42,47],[32,52],[28,57],[25,70],
   [15,70],[5,60],[-5,56],[-10,50],[-10,36]],

  // Africa
  [[-18,15],[-18,8],[0,-10],[20,-36],[35,-26],[42,-12],[50,12],[44,14],[42,20],
   [37,37],[10,37],[0,30],[0,17],[-18,15]],

  // Russia + Asia (main landmass, very simplified)
  [[30,70],[60,72],[100,72],[140,72],[180,70],[180,60],[143,52],[137,38],
   [120,22],[100,5],[105,1],[118,5],[125,25],[122,32],[120,40],[130,45],
   [145,55],[160,60],[170,65],[180,65],[140,70],[100,72],[60,72],[30,70]],

  // Indian subcontinent extension
  [[60,22],[80,22],[80,8],[72,8],[68,24],[60,22]],

  // Southeast Asia (simplified)
  [[100,20],[108,18],[120,10],[122,5],[108,1],[100,5],[100,20]],

  // Japan (simplified blob)
  [[130,34],[134,34],[136,36],[134,44],[130,44],[128,38],[130,34]],

  // Australia
  [[113,-22],[120,-35],[134,-36],[150,-38],[154,-28],[148,-20],[138,-18],
   [130,-12],[122,-18],[113,-22]],

  // Greenland
  [[-55,60],[-25,60],[-20,70],[-25,83],[-45,83],[-58,76],[-60,68],[-55,60]],

  // Scandinavia
  [[5,58],[5,62],[10,65],[15,70],[28,70],[28,65],[20,58],[15,58],[5,58]],

  // UK (simplified blob)
  [[-5,50],[2,51],[2,58],[-5,58],[-8,53],[-5,50]],
];

// Major cities for dots and arcs
const CITIES: [number, number][] = [
  [-74, 40.7],    // New York
  [-0.1, 51.5],   // London
  [2.3, 48.9],    // Paris
  [-46.6, -23.5], // São Paulo
  [139.7, 35.7],  // Tokyo
  [77.2, 28.6],   // Delhi
  [18.4, -33.9],  // Cape Town
  [103.8, 1.3],   // Singapore
  [-99.1, 19.4],  // Mexico City
  [37.6, 55.7],   // Moscow
  [151.2, -33.9], // Sydney
  [31.2, 30.1],   // Cairo
  [116.4, 39.9],  // Beijing
  [-43.2, -22.9], // Rio de Janeiro
  [72.9, 19.1],   // Mumbai
];

// Arc connections between city indices
const ARCS = [[0,1],[1,7],[3,1],[4,7],[5,7],[0,3],[6,1],[8,0],[9,1],[10,7],[11,1],[12,4],[13,3]];

function latLonToVec3(lon: number, lat: number, r = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

function buildWorldTexture(): THREE.CanvasTexture {
  const W = 2048, H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#010810';
  ctx.fillRect(0, 0, W, H);

  const toXY = (lon: number, lat: number) => [
    ((lon + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ] as [number, number];

  // Dense grid — one line every 10° (mais linhas)
  ctx.lineWidth = 0.6;
  for (let lat = -90; lat <= 90; lat += 10) {
    const opacity = lat === 0 || lat === 23.5 || lat === -23.5 ? 0.18 : 0.07;
    ctx.strokeStyle = `rgba(0,210,255,${opacity})`;
    ctx.beginPath();
    ctx.moveTo(0, ((90 - lat) / 180) * H);
    ctx.lineTo(W, ((90 - lat) / 180) * H);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 10) {
    const x = ((lon + 180) / 360) * W;
    ctx.strokeStyle = 'rgba(0,210,255,0.07)';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  // Continent outlines — neon cyan filled shapes
  LAND_POLYGONS.forEach((polygon) => {
    ctx.beginPath();
    polygon.forEach(([lon, lat], i) => {
      const [x, y] = toXY(lon, lat);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,210,255,0.10)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,210,255,0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  return new THREE.CanvasTexture(canvas);
}

function buildLatLonLines(): THREE.Object3D {
  const group = new THREE.Group();

  // Latitude circles every 10°
  for (let lat = -80; lat <= 80; lat += 10) {
    const phi = (90 - lat) * (Math.PI / 180);
    const y = Math.cos(phi);
    const r = Math.sin(phi);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const t = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t)));
    }
    const isMajor = lat === 0 || lat === 23 || lat === -23 || lat === 66 || lat === -66;
    const mat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: isMajor ? 0.28 : 0.10,
    });
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }

  // Longitude lines every 10°
  for (let lon = 0; lon < 360; lon += 10) {
    const theta = (lon * Math.PI) / 180;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const phi = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      ));
    }
    const isMajor = lon === 0 || lon === 90 || lon === 180 || lon === 270;
    const mat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: isMajor ? 0.25 : 0.08,
    });
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }

  return group;
}

function buildArc(a: THREE.Vector3, b: THREE.Vector3): THREE.Line {
  const mid = a.clone().add(b).normalize().multiplyScalar(1.45);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const pts = curve.getPoints(64);
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.5 });
  return new THREE.Line(geo, mat);
}

export default function GlobeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    let W = mount.clientWidth;
    let H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.z = 2.8;

    // ── Globe group ───────────────────────────────────────────────────────
    const globe = new THREE.Group();
    scene.add(globe);

    // Base sphere with world map texture
    const texture = buildWorldTexture();
    const sphereGeo = new THREE.SphereGeometry(1, 128, 128);
    const sphereMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.92 });
    globe.add(new THREE.Mesh(sphereGeo, sphereMat));

    // Subtle outer glow sphere
    const glowGeo = new THREE.SphereGeometry(1.02, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(glowGeo, glowMat));

    // Three.js lat/lon lines (overlap texture for extra crispness)
    globe.add(buildLatLonLines());

    // City dots
    const dotGeo = new THREE.SphereGeometry(0.012, 10, 10);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x00e8ff });
    CITIES.forEach(([lon, lat]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(latLonToVec3(lon, lat, 1.01));
      globe.add(dot);
    });

    // Connection arcs
    ARCS.forEach(([i, j]) => {
      globe.add(buildArc(
        latLonToVec3(CITIES[i][0], CITIES[i][1], 1.01),
        latLonToVec3(CITIES[j][0], CITIES[j][1], 1.01),
      ));
    });

    // ── Ambient point light for slight depth ──────────────────────────────
    scene.add(new THREE.PointLight(0x00aaff, 0.6, 10));
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // ── Animation loop ────────────────────────────────────────────────────
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      globe.rotation.y += 0.0018;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      W = mount.clientWidth;
      H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      texture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-full w-full"
      style={{ filter: 'drop-shadow(0 0 24px rgba(0,210,255,0.45))' }}
    />
  );
}
