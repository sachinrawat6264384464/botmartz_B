"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Maximize2, RotateCcw, Sparkles, Layers, Sliders, Play, Pause } from "lucide-react";

export default function BotmartzIntelligenceStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [explodeVal, setExplodeVal] = useState<number>(0.35);
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<{
    layerTitle: string;
    layerNumber: string;
    name: string;
    detail: string;
    linked: string[];
  } | null>(null);

  // Expose explodeVal setter to Three.js loop via ref to avoid re-renders
  const stateRef = useRef({
    explodeTarget: 0.35,
    auto: true,
    activeLayer: 0,
    selectedItem: null as any,
  });

  useEffect(() => {
    stateRef.current.explodeTarget = explodeVal;
    stateRef.current.auto = isAuto;
    stateRef.current.activeLayer = activeLayer;
  }, [explodeVal, isAuto, activeLayer]);

  useEffect(() => {
    if (!containerRef.current) return;

    const host = containerRef.current;
    const tip = tipRef.current;
    const CY = "#19C8F3";

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(24, 1, 0.1, 200);
    const ren = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    ren.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if ((THREE as any).sRGBEncoding) {
      ren.outputEncoding = (THREE as any).sRGBEncoding;
    } else if ((THREE as any).SRGBColorSpace) {
      ren.outputColorSpace = (THREE as any).SRGBColorSpace;
    }
    ren.toneMapping = THREE.ACESFilmicToneMapping;
    ren.toneMappingExposure = 1.25;

    ren.domElement.style.width = "100%";
    ren.domElement.style.height = "100%";
    ren.domElement.style.display = "block";
    ren.domElement.style.cursor = "grab";
    host.prepend(ren.domElement);

    cam.position.set(1, 0.85, 1).setLength(24);

    const ctl = new OrbitControls(cam, ren.domElement);
    Object.assign(ctl, {
      enableDamping: true,
      dampingFactor: 0.06,
      enableZoom: false,
      enablePan: false,
      minPolarAngle: 0.85,
      maxPolarAngle: 1.3,
      minAzimuthAngle: 0.45,
      maxAzimuthAngle: 1.15,
    });

    // Lights
    scene.add(new THREE.HemisphereLight("#cfefff", "#06203a", 1.2));
    const key = new THREE.DirectionalLight("#ffffff", 1.8);
    key.position.set(5, 10, 6);
    scene.add(key);
    const pl = new THREE.PointLight("#19c8f3", 1.6, 26);
    pl.position.set(-5, 3, 5);
    scene.add(pl);

    // --- Geometry & Materials Helpers ---
    function rr(w: number, d: number, r: number) {
      const s = new THREE.Shape();
      const x = -w / 2;
      const y = -d / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);
      s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + d - r);
      s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
      s.lineTo(x + r, y + d);
      s.quadraticCurveTo(x, y + d, x, y + d - r);
      s.lineTo(x, y + r);
      s.quadraticCurveTo(x, y, x + r, y);
      return s;
    }

    function slab(w: number, d: number, r: number, h: number, b: number) {
      const g = new THREE.ExtrudeGeometry(rr(w - 2 * b, d - 2 * b, r), {
        depth: h - 2 * b,
        bevelEnabled: true,
        bevelSize: b,
        bevelThickness: b,
        bevelSegments: 3,
        curveSegments: 6,
      });
      g.rotateX(-Math.PI / 2);
      g.translate(0, -h / 2 + b, 0);
      return g;
    }

    let bag: THREE.Material[] = [];
    function M(c: string, o: any = {}) {
      const m = new THREE.MeshStandardMaterial(
        Object.assign({ color: c, roughness: 0.35, metalness: 0.35 }, o)
      );
      (m.userData as any).base = new THREE.Color(c);
      bag.push(m);
      return m;
    }

    function B(c: string, o: any = {}) {
      const m = new THREE.MeshBasicMaterial(Object.assign({ color: c, toneMapped: false }, o));
      (m.userData as any).base = new THREE.Color(c);
      bag.push(m);
      return m;
    }

    function tex(c: HTMLCanvasElement) {
      const t = new THREE.CanvasTexture(c);
      if ((THREE as any).sRGBEncoding) {
        t.encoding = (THREE as any).sRGBEncoding;
      } else if ((THREE as any).SRGBColorSpace) {
        t.colorSpace = (THREE as any).SRGBColorSpace;
      }
      t.anisotropy = 8;
      return t;
    }

    const glowT = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(120,235,255,1)");
      g.addColorStop(0.35, "rgba(25,200,243,.35)");
      g.addColorStop(1, "rgba(25,200,243,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 64, 64);
      return tex(c);
    })();

    function glow(s: number, o: number) {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowT,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          toneMapped: false,
          opacity: o,
        })
      );
      sp.scale.setScalar(s);
      return sp;
    }

    // --- Vector Icon Canvas Renderers ---
    let X: CanvasRenderingContext2D;
    const R = (...a: [number, number, number, number]) => X.strokeRect(...a);
    const F = (x: number, y: number, r: number) => {
      X.beginPath();
      X.arc(x, y, r, 0, 7);
      X.fill();
    };
    const O = (x: number, y: number, r: number) => {
      X.beginPath();
      X.arc(x, y, r, 0, 7);
      X.stroke();
    };
    const E = (x: number, y: number, a: number, b: number) => {
      X.beginPath();
      X.ellipse(x, y, a, b, 0, 0, 7);
      X.stroke();
    };
    const L = (...p: number[]) => {
      X.beginPath();
      X.moveTo(p[0], p[1]);
      for (let i = 2; i < p.length; i += 2) X.lineTo(p[i], p[i + 1]);
      X.stroke();
    };

    const IC: Record<string, () => void> = {
      docs: () => {
        R(24, 18, 38, 52);
        R(38, 30, 38, 52);
        L(46, 44, 68, 44);
        L(46, 56, 68, 56);
      },
      db: () => {
        E(50, 28, 26, 10);
        E(50, 50, 26, 10);
        E(50, 72, 26, 10);
        L(24, 28, 24, 72);
        L(76, 28, 76, 72);
      },
      api: () => {
        L(33, 46, 67, 30);
        L(33, 54, 67, 70);
        O(24, 50, 9);
        O(76, 26, 9);
        O(76, 74, 9);
      },
      parse: () => {
        R(22, 16, 56, 68);
        L(32, 36, 68, 36);
        L(32, 50, 68, 50);
        L(32, 64, 54, 64);
      },
      chunk: () => {
        R(20, 20, 26, 26);
        R(54, 20, 26, 26);
        R(20, 54, 26, 26);
        R(54, 54, 26, 26);
      },
      embed: () => {
        L(28, 70, 50, 38, 74, 58, 62, 24);
        [
          [28, 70],
          [50, 38],
          [74, 58],
          [62, 24],
        ].forEach((p) => F(p[0], p[1], 6));
      },
      index: () => {
        R(20, 20, 60, 60);
        L(20, 40, 80, 40);
        L(20, 60, 80, 60);
        L(40, 20, 40, 80);
      },
      bm25: () => {
        L(20, 28, 80, 28);
        L(20, 50, 64, 50);
        L(20, 72, 48, 72);
        F(76, 72, 5);
      },
      vec: () => {
        L(28, 66, 44, 40, 62, 60);
        [
          [28, 66],
          [44, 40],
          [62, 60],
          [72, 30],
          [30, 30],
          [56, 78],
        ].forEach((p) => F(p[0], p[1], 6));
      },
      hyb: () => {
        L(18, 26, 50, 50, 18, 74);
        L(50, 50, 76, 50);
        O(82, 50, 6);
      },
      rank: () => {
        R(20, 62, 60, 16);
        R(26, 42, 48, 16);
        R(32, 22, 36, 16);
      },
      filt: () => L(20, 24, 80, 24, 56, 54, 56, 80, 44, 72, 44, 54, 20, 24),
      colb: () => {
        R(14, 30, 24, 16);
        R(42, 30, 24, 16);
        R(70, 30, 16, 16);
        R(14, 56, 34, 16);
        R(54, 56, 26, 16);
      },
      topk: () => {
        R(22, 22, 56, 16);
        R(22, 44, 56, 16);
        R(22, 66, 56, 16);
        F(30, 30, 4);
      },
      agent: () => {
        [
          [20, 24],
          [80, 24],
          [20, 76],
          [80, 76],
        ].forEach((p) => {
          L(p[0], p[1], 50, 50);
          O(p[0], p[1], 6);
        });
        F(50, 50, 13);
      },
      evid: () => {
        O(50, 50, 30);
        L(36, 50, 46, 62, 66, 38);
      },
      ans: () => {
        L(18, 26, 46, 46);
        L(18, 74, 46, 54);
        L(18, 50, 46, 50);
        R(54, 34, 30, 32);
      },
      tools: () => {
        O(34, 34, 14);
        L(44, 44, 78, 78);
        L(70, 78, 78, 70);
      },
      eval: () => {
        R(22, 56, 14, 24);
        R(44, 38, 14, 42);
        R(66, 20, 14, 60);
      },
      guard: () => {
        L(50, 14, 80, 26, 78, 56, 50, 86, 22, 56, 20, 26, 50, 14);
        F(50, 48, 7);
      },
      trace: () => {
        L(20, 50, 80, 50);
        F(20, 50, 7);
        F(50, 50, 7);
        F(80, 50, 7);
      },
    };

    function tileTex(name: string, icon: string, hero: boolean) {
      const c = document.createElement("canvas");
      c.width = 300;
      c.height = 212;
      X = c.getContext("2d")!;
      X.fillStyle = hero ? CY : "#0c4268";
      X.fillRect(0, 0, 300, 212);
      X.strokeStyle = X.fillStyle = hero ? "#062B49" : CY;
      X.lineWidth = 5;
      X.lineCap = X.lineJoin = "round";
      X.save();
      X.translate(90, 10);
      X.scale(1.2, 1.2);
      if (IC[icon]) IC[icon]();
      X.restore();
      X.font = "700 27px Inter,Arial,sans-serif";
      X.textAlign = "center";
      X.fillStyle = hero ? "#062B49" : "#e9faff";
      X.fillText(name, 150, 192, 270);
      return tex(c);
    }

    function titleTex(n: string, t: string, cap: string) {
      const c = document.createElement("canvas");
      c.width = 1280;
      c.height = 160;
      X = c.getContext("2d")!;
      X.textAlign = "left";
      X.fillStyle = "#fff";
      X.font = "800 58px Inter,Arial,sans-serif";
      X.fillText(n + "  " + t, 10, 66);
      X.fillStyle = "#b9eaff";
      X.font = "600 32px Inter,Arial,sans-serif";
      X.fillText(cap, 10, 125);
      return tex(c);
    }

    // --- Data Architecture ---
    const DATA = [
      {
        t: "KNOWLEDGE LAYER",
        cap: "INGEST · PARSE · ENRICH · INDEX",
        body: "#0B3A57",
        plate: "#0F4C75",
        hero: -1,
        items: [
          ["DOCUMENTS", "docs", "PDFs, Word, sheets and internal enterprise docs."],
          ["DATABASES", "db", "PostgreSQL, Oracle, and Snowflake operational data."],
          ["APIS", "api", "Trusted application data feeds (Jira, Confluence, APIs)."],
          ["PARSING", "parse", "Turn source files into clean, schema-aware structure."],
          ["CHUNKING", "chunk", "Split content while preserving semantic section context."],
          ["EMBEDDINGS", "embed", "Vector representations for high-dimensional semantic search."],
          ["INDEXING", "index", "Content and metadata ready for real-time retrieval."],
        ],
      },
      {
        t: "RETRIEVAL LAYER",
        cap: "SEARCH · RANK · FILTER · RETRIEVE",
        body: "#0A5C8F",
        plate: "#0A79B8",
        hero: 2,
        items: [
          ["BM25", "bm25", "Keyword retrieval for exact codes, statutes, and terms."],
          ["VECTOR SEARCH", "vec", "Semantic retrieval by dense vector cosine meaning."],
          ["HYBRID", "hyb", "Reciprocal Rank Fusion of keyword and semantic signals."],
          ["RERANKING", "rank", "Cross-encoder reordering candidate chunks by relevance."],
          ["FILTERS", "filt", "Permissions, recency, and metadata ACL constraints."],
          ["COLBERT", "colb", "Token-level late-interaction matching."],
          ["TOP-K", "topk", "The strongest, citation-grounded evidence candidates."],
        ],
      },
      {
        t: "INTELLIGENCE LAYER",
        cap: "REASON · GENERATE · VERIFY",
        body: "#062B49",
        plate: "#0A3556",
        hero: 0,
        items: [
          ["AI AGENTS", "agent", "Multi-step LangGraph state machines that use tools safely."],
          ["EVIDENCE CHECK", "evid", "Claim-level grounding gate verifying against sources."],
          ["GROUNDED GEN", "ans", "Faithful responses built strictly from retrieved evidence."],
          ["TOOLS", "tools", "Audited APIs and business systems with permission bounds."],
          ["EVALUATION", "eval", "Continuous Ragas metrics for faithfulness & relevance."],
          ["GUARDRAILS", "guard", "Policy, security, and prompt injection defense checks."],
          ["TRACING", "trace", "Inspect the full trace from query to citation."],
        ],
      },
    ];

    const POS = [
      [-2.4, -1.4],
      [-0.8, -1.4],
      [0.8, -1.4],
      [2.4, -1.4],
      [-1.6, 0.1],
      [0, 0.1],
      [1.6, 0.1],
    ];

    const BASEY = [1.3, 0, -1.3];
    const SPREAD = 1.7;
    const picks: THREE.Object3D[] = [];
    const Ls: THREE.Group[] = [];
    const LINKS = [
      [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 3],
        [5, 3],
        [3, 4],
        [4, 6],
      ],
      [
        [0, 3],
        [0, 1],
        [1, 2],
        [0, 5],
        [2, 4],
        [4, 6],
      ],
    ];

    const ringG = new THREE.RingGeometry(0.5, 0.54, 48).rotateX(-Math.PI / 2);
    const satG = new THREE.SphereGeometry(0.045, 10, 10);
    const addM = (c: string, o: any = {}) =>
      new THREE.MeshBasicMaterial(
        Object.assign(
          {
            color: c,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            toneMapped: false,
            side: THREE.DoubleSide,
          },
          o
        )
      );

    // --- Build 3 Layers ---
    DATA.forEach((D, i) => {
      bag = [];
      const L = new THREE.Group();
      (L.userData as any) = { i: i + 1, mats: bag, k: 1, tiles: [] };

      const body = new THREE.Mesh(slab(7.2, 5.4, 0.4, 0.5, 0.07), M(D.body));
      L.add(body);
      (body.userData as any).layer = L;
      picks.push(body);

      const rim = new THREE.Mesh(slab(7.26, 5.46, 0.4, 0.05, 0.01), B(CY));
      rim.position.y = 0.19;
      L.add(rim);
      (L.userData as any).rim = rim;
      (rim.userData as any).layer = L;

      const plate = new THREE.Mesh(slab(6.8, 5.0, 0.25, 0.08, 0.03), M(D.plate));
      plate.position.y = 0.29;
      L.add(plate);

      const tt = new THREE.Mesh(
        new THREE.PlaneGeometry(6.4, 0.8),
        B("#fff", { map: titleTex("0" + (i + 1), D.t, D.cap), transparent: true })
      );
      tt.rotation.x = -Math.PI / 2;
      tt.position.set(-0.1, 0.335, 1.75);
      L.add(tt);

      D.items.forEach((it, j) => {
        const hero = j === D.hero;
        const g = new THREE.Group();
        g.position.set(POS[j][0], 0, POS[j][1]);
        L.add(g);

        const base = new THREE.Mesh(slab(1.4, 0.92, 0.1, 0.16, 0.04), M(hero ? "#19C8F3" : "#0E4A70"));
        base.position.y = 0.37;
        g.add(base);

        const er = new THREE.Mesh(
          slab(1.44, 0.96, 0.11, 0.03, 0.01),
          B(CY, { transparent: true, opacity: hero ? 1 : 0.6 })
        );
        er.position.y = 0.4;
        g.add(er);

        const top = new THREE.Mesh(
          new THREE.PlaneGeometry(1.28, 0.905),
          B("#fff", { map: tileTex(it[0], it[1], hero) })
        );
        top.rotation.x = -Math.PI / 2;
        top.position.y = 0.455;
        g.add(top);

        (g.userData as any) = { name: it[0], detail: it[2], layer: L, lift: 0, j, hover: false };
        [base, top].forEach((m) => {
          (m.userData as any).tile = g;
          picks.push(m);
        });

        if (hero) {
          const s = glow(2.1, 0.5);
          s.position.y = 0.6;
          g.add(s);
          (g.userData as any).glow = s;

          const orb = new THREE.Group();
          orb.position.y = 0.85;
          orb.rotation.z = 0.35;
          g.add(orb);
          orb.add(new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.006, 6, 64).rotateX(Math.PI / 2), addM(CY, { opacity: 0.4 })));

          [0, 2.1, 4.2].forEach((a) => {
            const m = new THREE.Mesh(satG, addM("#bff6ff", { opacity: 1 }));
            (m.userData as any).a = a;
            orb.add(m);
          });

          const pr = new THREE.Mesh(ringG, addM(CY, { opacity: 0 }));
          pr.position.y = 0.47;
          g.add(pr);
          Object.assign(g.userData, { orb, pr });
        }
        (L.userData as any).tiles.push(g);
      });

      const u = L.userData as any;
      u.links = LINKS[i].map(([a, b], n) => {
        const A = POS[a];
        const Q = POS[b];
        const lane = -0.9 + n * 0.1;
        const pts = [
          [A[0], A[1]],
          [A[0], lane],
          [Q[0], lane],
          [Q[0], Q[1]],
        ].map((p) => new THREE.Vector3(p[0], 0.34, p[1]));

        const cp = new THREE.CurvePath<THREE.Vector3>();
        for (let k = 0; k < 3; k++) cp.add(new THREE.LineCurve3(pts[k], pts[k + 1]));
        const mat = B(CY, { transparent: true, opacity: 0.2 });
        L.add(new THREE.Mesh(new THREE.TubeGeometry(cp, 48, 0.016, 4), mat));
        const s = glow(0.28, 0.8);
        L.add(s);
        return { a, b, mat, cp, s, o: Math.random(), h: 0 };
      });

      if (i === 0) {
        u.sheets = [0, 1, 2, 3, 4].map(() => {
          const m = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.3), addM("#bfefff", { opacity: 0 }));
          L.add(m);
          return m;
        });
      }
      if (i === 1) {
        const sw = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 0.8), addM(CY, { opacity: 0.1 }));
        sw.rotation.y = Math.PI / 2;
        sw.position.y = 0.75;
        L.add(sw);
        u.sweep = sw;
      }
      scene.add(L);
      Ls.push(L);
    });

    // --- Ambience & Grid ---
    const holo = new THREE.Group();
    holo.visible = false;
    const hr = [0.62, 0.9].map((r) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.01, 6, 64).rotateX(Math.PI / 2), addM(CY, { opacity: 0.8 }));
      holo.add(m);
      return m;
    });
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.2, 32, 1, true), addM(CY, { opacity: 0.1 }));
    col.position.y = 1.05;
    holo.add(col);

    const pg = new THREE.BufferGeometry();
    const arr = new Float32Array(450);
    for (let n = 0; n < 450; n += 3) {
      arr[n] = (Math.random() - 0.5) * 22;
      arr[n + 1] = (Math.random() - 0.5) * 18;
      arr[n + 2] = (Math.random() - 0.5) * 22;
    }
    pg.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const pts = new THREE.Points(
      pg,
      new THREE.PointsMaterial({
        color: "#8cecff",
        size: 0.06,
        transparent: true,
        opacity: 0.5,
        toneMapped: false,
        depthWrite: false,
      })
    );
    scene.add(pts);

    const pool = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), addM("#19c8f3", { map: glowT, opacity: 0.45 }));
    pool.scale.setScalar(20);
    pool.position.y = -4.4;
    scene.add(pool);

    const grid = new THREE.GridHelper(26, 26, "#0d5475", "#0b3550");
    grid.position.y = -4.4;
    (grid.material as any).transparent = true;
    (grid.material as any).opacity = 0.3;
    scene.add(grid);

    // Beams
    const beams = [
      [-3.15, 0],
      [3.15, 0],
      [0, -2.2],
    ].map((p, n) => {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 1, 8),
        new THREE.MeshBasicMaterial({ color: CY, transparent: true, opacity: 0, toneMapped: false })
      );
      m.position.x = p[0];
      m.position.z = p[1];
      scene.add(m);
      const beads = [0, 0.5].map((o) => {
        const s = glow(0.45, 0);
        scene.add(s);
        return { s, o: o + n * 0.17 };
      });
      return { m, beads, x: p[0], z: p[1] };
    });

    // --- Interaction ---
    let e = 0;
    let hov: any = null;
    let sel: any = null;
    let hovL: any = null;
    const ray = new THREE.Raycaster();
    const ptr = new THREE.Vector2();

    function pick(ev: PointerEvent | MouseEvent) {
      const r = ren.domElement.getBoundingClientRect();
      ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ptr, cam);
      const h = ray.intersectObjects(picks, false)[0];
      return h && h.object;
    }

    let down: [number, number] | null = null;
    ren.domElement.addEventListener("pointerdown", (ev) => (down = [ev.clientX, ev.clientY]));

    ren.domElement.addEventListener("pointermove", (ev) => {
      const o: any = pick(ev);
      const g = o && o.userData.tile;
      hov = g || null;
      hovL = o ? o.userData.layer || g.userData.layer : null;
      if (g && tip) {
        const L = g.userData.layer;
        const i = L.userData.i - 1;
        const j = g.userData.j;
        const nb = LINKS[i].filter((l) => l[0] === j || l[1] === j).map((l) => DATA[i].items[l[0] === j ? l[1] : l[0]][0]);

        tip.style.display = "block";
        tip.innerHTML = `
          <div class="text-[10px] font-mono tracking-wider uppercase text-[#19C8F3] font-bold mb-1">
            LAYER 0${i + 1} · ${DATA[i].t}
          </div>
          <div class="font-bold text-white text-xs mb-1">${g.userData.name}</div>
          <div class="text-[#D0E6F5] text-[11px] leading-snug">${g.userData.detail}</div>
          ${nb.length ? `<div class="mt-1.5 pt-1.5 border-t border-[#19C8F3]/30 text-[10px] text-[#7fcbe8] font-mono">Linked: ${nb.join(", ")}</div>` : ""}
        `;
        tip.style.left = Math.min(ev.clientX - host.getBoundingClientRect().left + 16, host.clientWidth - 240) + "px";
        tip.style.top = Math.max(10, ev.clientY - host.getBoundingClientRect().top - 20) + "px";
      } else if (tip) {
        tip.style.display = "none";
      }
    });

    ren.domElement.addEventListener("pointerleave", () => {
      hov = null;
      hovL = null;
      if (tip) tip.style.display = "none";
    });

    ren.domElement.addEventListener("click", (ev) => {
      if (down && Math.hypot(ev.clientX - down[0], ev.clientY - down[1]) > 5) return;
      const o: any = pick(ev);
      if (!o) return;
      const g = o.userData.tile;
      const L = o.userData.layer || (g && g.userData.layer);

      if (g) {
        sel = sel === g ? null : g;
        if (sel) {
          const i = L.userData.i - 1;
          const j = g.userData.j;
          const nb = LINKS[i].filter((l) => l[0] === j || l[1] === j).map((l) => DATA[i].items[l[0] === j ? l[1] : l[0]][0]);
          setSelectedItem({
            layerNumber: `0${i + 1}`,
            layerTitle: DATA[i].t,
            name: g.userData.name,
            detail: g.userData.detail,
            linked: nb,
          });
          setActiveLayer(L.userData.i);
        } else {
          setSelectedItem(null);
        }
      } else if (L) {
        setActiveLayer(L.userData.i);
        sel = null;
        setSelectedItem(null);
      }
    });

    // Resize
    function resize() {
      const w = host.clientWidth;
      const h = host.clientHeight;
      ren.setSize(w, h);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      cam.position.setLength(24 * Math.max(1, 1.05 / cam.aspect));
    }
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Scroll progress trigger
    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.top < winH && rect.bottom > 0) {
        const progress = Math.min(1, Math.max(0, (winH - rect.top) / (winH + rect.height)));
        if (!stateRef.current.auto) {
          stateRef.current.explodeTarget = progress;
          setExplodeVal(progress);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Animation Loop ---
    const clk = new THREE.Clock();
    const cl = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    let frameId: number;

    function tick() {
      frameId = requestAnimationFrame(tick);
      const t = clk.getElapsedTime();

      if (stateRef.current.auto) {
        stateRef.current.explodeTarget = cl(0.5 + 0.8 * Math.sin((t - 2.6) * 0.45 - 1.57), 0, 1);
        setExplodeVal(stateRef.current.explodeTarget);
      }

      e += (stateRef.current.explodeTarget - e) * 0.08;
      const ez = (n: number) => {
        const v = cl((t - n * 0.3) / 1.5, 0, 1);
        return 1 - Math.pow(1 - v, 3);
      };

      Ls[0].position.y = BASEY[0] + SPREAD * e + (1 - ez(0)) * 6;
      Ls[1].scale.setScalar(0.7 + 0.3 * ez(1));
      Ls[2].position.y = BASEY[2] - SPREAD * e - (1 - ez(2)) * 6;

      const yT = Ls[0].position.y - 0.25;
      const yB = Ls[2].position.y + 0.25;

      beams.forEach((b) => {
        b.m.scale.y = Math.max(0.01, yT - yB);
        b.m.position.y = (yT + yB) / 2;
        (b.m.material as any).opacity = 0.4 * e;
        b.beads.forEach((d) => {
          const p = (t * 0.22 + d.o) % 1;
          d.s.position.set(b.x, yT - (yT - yB) * p, b.z);
          (d.s.material as any).opacity = e * Math.sin(p * Math.PI);
        });
      });

      Ls.forEach((L) => {
        const u = L.userData as any;
        const k = stateRef.current.activeLayer && stateRef.current.activeLayer !== u.i ? 0.35 : 1;
        const TT = sel || hov;
        const li = u.i - 1;
        const tj = TT && TT.userData.layer === L ? TT.userData.j : -1;

        u.k += (k - u.k) * 0.1;
        u.h = (u.h || 0) + ((hovL === L ? 1 : 0) - (u.h || 0)) * 0.12;

        u.mats.forEach((m: any) => m.color.copy(m.userData.base).multiplyScalar(u.k));
        u.tiles.forEach((g: any) => {
          const d = g.userData;
          const nb = tj >= 0 && LINKS[li].some((l) => (l[0] === tj && l[1] === d.j) || (l[1] === tj && l[0] === d.j));
          d.lift += (((hov === g || sel === g) ? 0.1 : nb ? 0.05 : 0) - d.lift) * 0.2;
          g.position.y = d.lift;
          if (d.glow) d.glow.material.opacity = (0.35 + 0.25 * Math.sin(t * 2.2)) * u.k;
          if (d.orb) {
            d.orb.children.forEach((m: any, n: number) => {
              if (n) m.position.set(Math.cos(m.userData.a + t * 1.3) * 0.78, 0, Math.sin(m.userData.a + t * 1.3) * 0.78);
            });
            const p = (t * 0.45) % 1;
            d.pr.scale.setScalar(0.4 + p * 2.4);
            d.pr.material.opacity = (1 - p) * 0.6 * u.k;
          }
        });

        u.rim.material.color.copy(u.rim.material.userData.base).multiplyScalar(u.k * (1 + 0.6 * u.h));
        u.links.forEach((l: any) => {
          const on = tj >= 0 && (l.a === tj || l.b === tj);
          l.h += ((on ? 1 : 0) - l.h) * 0.15;
          l.mat.opacity = 0.18 + 0.75 * l.h;
          const p = (t * (0.18 + 0.3 * l.h) + l.o) % 1;
          l.s.position.copy(l.cp.getPointAt(p));
          l.s.material.opacity = (0.35 + 0.65 * l.h) * Math.sin(p * Math.PI) * u.k;
        });

        if (u.sheets) {
          u.sheets.forEach((m: any, n: number) => {
            const p = (t * 0.28 + n / 5) % 1;
            m.position.set(POS[0][0] + Math.sin(n * 2.3) * 0.25, 1.9 - 1.45 * p, POS[0][1] + Math.cos(n * 1.7) * 0.2);
            m.rotation.y = t + n;
            m.material.opacity = Math.sin(p * Math.PI) * 0.7 * u.k;
          });
        }
        if (u.sweep) {
          u.sweep.position.x = Math.sin(t * 0.7) * 3.1;
          u.sweep.material.opacity = 0.1 * u.k;
        }
      });

      const HT = sel || hov;
      if (HT && holo.parent !== HT) HT.add(holo);
      holo.visible = !!HT;
      hr.forEach((m, n) => {
        m.rotation.y = t * (n ? -1.2 : 1.6);
        m.position.y = 0.75 + 0.12 * Math.sin(t * 3 + n);
      });

      const pa = pts.geometry.attributes.position;
      for (let n = 0; n < pa.count; n++) {
        const y = pa.getY(n) + 0.004;
        pa.setY(n, y > 9 ? -9 : y);
      }
      pa.needsUpdate = true;
      pts.rotation.y = t * 0.02;

      ctl.update();
      ren.render(scene, cam);
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (ren.domElement && ren.domElement.parentNode) {
        ren.domElement.parentNode.removeChild(ren.domElement);
      }
      ren.dispose();
    };
  }, []);

  return (
    <section className="relative w-full bg-[#041526] text-[#e9faff] py-16 sm:py-24 border-b border-[#0F3556] overflow-hidden" aria-label="Botmartz Intelligence Stack">
      
      {/* ── TOP SECTION HEADER ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062B49] border border-[#19c8f3]/40 font-mono text-[11px] font-bold text-[#19c8f3] uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#19c8f3] animate-pulse" />
            <span>02 / EXPLODED ARCHITECTURE VISUALIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Botmartz Intelligence Stack.
          </h2>
          <p className="text-sm text-[#7fcbe8] mt-2 max-w-xl">
            Drag to rotate in full 3D space · Hover or click any module to trace its internal data links and inspect production specifications.
          </p>
        </div>

        {/* Status Pills */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-[#7fcbe8]">
          <div className="px-3 py-1.5 rounded-lg bg-[#062B49] border border-[#0F3556]">
            <span>Latency: </span>
            <span className="text-[#19c8f3] font-bold">&lt; 118ms</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-[#062B49] border border-[#0F3556]">
            <span>Grounding: </span>
            <span className="text-emerald-400 font-bold">100% SHA-256</span>
          </div>
        </div>
      </div>

      {/* ── 3D CANVAS STAGE CONTAINER ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={containerRef}
          className="relative w-full h-[580px] sm:h-[680px] rounded-3xl overflow-hidden border border-[#19c8f3]/35 shadow-[0_20px_60px_-15px_rgba(4,21,38,0.9)] bg-[radial-gradient(ellipse_at_50%_45%,#0a3556,#041526_70%)]"
        >
          {/* Top HUD */}
          <div className="absolute left-5 top-5 pointer-events-none font-mono text-[11px] tracking-wider uppercase text-[#7fcbe8] font-bold z-20">
            Botmartz · Intelligence Stack
            <span className="block mt-1 font-sans text-xs font-normal text-[#6c9db6] tracking-normal">
              Drag to rotate · Click module to trace data links
            </span>
          </div>

          {/* Hover Tooltip */}
          <div
            ref={tipRef}
            className="absolute hidden max-w-[240px] p-3 rounded-xl bg-[#03182a]/95 border border-[#19c8f3]/60 shadow-xl pointer-events-none z-30 backdrop-blur-md"
          />

          {/* Active Clicked Card (Desktop) */}
          {selectedItem && (
            <div
              ref={cardRef}
              className="absolute left-5 bottom-20 max-w-[280px] p-4 rounded-xl bg-[#03182a]/95 border border-[#19c8f3]/70 text-xs shadow-2xl z-30 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-1 text-[10px] font-mono uppercase text-[#7fcbe8] tracking-wider">
                <span>LAYER {selectedItem.layerNumber} · {selectedItem.layerTitle}</span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-0.5 text-[#7B9AAF] hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="font-bold text-white text-sm mb-1 text-[#19C8F3]">
                {selectedItem.name}
              </div>
              <div className="text-[#D0E6F5] text-xs leading-relaxed mb-2">
                {selectedItem.detail}
              </div>
              {selectedItem.linked.length > 0 && (
                <div className="pt-2 border-t border-[#19C8F3]/30 font-mono text-[10px] text-[#7fcbe8]">
                  <span className="text-[#19C8F3] font-bold">Linked: </span>
                  {selectedItem.linked.join(", ")}
                </div>
              )}
            </div>
          )}

          {/* Bottom Interactive Toolbar */}
          <div className="absolute left-0 right-0 bottom-4 flex flex-wrap gap-2 justify-center items-center px-4 z-20">
            <button
              onClick={() => setActiveLayer(activeLayer === 1 ? 0 : 1)}
              className={`font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                activeLayer === 1
                  ? "bg-[#19c8f3] text-[#062b49] border-[#19c8f3]"
                  : "bg-[#041526]/80 text-[#e9faff] border-[#19c8f3]/35 hover:border-[#19c8f3]"
              }`}
            >
              01 Knowledge
            </button>

            <button
              onClick={() => setActiveLayer(activeLayer === 2 ? 0 : 2)}
              className={`font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                activeLayer === 2
                  ? "bg-[#19c8f3] text-[#062b49] border-[#19c8f3]"
                  : "bg-[#041526]/80 text-[#e9faff] border-[#19c8f3]/35 hover:border-[#19c8f3]"
              }`}
            >
              02 Retrieval
            </button>

            <button
              onClick={() => setActiveLayer(activeLayer === 3 ? 0 : 3)}
              className={`font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                activeLayer === 3
                  ? "bg-[#19c8f3] text-[#062b49] border-[#19c8f3]"
                  : "bg-[#041526]/80 text-[#e9faff] border-[#19c8f3]/35 hover:border-[#19c8f3]"
              }`}
            >
              03 Intelligence
            </button>

            {/* Slider */}
            <div className="flex items-center gap-2 bg-[#041526]/80 px-3 py-1.5 rounded-full border border-[#19c8f3]/35">
              <span className="font-mono text-[10px] text-[#7fcbe8] uppercase">Explode</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodeVal}
                onChange={(e) => {
                  setIsAuto(false);
                  setExplodeVal(parseFloat(e.target.value));
                }}
                className="w-24 sm:w-32 accent-[#19c8f3] cursor-pointer"
                aria-label="Explode slider"
              />
            </div>

            {/* Auto Toggle */}
            <button
              onClick={() => setIsAuto(!isAuto)}
              className={`font-mono text-xs font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                isAuto
                  ? "bg-[#19c8f3] text-[#062b49] border-[#19c8f3]"
                  : "bg-[#041526]/80 text-[#e9faff] border-[#19c8f3]/35 hover:border-[#19c8f3]"
              }`}
            >
              {isAuto ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>Auto</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
