/* piezas.js — arma las 5 piezas de cada libro (portada, contraportada, lomo, canto y tapa)
   en milímetros reales: portada/contraportada 100 × 130, lomo/canto 30 × 130, tapa 100 × 30. */
(function (root) {
  'use strict';
  const A = root.Arte, { N, li, dk, mix } = A;
  const FONT = "Fredoka,'Baloo 2','Arial Rounded MT Bold',sans-serif";

  const GRUPOS = {
    ley: { nombre: 'La Ley', t: 'AT', base: '#4FA36B', claro: '#D9F0DC', osc: '#2E6B45' },
    his: { nombre: 'Historia', t: 'AT', base: '#E0874A', claro: '#FBE3CF', osc: '#9A4E1F' },
    poe: { nombre: 'Poesía y Sabiduría', t: 'AT', base: '#8C6BC2', claro: '#E7DEF5', osc: '#573D86' },
    may: { nombre: 'Profetas Mayores', t: 'AT', base: '#D9564A', claro: '#F8D9D5', osc: '#8E2E25' },
    men: { nombre: 'Profetas Menores', t: 'AT', base: '#E3B23C', claro: '#FBEFC9', osc: '#8F6A12' },
    eva: { nombre: 'Evangelios', t: 'NT', base: '#3E8ED0', claro: '#D6E8F7', osc: '#1F5A8F' },
    hch: { nombre: 'Historia de la Iglesia', t: 'NT', base: '#2BA6A0', claro: '#D2F0EE', osc: '#176864' },
    pab: { nombre: 'Cartas de Pablo', t: 'NT', base: '#D35D8A', claro: '#F7DAE6', osc: '#8A2F55' },
    gen: { nombre: 'Cartas Generales', t: 'NT', base: '#5566C4', claro: '#DDE1F7', osc: '#303C85' },
    pro: { nombre: 'Profecía', t: 'NT', base: '#2E3A6B', claro: '#D9DCEC', osc: '#1A2146' }
  };
  const ORDEN = ['ley', 'his', 'poe', 'may', 'men', 'eva', 'hch', 'pab', 'gen', 'pro'];
  const LIBROS = [];
  const DIM = { portada: [100, 130], contra: [100, 130], lomo: [30, 130], canto: [30, 130], tapa: [100, 30] };

  // ---------- texto: estimación de ancho y ajuste ----------
  const W_UP = { A: .68, B: .66, C: .64, D: .7, E: .58, F: .56, G: .7, H: .72, I: .3, J: .5, K: .66, L: .52, M: .88, N: .74, O: .74, P: .62, Q: .74, R: .66, S: .6, T: .58, U: .7, V: .66, W: .96, X: .64, Y: .62, Z: .6 };
  const W_LO = { a: .56, b: .6, c: .5, d: .6, e: .56, f: .36, g: .58, h: .58, i: .26, j: .28, k: .54, l: .26, m: .88, n: .58, o: .58, p: .6, q: .6, r: .4, s: .48, t: .38, u: .58, v: .52, w: .78, x: .5, y: .52, z: .48 };
  const base = ch => ch.normalize('NFD').replace(/[̀-ͯ]/g, '');
  function tw(str, fs, ls) {
    let u = 0, n = 0;
    for (const c0 of str) {
      const ch = base(c0); n++;
      if (ch === ' ') u += .28; else if (W_UP[ch]) u += W_UP[ch]; else if (W_LO[ch]) u += W_LO[ch];
      else if (/[0-9]/.test(ch)) u += .6; else if (".,;:!¡'’".includes(ch)) u += .26; else if ('¿?'.includes(ch)) u += .48;
      else if ('«»“”()-–'.includes(ch)) u += .4; else if (ch === '…') u += .8; else if (ch === '·') u += .3; else u += .56;
    }
    return u * fs * 1.03 + (ls || 0) * Math.max(0, n - 1);
  }
  function wrap(str, fs, maxW) {
    const out = []; let line = '';
    str.split(/\s+/).forEach(w => {
      const t = line ? line + ' ' + w : w;
      if (tw(t, fs) <= maxW || !line) line = t; else { out.push(line); line = w; }
    });
    if (line) out.push(line);
    return out;
  }
  function fit(str, sizes, maxW, maxH, lh) {
    for (const fs of sizes) { const lines = wrap(str, fs, maxW); if (lines.length * fs * lh <= maxH) return { fs, lines }; }
    const fs = sizes[sizes.length - 1]; return { fs, lines: wrap(str, fs, maxW) };
  }
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const up = t => t.toUpperCase();

  // ---------- definiciones compartidas ----------
  function defsBase() {
    let d =
      `<linearGradient id="gold-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF0B8"/><stop offset=".45" stop-color="#E8BE55"/><stop offset="1" stop-color="#A87A1E"/></linearGradient>` +
      `<linearGradient id="cream-out" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFDF6"/><stop offset=".5" stop-color="#F6EAD0"/><stop offset="1" stop-color="#D5BD8D"/></linearGradient>` +
      `<linearGradient id="cream-in" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#CDB27E"/><stop offset="1" stop-color="#FFF8E6"/></linearGradient>` +
      `<linearGradient id="name-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F6E3BE"/></linearGradient>` +
      `<radialGradient id="inner-shadow" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#1E0D08" stop-opacity="0"/><stop offset="1" stop-color="#1E0D08" stop-opacity=".45"/></radialGradient>` +
      `<radialGradient id="msombra" cx=".5" cy=".5" r=".5"><stop offset=".84" stop-color="#2A120C" stop-opacity=".34"/><stop offset="1" stop-color="#2A120C" stop-opacity="0"/></radialGradient>` +
      `<radialGradient id="bead-gold" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#FFF6CC"/><stop offset=".5" stop-color="#EAC04F"/><stop offset="1" stop-color="#9C6F17"/></radialGradient>` +
      `<radialGradient id="bulb" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#FFFBE0"/><stop offset=".55" stop-color="#FFD54A"/><stop offset="1" stop-color="#E39A1F"/></radialGradient>` +
      `<linearGradient id="pages-x" x1="0" x2="1"><stop offset="0" stop-color="#E6D5B6"/><stop offset=".5" stop-color="#FFF9EC"/><stop offset="1" stop-color="#E6D5B6"/></linearGradient>` +
      `<linearGradient id="pages-y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6D5B6"/><stop offset=".5" stop-color="#FFF9EC"/><stop offset="1" stop-color="#E6D5B6"/></linearGradient>` +
      `<pattern id="lines-v" width=".7" height="10" patternUnits="userSpaceOnUse"><line x1=".35" y1="0" x2=".35" y2="10" stroke="#CDBB98" stroke-width=".14"/></pattern>` +
      `<pattern id="lines-h" width="10" height=".7" patternUnits="userSpaceOnUse"><line x1="0" y1=".35" x2="10" y2=".35" stroke="#CDBB98" stroke-width=".14"/></pattern>` +
      `<pattern id="linen" width="1.3" height="16" patternUnits="userSpaceOnUse"><line x1=".35" y1="0" x2=".35" y2="16" stroke="#fff" stroke-width=".12" opacity=".3"/><line x1=".95" y1="2" x2=".95" y2="11" stroke="#000" stroke-width=".1" opacity=".12"/></pattern>` +
      `<clipPath id="clip-cover"><rect x="-1.5" y="-1.5" width="103" height="133"/></clipPath>` +
      `<clipPath id="clip-strip"><rect x="-1.5" y="-1.5" width="33" height="133"/></clipPath>` +
      `<clipPath id="clip-top"><rect x="-1.5" y="-1.5" width="103" height="33"/></clipPath>` +
      `<clipPath id="winclip"><circle r="28.6"/></clipPath>` +
      `<clipPath id="trim-cover"><rect width="100" height="130"/></clipPath>` +
      `<clipPath id="trim-strip"><rect width="30" height="130"/></clipPath>` +
      `<clipPath id="trim-top"><rect width="100" height="30"/></clipPath>` +
      `<linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></linearGradient>`;
    ORDEN.forEach(id => {
      const G = GRUPOS[id], deep = dk(G.osc, .22);
      d += `<radialGradient id="face-${id}" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="${li(G.claro, .6)}"/><stop offset=".6" stop-color="${G.claro}"/><stop offset="1" stop-color="${mix(G.claro, G.base, .3)}"/></radialGradient>` +
        `<linearGradient id="spine-${id}" gradientUnits="userSpaceOnUse" x1="-1.5" y1="0" x2="31.5" y2="0"><stop offset="0" stop-color="${dk(G.base, .45)}"/><stop offset=".2" stop-color="${dk(G.base, .18)}"/><stop offset=".42" stop-color="${li(G.base, .3)}"/><stop offset=".64" stop-color="${G.base}"/><stop offset=".9" stop-color="${dk(G.base, .25)}"/><stop offset="1" stop-color="${dk(G.base, .45)}"/></linearGradient>` +
        `<linearGradient id="bx-${id}" x1="0" x2="1"><stop offset="0" stop-color="${dk(G.base, .25)}"/><stop offset=".5" stop-color="${li(G.base, .12)}"/><stop offset="1" stop-color="${dk(G.base, .25)}"/></linearGradient>` +
        `<linearGradient id="by-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dk(G.base, .25)}"/><stop offset=".5" stop-color="${li(G.base, .12)}"/><stop offset="1" stop-color="${dk(G.base, .25)}"/></linearGradient>` +
        `<linearGradient id="hl-${id}" x1="0" x2="1"><stop offset="0" stop-color="${deep}" stop-opacity=".35"/><stop offset="1" stop-color="${deep}" stop-opacity="0"/></linearGradient>` +
        `<linearGradient id="hr-${id}" x1="1" x2="0"><stop offset="0" stop-color="${deep}" stop-opacity=".35"/><stop offset="1" stop-color="${deep}" stop-opacity="0"/></linearGradient>`;
    });
    return d;
  }

  // ---------- medallón con la escena del libro ----------
  const escenas = new Map();
  function escena(b) {
    if (!escenas.has(b.n)) {
      const e = b.esc(A) || {};
      const c = b.cielo || ['#8FD0F5', '#E3F4FD'];
      e.sky = Array.isArray(c) ? A.grad(c) : A.grad(c.h, true);
      escenas.set(b.n, e);
    }
    return escenas.get(b.n);
  }
  function cuentas(b) {
    const q = b.cuentas; if (!q) return '';
    const G = GRUPOS[b.g]; let o = '';
    for (let i = 0; i < q.n; i++) {
      const ang = (q.full ? -90 + i * 360 / q.n : -90 + (i - (q.n - 1) / 2) * 27) * Math.PI / 180;
      const oro = !q.full || i === 0;
      o += `<circle cx="${N(Math.cos(ang) * 32)}" cy="${N(Math.sin(ang) * 32)}" r="${oro ? 1.9 : 1.5}" fill="${oro ? 'url(#bead-gold)' : A.rad(G.base)}"/>`;
    }
    return o;
  }
  function medallon(b, cx, cy, R, mini) {
    const e = escena(b);
    let o = `<g transform="translate(${cx} ${cy}) scale(${N(R / 34)})">` +
      `<circle cx="1.8" cy="2.6" r="38" fill="url(#msombra)"/>` +
      `<circle r="34" fill="url(#cream-out)"/><circle r="30.2" fill="url(#cream-in)"/><circle r="28.6" fill="${e.sky}"/>`;
    if (mini) {
      o += `<g clip-path="url(#winclip)">${e.b || ''}${e.f || ''}${e.t || ''}<circle r="28.6" fill="url(#inner-shadow)"/></g>`;
    } else {
      o += `<g clip-path="url(#winclip)">${e.b || ''}<circle r="28.6" fill="url(#inner-shadow)"/></g>${e.f || ''}`;
      if (e.t) o += `<g clip-path="url(#winclip)">${e.t}</g>`;
      o += cuentas(b);
    }
    return o + '</g>';
  }

  // ---------- nombre con extrusión ----------
  function nombreMarkup(b) {
    const m = up(b.nombre).match(/^(\d) (.+)$/);
    return m ? `<tspan fill="url(#gold-v)">${m[1]}</tspan> ${esc(m[2])}` : esc(up(b.nombre));
  }
  function nombre3D(b, x, y, fs, anchor, ls, ox, oy) {
    const G = GRUPOS[b.g], deep = dk(G.osc, .22), plain = esc(up(b.nombre)), k = Math.max(fs / 15, .5);
    return `<g font-family="${FONT}" font-weight="700" font-size="${N(fs)}" text-anchor="${anchor}" letter-spacing="${ls}">` +
      `<text x="${N(x + ox * 3 * k)}" y="${N(y + oy * 3 * k)}" fill="${deep}">${plain}</text>` +
      `<text x="${N(x + ox * 2 * k)}" y="${N(y + oy * 2 * k)}" fill="${deep}">${plain}</text>` +
      `<text x="${N(x + ox * k)}" y="${N(y + oy * k)}" fill="${G.osc}">${plain}</text>` +
      `<text x="${x}" y="${y}" fill="url(#name-fill)" stroke="${G.osc}" stroke-width="${N(.45 * k)}" paint-order="stroke">${nombreMarkup(b)}</text></g>`;
  }
  const marco = deep =>
    `<rect x="4.6" y="4.6" width="92" height="121" rx="5" fill="none" stroke="${deep}" stroke-opacity=".18" stroke-width=".7"/>` +
    `<rect x="4" y="4" width="92" height="121" rx="5" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width=".7"/>`;

  // ---------- A · PORTADA ----------
  function portada(b) {
    const G = GRUPOS[b.g], id = b.g, deep = dk(G.osc, .22);
    const tag = (G.t === 'AT' ? 'ANTIGUO TESTAMENTO' : 'NUEVO TESTAMENTO') + ' · ' + up(G.nombre);
    let tfs = 2.7, tl = tw(tag, tfs, .3);
    if (tl > 78) { tfs = tfs * 78 / tl; tl = 78; }
    const pw = tl + 8, name = up(b.nombre);
    const fs = Math.min(15, (84 - .5 * (name.length - 1)) / tw(name, 1, 0));
    const sub = up(b.sub), sw = tw(sub, 3.3, .5) + 11;
    return `<g clip-path="url(#clip-cover)">` +
      `<rect x="-1.5" y="-1.5" width="103" height="133" fill="url(#face-${id})"/>` +
      `<rect x="-1.5" y="-1.5" width="8.5" height="133" fill="url(#hl-${id})"/>` + marco(deep) +
      `<rect x="${N(50 - pw / 2)}" y="8" width="${N(pw)}" height="6.2" rx="3.1" fill="#fff" opacity=".6"/>` +
      `<text x="50" y="12.2" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="${N(tfs)}" letter-spacing=".3" fill="${G.osc}">${esc(tag)}</text>` +
      medallon(b, 50, 58, 34, false) +
      nombre3D(b, 50, N(110 - (15 - fs) * .3), fs, 'middle', .5, .3, .43) +
      `<rect x="${N(50.4 - sw / 2)}" y="115.5" width="${N(sw)}" height="6.4" rx="3.2" fill="${deep}" opacity=".35"/>` +
      `<rect x="${N(50 - sw / 2)}" y="115" width="${N(sw)}" height="6.4" rx="3.2" fill="${G.osc}"/>` +
      `<rect x="${N(51.5 - sw / 2)}" y="115.6" width="${N(sw - 3)}" height="1.3" rx=".65" fill="#fff" opacity=".18"/>` +
      `<text x="50" y="119.35" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="3.3" letter-spacing=".5" fill="#fff">${esc(sub)}</text>` +
      `</g>`;
  }

  // ---------- B · CONTRAPORTADA ----------
  function contra(b) {
    const G = GRUPOS[b.g], id = b.g, deep = dk(G.osc, .22), tinta = dk(G.osc, .38);
    const name = up(b.nombre), fs = Math.min(9, (56 - .4 * (name.length - 1)) / tw(name, 1, 0));
    const q = fit(b.cita, [4.4, 4.1, 3.8, 3.5, 3.2, 3.0, 2.8, 2.6], 68, 28, 1.4), ql = q.fs * 1.4;
    const qy = 41.5 + (28 - q.lines.length * ql) / 2 + q.fs * .92;
    const d = fit(b.dato, [3.5, 3.3, 3.1, 2.9, 2.7, 2.5], 69, 22, 1.42), dl = d.fs * 1.42;
    const dy = 93 + (22 - d.lines.length * dl) / 2 + d.fs * .9;
    let o = `<g clip-path="url(#clip-cover)" font-family="${FONT}">` +
      `<rect x="-1.5" y="-1.5" width="103" height="133" fill="url(#face-${id})"/>` +
      `<rect x="93" y="-1.5" width="8.5" height="133" fill="url(#hr-${id})"/>` + marco(deep) +
      medallon(b, 20.5, 20.5, 8.6, true) +
      nombre3D(b, 32, 23, fs, 'start', .4, .28, .34) +
      `<text x="32.2" y="28.6" font-size="2.6" font-weight="600" letter-spacing=".25" fill="${G.osc}">LIBRO ${b.n} DE 66 · ${b.cap} ${b.cap === 1 ? 'CAPÍTULO' : 'CAPÍTULOS'}</text>` +
      // cita
      `<rect x="11" y="37.2" width="80" height="43" rx="5" fill="${deep}" opacity=".18"/>` +
      `<rect x="10" y="36" width="80" height="43" rx="5" fill="#FFFAF3"/>` +
      `<rect x="10" y="36" width="80" height="43" rx="5" fill="none" stroke="#fff" stroke-width=".8"/>` +
      `<text x="13" y="50" font-size="15" font-weight="700" fill="${G.base}" opacity=".3">“</text>` +
      `<text x="87" y="79" font-size="15" font-weight="700" fill="${G.base}" opacity=".3" text-anchor="end">”</text>` +
      `<g font-size="${q.fs}" font-weight="500" fill="${tinta}" text-anchor="middle">` +
      q.lines.map((l, i) => `<text x="50" y="${N(qy + i * ql)}">${esc(l)}</text>`).join('') + `</g>` +
      `<text x="50" y="75.6" text-anchor="middle" font-size="2.8" font-weight="600" letter-spacing=".45" fill="${G.osc}">${esc(up(b.ref))} · RVR1960</text>` +
      // dato curioso
      `<rect x="11" y="88.2" width="80" height="30" rx="5" fill="${deep}" opacity=".15"/>` +
      `<rect x="10" y="87" width="80" height="30" rx="5" fill="#FFFFFF" opacity=".9"/>` +
      `<rect x="14" y="83.6" width="34" height="6.4" rx="3.2" fill="${G.osc}"/>` +
      `<text x="31" y="87.9" text-anchor="middle" font-size="3.1" font-weight="600" letter-spacing=".35" fill="#fff">¿SABÍAS QUE…?</text>` +
      `<g transform="translate(83 88)"><circle cx=".6" cy=".9" r="4.4" fill="#5A3A08" opacity=".22"/><circle r="4.4" fill="url(#bulb)"/>` +
      `<rect x="-2" y="3.6" width="4" height="2.6" rx=".8" fill="#9AA0A6"/><path d="M-2 4.5H2M-2 5.4H2" stroke="#6F767C" stroke-width=".3"/><circle cx="-1.4" cy="-1.5" r="1.1" fill="#fff" opacity=".8"/></g>` +
      `<g font-size="${d.fs}" font-weight="500" fill="${tinta}">` +
      d.lines.map((l, i) => `<text x="15" y="${N(dy + i * dl)}">${esc(l)}</text>`).join('') + `</g>` +
      `<text x="50" y="122.6" text-anchor="middle" font-size="2.5" font-weight="600" letter-spacing=".4" fill="${G.osc}" opacity=".8">BIBLIOTECA BÍBLICA 3D · ${esc(up(G.nombre))}</text>` +
      A.spark(86, 15, 2.6, G.base).replace('<path', '<path opacity=".35"') + A.spark(80, 24, 1.6, G.base).replace('<path', '<path opacity=".28"') +
      `</g>`;
    return o;
  }

  // ---------- C · LOMO ----------
  function lomo(b) {
    const G = GRUPOS[b.g], id = b.g, name = up(b.nombre);
    const fs = Math.min(13, (75 - .6 * (name.length - 1)) / tw(name, 1, 0));
    const boton = (cy, r) => `<circle cx="15.6" cy="${cy + .8}" r="${r}" fill="#000" opacity=".25"/>`;
    return `<g clip-path="url(#clip-strip)">` +
      `<rect x="-1.5" y="-1.5" width="33" height="133" fill="url(#spine-${id})"/>` +
      `<rect x="-1.5" y="-1.5" width="33" height="133" fill="url(#linen)"/>` +
      `<rect x="-1.5" y="23.6" width="33" height="1.1" fill="#000" opacity=".22"/><rect x="-1.5" y="21" width="33" height="2.6" fill="url(#gold-v)"/>` +
      `<rect x="-1.5" y="107.6" width="33" height="1.1" fill="#000" opacity=".22"/><rect x="-1.5" y="105" width="33" height="2.6" fill="url(#gold-v)"/>` +
      medallon(b, 15, 11, 7.6, true) +
      `<g transform="translate(${N(15 + .35 * fs)} 65) rotate(-90)">` + nombre3D(b, 0, 0, fs, 'middle', .6, -.3, .3) + `</g>` +
      boton(117, 6) + `<circle cx="15" cy="117" r="6" fill="url(#cream-out)"/><circle cx="15" cy="117" r="4.9" fill="url(#cream-in)"/><circle cx="15" cy="117" r="4.3" fill="#FFF8E6"/>` +
      `<text x="15" y="${b.n > 9 ? 119 : 119.5}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${b.n > 9 ? 5.6 : 7}" fill="${G.osc}">${b.n}</text>` +
      `</g>`;
  }

  // ---------- D · CANTO DE HOJAS ----------
  function canto(b) {
    const id = b.g, deep = dk(GRUPOS[id].osc, .22);
    return `<g clip-path="url(#clip-strip)">` +
      `<rect x="-1.5" y="-1.5" width="33" height="133" fill="url(#pages-x)"/><rect x="2.5" y="-1.5" width="25" height="133" fill="url(#lines-v)"/>` +
      `<rect x="-1.5" y="-1.5" width="4" height="133" fill="url(#bx-${id})"/><rect x="27.5" y="-1.5" width="4" height="133" fill="url(#bx-${id})"/>` +
      `<rect x="2.5" y="-1.5" width="25" height="4" fill="${deep}" opacity=".12"/><rect x="2.5" y="127.5" width="25" height="4" fill="${deep}" opacity=".12"/>` +
      `<path d="M17 -1.5H20.5V9L18.75 7.4L17 9Z" fill="#E8BE55"/><path d="M17 -1.5H18V8.1L17 9Z" fill="#A87A1E" opacity=".5"/></g>`;
  }

  // ---------- E · TAPA DE ARRIBA (x=0 lado del lomo, y=30 lado de la portada) ----------
  function tapa(b) {
    const id = b.g, deep = dk(GRUPOS[id].osc, .22);
    return `<g clip-path="url(#clip-top)">` +
      `<rect x="-1.5" y="-1.5" width="103" height="33" fill="url(#pages-y)"/><rect x="3" y="2.5" width="98.5" height="25" fill="url(#lines-h)"/>` +
      `<rect x="-1.5" y="-1.5" width="103" height="4" fill="url(#by-${id})"/><rect x="-1.5" y="27.5" width="103" height="4" fill="url(#by-${id})"/>` +
      `<rect x="-1.5" y="-1.5" width="5" height="33" fill="url(#by-${id})"/><rect x="3.5" y="2.5" width="5" height="25" fill="${deep}" opacity=".12"/>` +
      `<path d="M40 15C46 14 48 18 52 17L52 19C48 20 46 16 40 17Z" fill="#E8BE55"/></g>`;
  }

  const hacer = { portada, contra, lomo, canto, tapa };
  const cache = new Map();
  function pieza(kind, b) {
    const k = kind + b.n;
    if (!cache.has(k)) cache.set(k, hacer[kind](b));
    return cache.get(k);
  }
  function svg(kind, b, cls) {
    const [w, h] = DIM[kind];
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="${cls || ''}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(b.nombre)}">${pieza(kind, b)}</svg>`;
  }
  /** Dibuja todo una vez y coloca los degradados compartidos en el documento. */
  function montarDefs() {
    LIBROS.forEach(b => Object.keys(DIM).forEach(k => pieza(k, b)));
    let el = document.getElementById('bb3d-defs');
    if (!el) {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      el.setAttribute('id', 'bb3d-defs'); el.setAttribute('width', '0'); el.setAttribute('height', '0');
      el.setAttribute('aria-hidden', 'true'); el.style.position = 'absolute';
      document.body.insertBefore(el, document.body.firstChild);
    }
    el.innerHTML = `<defs>${defsBase()}${A.defs()}</defs>`;
  }

  root.Biblioteca = {
    GRUPOS, ORDEN, LIBROS, DIM, FONT, libro: o => LIBROS.push(o), porNumero: n => LIBROS.find(b => b.n === +n),
    pieza, svg, medallon, montarDefs, tw, esc
  };
})(window);
