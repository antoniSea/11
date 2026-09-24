// Wspólne helpery scen: matematyka, SVG i animowany przekrój V8.
// Wszystko liczone z czasu osi (GSAP onUpdate), bez zegara i bez losowości.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const D2R = Math.PI / 180;
  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const lerp = (a, b, k) => a + (b - a) * k;
  const wrap = (a, m) => ((a % m) + m) % m;
  const easeIO = (x) => { x = clamp01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // Układ korbowy: odległość sworznia tłoka od osi wału wzdłuż osi cylindra.
  const pinDist = (r, L, th) => r * Math.cos(th) + Math.sqrt(L * L - Math.pow(r * Math.sin(th), 2));

  // Przekrój V (widok od przodu): dwa cylindry pod kątem 2*bank na wspólnym czopie.
  // update(deg) ustawia wał, tłoki, korbowody i błysk zapłonu.
  function vSection(parent, o) {
    const cx = o.cx, cy = o.cy, s = o.s || 1, bank = o.bank || 45;
    const r = 70 * s, L = 230 * s, pw = 150 * s, ph = 96 * s;
    const deck = -(L + r + ph * 0.6 + 12 * s);
    const root = el("g", {}, parent);

    el("circle", { cx, cy, r: 190 * s, fill: "none", stroke: "rgba(150,165,182,0.22)", "stroke-width": 3 * s, "stroke-dasharray": `${10 * s} ${10 * s}` }, root);

    const banks = [];
    for (const a of [-bank, bank]) {
      const g = el("g", { transform: `translate(${cx} ${cy}) rotate(${a})` }, root);
      const lx = pw / 2 + 8 * s;
      el("rect", { x: -lx - 16 * s, y: deck, width: 16 * s, height: -deck - 140 * s, fill: "#1b222b", stroke: "rgba(150,165,182,0.5)", "stroke-width": 2 * s }, g);
      el("rect", { x: lx, y: deck, width: 16 * s, height: -deck - 140 * s, fill: "#1b222b", stroke: "rgba(150,165,182,0.5)", "stroke-width": 2 * s }, g);
      const glow = el("rect", { x: -lx, y: deck, width: 2 * lx, height: 10, fill: "#ff6a4d", opacity: 0 }, g);
      el("rect", { x: -lx - 30 * s, y: deck - 96 * s, width: 2 * lx + 60 * s, height: 96 * s, rx: 10 * s, fill: "#232b35", stroke: "rgba(150,165,182,0.55)", "stroke-width": 2 * s }, g);
      el("rect", { x: -lx - 18 * s, y: deck - 136 * s, width: 2 * lx + 36 * s, height: 40 * s, rx: 14 * s, fill: "#2e3742", stroke: "rgba(150,165,182,0.45)", "stroke-width": 2 * s }, g);
      el("line", { x1: 0, y1: deck - 60 * s, x2: 0, y2: deck + 4 * s, stroke: "#d6dde5", "stroke-width": 8 * s, "stroke-linecap": "round" }, g);
      const spark = el("circle", { cx: 0, cy: deck + 6 * s, r: 16 * s, fill: "#fff4e2", opacity: 0 }, g);
      const rod = el("line", { stroke: "#6c7682", "stroke-width": 24 * s, "stroke-linecap": "round" }, g);
      const piston = el("g", {}, g);
      el("rect", { x: -pw / 2, y: -ph * 0.6, width: pw, height: ph, rx: 8 * s, fill: "#8a95a2", stroke: "#d6dde5", "stroke-width": 3 * s }, piston);
      for (let i = 0; i < 3; i++) el("line", { x1: -pw / 2, x2: pw / 2, y1: -ph * 0.6 + (14 + i * 12) * s, y2: -ph * 0.6 + (14 + i * 12) * s, stroke: "#4a5360", "stroke-width": 3 * s }, piston);
      el("circle", { cx: 0, cy: 0, r: 16 * s, fill: "#4a5360", stroke: "#d6dde5", "stroke-width": 2 * s }, piston);
      banks.push({ a, glow, spark, rod, piston });
    }

    const crank = el("g", { transform: `translate(${cx} ${cy})` }, root);
    const cw = el("path", { fill: "#3a444f", stroke: "#8a95a2", "stroke-width": 3 * s }, crank);
    const web = el("line", { stroke: "#5b6573", "stroke-width": 50 * s, "stroke-linecap": "round" }, crank);
    el("circle", { cx: 0, cy: 0, r: 34 * s, fill: "#a4afbb", stroke: "#e6ebf0", "stroke-width": 3 * s }, crank);
    const pin = el("circle", { r: 28 * s, fill: "#c3ccd6", stroke: "#e6ebf0", "stroke-width": 3 * s }, crank);

    function update(deg) {
      // kąt wału rośnie zgodnie z ruchem wskazówek zegara, 0 = czop na górze
      const px = Math.sin(deg * D2R) * r, py = -Math.cos(deg * D2R) * r;
      pin.setAttribute("cx", px.toFixed(2));
      pin.setAttribute("cy", py.toFixed(2));
      web.setAttribute("x1", 0); web.setAttribute("y1", 0);
      web.setAttribute("x2", px.toFixed(2)); web.setAttribute("y2", py.toFixed(2));
      const R = 130 * s, a0 = (deg + 180 - 60) * D2R, a1 = (deg + 180 + 60) * D2R;
      cw.setAttribute("d", `M 0 0 L ${(Math.sin(a0) * R).toFixed(2)} ${(-Math.cos(a0) * R).toFixed(2)} A ${R} ${R} 0 0 1 ${(Math.sin(a1) * R).toFixed(2)} ${(-Math.cos(a1) * R).toFixed(2)} Z`);
      banks.forEach((b, i) => {
        const th = (deg - b.a) * D2R;
        const lx = Math.sin(th) * r, ly = -Math.cos(th) * r;
        const sd = pinDist(r, L, th);
        b.piston.setAttribute("transform", `translate(0 ${(-sd).toFixed(2)})`);
        b.rod.setAttribute("x1", lx.toFixed(2)); b.rod.setAttribute("y1", ly.toFixed(2));
        b.rod.setAttribute("x2", 0); b.rod.setAttribute("y2", (-sd).toFixed(2));
        // komora spalania między denkiem tłoka a głowicą
        const top = -sd - ph * 0.6;
        b.glow.setAttribute("height", Math.max(0, top - deck).toFixed(2));
        // zapłon co drugi obrót, cylindry na wspólnym czopie przesunięte o 90°
        let ph0 = wrap(deg - b.a - i * 450, 720);
        if (ph0 > 360) ph0 -= 720;
        const k = ph0 < -5 ? 0 : Math.exp(-Math.pow(ph0 / 40, 2));
        b.glow.setAttribute("opacity", (0.85 * k).toFixed(3));
        b.spark.setAttribute("opacity", (ph0 > -5 && ph0 < 25 ? 1 - ph0 / 25 : 0).toFixed(3));
      });
    }
    update(0);
    return { root, update };
  }

  window.V8 = { NS, D2R, el, clamp01, lerp, wrap, easeIO, pinDist, vSection };
})();
