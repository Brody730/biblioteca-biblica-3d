/* sopas.js — 6 sopas de letras con los 66 libros (11 libros consecutivos en cada una) y sus respuestas. */
(function (root) {
  'use strict';
  const B = root.Biblioteca, A = root.Arte, { N, li, dk } = A;
  const FONT = B.FONT, esc = B.esc;
  const TAM = 15; // cuadrícula de 15 × 15
  const DIRS = [[1, 0], [0, 1], [1, 1], [1, -1]]; // →  ↓  ↘  ↗
  const FLECHA = ['→', '↓', '↘', '↗'];
  const TEMAS = ['ley', 'poe', 'may', 'eva', 'pab', 'gen'];
  const COLORES = ['#E5384F', '#F28C28', '#E8B923', '#5DB55A', '#2BA6A0', '#3E8ED0', '#5566C4', '#8C6BC2', '#D35D8A', '#8A5A2B', '#7FB800'];
  const RELLENO ='AAAAAEEEEEIIIOOOOUUSSSRRRNNNLLLTTCCDDMMPPBGVHJ';

  const palabra = b => b.nombre.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/\s+/g, '');
  function azar(seed) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }

  /** Coloca las palabras en la cuadrícula. Usa una semilla fija para que siempre salga igual. */
  function crear(libros, semilla) {
    for (let intento = 0; intento < 400; intento++) {
      const r = azar(semilla * 7919 + intento * 104729 + 1);
      const g = Array.from({ length: TAM }, () => Array(TAM).fill(''));
      const orden = libros.map((b, i) => ({ b, w: palabra(b), d: i % 4 })).sort((a, c) => c.w.length - a.w.length);
      // reparte las direcciones al azar, pero usando las 4
      orden.forEach(o => { o.d = (o.d + Math.floor(r() * 4)) % 4; });
      const usadas = [0, 0, 0, 0];
      const puestas = [];
      let ok = true;
      for (const o of orden) {
        let hecho = false;
        const prefer = [0, 1, 2, 3].sort((a, c) => usadas[a] - usadas[c] + (r() - .5) * .8);
        for (const d of prefer) {
          const [dx, dy] = DIRS[d], L = o.w.length;
          const cand = [];
          for (let y = 0; y < TAM; y++) for (let x = 0; x < TAM; x++) {
            const ex = x + dx * (L - 1), ey = y + dy * (L - 1);
            if (ex < 0 || ex >= TAM || ey < 0 || ey >= TAM) continue;
            let cruces = 0, bien = true;
            for (let k = 0; k < L; k++) {
              const c = g[y + dy * k][x + dx * k];
              if (c && c !== o.w[k]) { bien = false; break; }
              if (c) cruces++;
            }
            if (bien) cand.push({ x, y, cruces });
          }
          if (!cand.length) continue;
          // prefiere pocos cruces para que sea fácil de leer, con algo de azar
          cand.sort((a, c) => a.cruces - c.cruces || r() - .5);
          const pick = cand[Math.floor(r() * Math.min(cand.length, 25))];
          for (let k = 0; k < L; k++) g[pick.y + dy * k][pick.x + dx * k] = o.w[k];
          puestas.push({ b: o.b, w: o.w, x: pick.x, y: pick.y, d });
          usadas[d]++; hecho = true; break;
        }
        if (!hecho) { ok = false; break; }
      }
      if (!ok) continue;
      const conNumero = libros.some(b => /\d/.test(b.nombre));
      for (let y = 0; y < TAM; y++) for (let x = 0; x < TAM; x++) {
        if (!g[y][x]) g[y][x] = conNumero && r() < .012 ? String(1 + Math.floor(r() * 3)) : RELLENO[Math.floor(r() * RELLENO.length)];
      }
      if (puestas.every(p => contar(g, p.w) === 1)) {
        puestas.sort((a, c) => a.b.n - c.b.n);
        return { g, puestas };
      }
    }
    throw new Error('No se pudo armar la sopa');
  }
  /** Cuántas veces aparece una palabra en la cuadrícula (en las 8 direcciones). */
  function contar(g, w) {
    let n = 0;
    const ds = [[1, 0], [0, 1], [1, 1], [1, -1], [-1, 0], [0, -1], [-1, -1], [-1, 1]];
    for (let y = 0; y < TAM; y++) for (let x = 0; x < TAM; x++) for (const [dx, dy] of ds) {
      let k = 0;
      while (k < w.length) { const xx = x + dx * k, yy = y + dy * k; if (xx < 0 || yy < 0 || xx >= TAM || yy >= TAM || g[yy][xx] !== w[k]) break; k++; }
      if (k === w.length) n++;
    }
    return n;
  }

  // ===================== DIBUJO =====================
  const HW = 215.9, HH = 279.4, CELDA = 10, GX = (HW - TAM * CELDA) / 2, GY = 70;
  const hoja = inner => `<svg class="hoja" viewBox="0 0 ${HW} ${HH}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}"><rect width="${HW}" height="${HH}" fill="#fff"/>${inner}</svg>`;

  function marco(G) {
    let o = `<rect x="7" y="7" width="${HW - 14}" height="${HH - 14}" rx="8" fill="${li(G.claro, .55)}" stroke="${G.base}" stroke-width="1.2"/>` +
      `<rect x="9.5" y="9.5" width="${HW - 19}" height="${HH - 19}" rx="6.5" fill="none" stroke="${G.base}" stroke-width=".35" stroke-dasharray="1.4 1.4" opacity=".7"/>`;
    [[16, 16], [HW - 16, 16], [16, HH - 16], [HW - 16, HH - 16]].forEach(([x, y]) => { o += A.star5(x, y, 3.2, '#FFE27A'); });
    return o;
  }
  function titulo(G, numero, texto, sub) {
    return `<g>` +
      `<circle cx="27" cy="29" r="10.5" fill="${dk(G.osc, .2)}"/><circle cx="26.4" cy="28.2" r="10.5" fill="${G.base}"/>` +
      `<circle cx="26.4" cy="28.2" r="8.6" fill="none" stroke="#fff" stroke-width=".6" opacity=".7"/>` +
      `<text x="26.4" y="32.6" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${numero}</text>` +
      `<text x="41.8" y="31.2" font-size="12" font-weight="700" fill="${dk(G.osc, .25)}">${esc(texto)}</text>` +
      `<text x="41" y="30.4" font-size="12" font-weight="700" fill="url(#name-fill)" stroke="${G.osc}" stroke-width=".45" paint-order="stroke">${esc(texto)}</text>` +
      `<text x="41.5" y="39.4" font-size="4.2" font-weight="600" fill="${G.osc}">${esc(sub)}</text></g>`;
  }
  function repisa(libros, x, y) { // los 11 lomos sobre una tabla de madera
    const w = 5.6, gap = .6;
    let o = libros.map((b, i) => `<g transform="translate(${N(x + i * (w + gap))} ${y}) scale(${N(w / 30)})"><g clip-path="url(#trim-strip)">${B.pieza('lomo', b)}</g></g>`).join('');
    const ancho = libros.length * (w + gap) - gap, h = 130 * w / 30;
    return o + `<rect x="${N(x - 2)}" y="${N(y + h)}" width="${N(ancho + 4)}" height="2.6" rx=".8" fill="${A.grad(['#E0B07A', '#B9814A', '#8A5A2B'])}"/>`;
  }
  function celdas(g, G) {
    let o = `<rect x="${GX - 4}" y="${GY - 4}" width="${TAM * CELDA + 8}" height="${TAM * CELDA + 8}" rx="5" fill="${dk(G.base, .1)}" opacity=".18" transform="translate(1 1.4)"/>` +
      `<rect x="${GX - 4}" y="${GY - 4}" width="${TAM * CELDA + 8}" height="${TAM * CELDA + 8}" rx="5" fill="#fff" stroke="${G.base}" stroke-width=".8"/>`;
    for (let i = 1; i < TAM; i++) {
      o += `<line x1="${GX + i * CELDA}" y1="${GY}" x2="${GX + i * CELDA}" y2="${GY + TAM * CELDA}" stroke="${G.claro}" stroke-width=".3"/>` +
        `<line x1="${GX}" y1="${GY + i * CELDA}" x2="${GX + TAM * CELDA}" y2="${GY + i * CELDA}" stroke="${G.claro}" stroke-width=".3"/>`;
    }
    return o;
  }
  const letras = (g, color) => `<g font-size="6" font-weight="600" fill="${color}" text-anchor="middle">` +
    g.map((fila, y) => fila.map((c, x) => `<text x="${GX + x * CELDA + CELDA / 2}" y="${N(GY + y * CELDA + CELDA / 2 + 2.15)}">${c}</text>`).join('')).join('') + `</g>`;

  function lista(puestas, G, respuestas) {
    let o = '';
    const colW = 45.5, x0 = 17.5, y0 = 229.5;
    puestas.forEach((p, i) => {
      const col = i % 4, fila = Math.floor(i / 4), x = x0 + col * colW, y = y0 + fila * 11.4, Gb = B.GRUPOS[p.b.g];
      o += `<rect x="${x}" y="${y}" width="${colW - 2.5}" height="9.6" rx="4.8" fill="#fff" stroke="${li(Gb.base, .35)}" stroke-width=".45"/>` +
        B.medallon(p.b, x + 4.8, y + 4.8, 4.3, true) +
        `<text x="${x + 10.6}" y="${y + (respuestas ? 4.4 : 6.1)}" font-size="${B.tw(p.b.nombre, 3.4) > 23 ? 2.9 : 3.4}" font-weight="600" fill="${Gb.osc}">${esc(p.b.nombre)}</text>`;
      if (respuestas) o += `<text x="${x + 10.6}" y="${y + 7.9}" font-size="2.4" fill="#6E625C">${FLECHA[p.d]} fila ${p.y + 1}, columna ${p.x + 1}</text>` +
        `<rect x="${x + colW - 9.4}" y="${y + 3.2}" width="5" height="3.2" rx="1.6" fill="${COLORES[i]}" fill-opacity=".45" stroke="${dk(COLORES[i], .1)}" stroke-width=".4"/>`;
      else o += `<circle cx="${x + colW - 7}" cy="${y + 4.8}" r="2.2" fill="none" stroke="${Gb.base}" stroke-width=".45"/>`;
    });
    // espacio 12: carita / estrella
    const x = x0 + 3 * colW, y = y0 + 2 * 11.4;
    o += `<rect x="${x}" y="${y}" width="${colW - 2.5}" height="9.6" rx="4.8" fill="${G.base}"/>` + A.star5(x + 5, y + 4.8, 3, '#FFE27A') +
      `<text x="${x + 10}" y="${y + 6.2}" font-size="3.4" font-weight="700" fill="#fff">${respuestas ? '¡11 de 11!' : '¡Lo lograste!'}</text>`;
    return o;
  }
  function pie(G) {
    return `<text x="${HW / 2}" y="${HH - 11.6}" text-anchor="middle" font-size="2.5" font-weight="600" letter-spacing=".35" fill="${G.osc}" opacity=".75">BIBLIOTECA BÍBLICA 3D · LOS 66 LIBROS DE LA BIBLIA</text>`;
  }

  function flechas(x, y, c) { // 4 flechitas dibujadas (no dependen de la letra)
    const una = (i, rot) => `<g transform="translate(${x + i * 9.5} ${y}) rotate(${rot})"><circle r="3.6" fill="${c}"/><path d="M-1.9 0 H1.6 M.2 -1.4 L1.7 0 L.2 1.4" stroke="#fff" stroke-width=".7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    return una(0, 0) + una(1, 90) + una(2, 45) + una(3, -45);
  }
  function hojaSopa(num, libros, s) {
    const G = B.GRUPOS[TEMAS[num - 1]], a = libros[0], z = libros[libros.length - 1];
    return hoja(marco(G) + titulo(G, num, 'Sopa de letras', `Libros ${a.n} al ${z.n}: de ${a.nombre} a ${z.nombre}`) +
      repisa(libros, 136.5, 14) +
      `<text x="18" y="52" font-size="3.6" fill="#3d3d3d">Nombre: <tspan fill="${G.base}">_______________________________</tspan>   Fecha: <tspan fill="${G.base}">______________</tspan></text>` +
      `<text x="18" y="61" font-size="3.3" fill="#3d3d3d">Encuentra los 11 libros. Están escritos sin acentos ni espacios y van en estas direcciones:</text>` + flechas(152.5, 59.8, G.osc) +
      celdas(s.g, G) + letras(s.g, '#2A221E') + lista(s.puestas, G, false) + pie(G));
  }
  function hojaRespuestas(num, libros, s) {
    const G = B.GRUPOS[TEMAS[num - 1]], a = libros[0], z = libros[libros.length - 1];
    // una cápsula de color por libro: relleno transparente + contorno
    let marcas = '';
    s.puestas.forEach((p, i) => {
      const [dx, dy] = DIRS[p.d], L = p.w.length, c = COLORES[i];
      const x1 = GX + p.x * CELDA + 5, y1 = GY + p.y * CELDA + 5, x2 = x1 + dx * (L - 1) * CELDA, y2 = y1 + dy * (L - 1) * CELDA;
      const ang = N(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI), len = N(Math.hypot(x2 - x1, y2 - y1));
      marcas += `<rect x="${N(x1 - 3.9)}" y="${N(y1 - 3.9)}" width="${N(len + 7.8)}" height="7.8" rx="3.9" fill="${c}" fill-opacity=".3" stroke="${dk(c, .1)}" stroke-width=".55" transform="rotate(${ang} ${x1} ${y1})"/>`;
    });
    return hoja(marco(G) + titulo(G, num, 'Respuestas', `Sopa de letras ${num} · libros ${a.n} al ${z.n}`) +
      repisa(libros, 136.5, 14) +
      `<text x="18" y="52" font-size="3.6" font-weight="600" fill="${G.osc}">De ${esc(a.nombre)} a ${esc(z.nombre)}</text>` +
      `<text x="18" y="60" font-size="3.3" fill="#3d3d3d">Cada libro tiene su color. En la lista de abajo dice en qué fila y columna empieza y hacia dónde va.</text>` +
      celdas(s.g, G) + marcas + letras(s.g, '#2A221E') + lista(s.puestas, G, true) + pie(G));
  }

  /** Devuelve las 6 sopas: [{num, libros, sopa}] */
  function todas() {
    const libros = B.LIBROS.slice().sort((a, c) => a.n - c.n);
    return [0, 1, 2, 3, 4, 5].map(i => {
      const ls = libros.slice(i * 11, i * 11 + 11);
      return { num: i + 1, libros: ls, sopa: crear(ls, 2027 + i * 31) };
    });
  }
  root.Sopas = { todas, hojaSopa, hojaRespuestas, contar, palabra, TAM };
})(window);
