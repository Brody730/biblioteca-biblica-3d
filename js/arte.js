/* arte.js — utilidades de dibujo con volumen "3D" en SVG.
   Todo es vectorial (sin filtros) para que el PDF salga ligero y nítido. */
(function (root) {
  'use strict';
  const defs = new Map();
  const N = v => +(+v).toFixed(2);

  // ---------- color ----------
  const h2r = h => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
  const r2h = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();
  const mix = (a, b, t) => { const A = h2r(a), B = h2r(b); return r2h(A.map((v, i) => v + (B[i] - v) * t)); };
  const li = (c, t) => mix(c, '#FFFFFF', t);
  const dk = (c, t) => mix(c, '#000000', t);
  const key = c => c.replace('#', '');

  // ---------- degradados (se registran una sola vez) ----------
  function reg(id, str) { if (!defs.has(id)) defs.set(id, str); return `url(#${id})`; }
  function rad(c) {
    const id = 'r' + key(c);
    return reg(id, `<radialGradient id="${id}" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="${li(c, .55)}"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${dk(c, .35)}"/></radialGradient>`);
  }
  function lin(c) {
    const id = 'l' + key(c);
    return reg(id, `<linearGradient id="${id}" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="${li(c, .4)}"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${dk(c, .3)}"/></linearGradient>`);
  }
  function grad(stops, horizontal) {
    const id = (horizontal ? 'h' : 'v') + stops.map(key).join('_');
    const st = stops.map((c, i) => `<stop offset="${N(i / (stops.length - 1))}" stop-color="${c}"/>`).join('');
    return reg(id, `<linearGradient id="${id}" x1="0" y1="0" x2="${horizontal ? 1 : 0}" y2="${horizontal ? 0 : 1}">${st}</linearGradient>`);
  }
  function fade(c) { // color sólido al centro → transparente
    const id = 'f' + key(c);
    return reg(id, `<radialGradient id="${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".6"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`);
  }

  // ---------- formas ----------
  const g = (tr, inner) => `<g transform="${tr}">${inner}</g>`;
  const mx = inner => g('scale(-1 1)', inner);
  const hl = (x, y, rx, ry, rot, op) => `<ellipse cx="${N(x)}" cy="${N(y)}" rx="${N(rx)}" ry="${N(ry)}" transform="rotate(${rot || 0} ${N(x)} ${N(y)})" fill="#fff" opacity="${op || .45}"/>`;
  function ball(x, y, r, c) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${rad(c)}"/>` + hl(x - r * .36, y - r * .42, r * .3, r * .17, -35);
  }
  function egg(x, y, rx, ry, c, rot) {
    return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${rad(c)}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}/>`;
  }
  function rr(x, y, w, h, r, c, rot) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${lin(c)}"${rot ? ` transform="rotate(${rot} ${N(x + w / 2)} ${N(y + h / 2)})"` : ''}/>`;
  }
  function p(d, c, o) {
    o = o || {};
    return `<path d="${d}" fill="${lin(c)}"${o.s ? ` stroke="${o.s}" stroke-width="${o.w || .4}" stroke-linejoin="round"` : ''}${o.op ? ` opacity="${o.op}"` : ''}/>`;
  }
  const f = (d, fill, op) => `<path d="${d}" fill="${fill}"${op ? ` opacity="${op}"` : ''}/>`;
  const s = (d, c, w, op) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w || 1}" stroke-linecap="round" stroke-linejoin="round"${op ? ` opacity="${op}"` : ''}/>`;
  const ci = (x, y, r, fill, op) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${op ? ` opacity="${op}"` : ''}/>`;
  const sh = (x, y, rx, ry, op) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fade('#1E0D08')}" opacity="${op || .45}"/>`;
  const glow = (x, y, r, c, op) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fade(c)}" opacity="${op || .6}"/>`;
  function shade(x, y, r) {
    const id = reg('esfsombra', `<radialGradient id="esfsombra" cx=".36" cy=".3" r=".78"><stop offset=".5" stop-color="#0A2A55" stop-opacity="0"/><stop offset="1" stop-color="#0A2A55" stop-opacity=".55"/></radialGradient>`);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${id}"/>` + hl(x - r * .36, y - r * .45, r * .32, r * .18, -35, .5);
  }
  const spark = (x, y, k, c) => `<path transform="translate(${x} ${y}) scale(${k})" d="M0 -1 Q .18 -.18 1 0 Q .18 .18 0 1 Q -.18 .18 -1 0 Q -.18 -.18 0 -1Z" fill="${c || '#FFF7D6'}"/>`;
  function star5(x, y, r, c) {
    let pts = '';
    for (let i = 0; i < 10; i++) { const a = (-90 + i * 36) * Math.PI / 180, q = i % 2 ? r * .46 : r; pts += N(x + Math.cos(a) * q) + ',' + N(y + Math.sin(a) * q) + ' '; }
    return `<polygon points="${pts.trim()}" fill="${rad(c || '#FFE27A')}" stroke="${dk(c || '#FFE27A', .3)}" stroke-width=".3" stroke-linejoin="round"/>`;
  }
  function rays(x, y, r1, r2, n, c, w, op) {
    let d = '';
    for (let i = 0; i < n; i++) { const a = (i * 360 / n - 90) * Math.PI / 180; d += `M${N(x + Math.cos(a) * r1)} ${N(y + Math.sin(a) * r1)} L${N(x + Math.cos(a) * r2)} ${N(y + Math.sin(a) * r2)} `; }
    return s(d.trim(), c, w, op);
  }
  function flame(x, y, k) {
    const o = grad(['#FFD23A', '#FF8A2A', '#E8421C']);
    return g(`translate(${x} ${y}) scale(${k})`,
      `<path d="M0 0 C-9 -1 -11 -10 -5 -17 C-5 -12 -1 -12 -2 -25 C6 -19 11 -9 7 -3 C5 -.5 2 0 0 0Z" fill="${o}"/>` +
      `<path d="M0 -1 C-5 -2 -5 -8 -1 -13 C3 -9 5 -5 3 -2 C2 -1 1 -1 0 -1Z" fill="#FFF0A0"/>`);
  }
  function cloud(x, y, k) {
    const c = reg('nube', `<radialGradient id="nube" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D3E2F2"/></radialGradient>`);
    return g(`translate(${x} ${y}) scale(${k})`,
      `<circle cx="-6.5" cy="0" r="5" fill="${c}"/><circle cx="0" cy="-3" r="6.6" fill="${c}"/><circle cx="7" cy=".2" r="4.6" fill="${c}"/><rect x="-10.5" y="-1" width="21.5" height="6" rx="3" fill="${c}"/>`);
  }
  function sun(x, y, r) {
    return glow(x, y, r * 2, '#FFF1B8', .8) + rays(x, y, r * 1.3, r * 1.85, 8, '#FFD45E', r * .32) + ball(x, y, r, '#FFC93C');
  }
  function moon(x, y, r) {
    return `<path d="M${N(x + r * .5)} ${N(y - r * .9)} A${r} ${r} 0 1 0 ${N(x + r * .9)} ${N(y + r * .5)} A${N(r * .8)} ${N(r * .8)} 0 0 1 ${N(x + r * .5)} ${N(y - r * .9)}Z" fill="${rad('#F3E9B0')}"/>`;
  }
  const heart = (x, y, k, c) => g(`translate(${x} ${y}) scale(${k})`,
    `<path d="M0 12 C-17 1 -14 -12 -6 -12 C-2.4 -12 0 -9.2 0 -6.8 C0 -9.2 2.4 -12 6 -12 C14 -12 17 1 0 12Z" fill="${rad(c || '#E5384F')}"/>` + hl(-6, -6.5, 3, 1.7, -35, .5));
  const eye = (x, y, r) => ci(x, y, r, '#2A1B18') + ci(N(x - r * .3), N(y - r * .35), N(r * .35), '#fff');
  function ground(y, c) {
    return `<path d="M-32 ${y} Q0 ${y - 5} 32 ${y} V32 H-32Z" fill="${grad([li(c, .25), c, dk(c, .22)])}"/>`;
  }
  function waves(y, c) {
    const d = `M-30 ${y} q3.75 -3 7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0`;
    return `<path d="${d} V32 H-30Z" fill="${grad([li(c, .3), c, dk(c, .25)])}"/>` + s(d, '#fff', .7, .6);
  }
  function ring(x, y, r, w, c) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${dk(c, .28)}" stroke-width="${w}"/>` +
      `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="${N(w * .7)}"/>` +
      `<circle cx="${N(x - w * .1)}" cy="${N(y - w * .1)}" r="${r}" fill="none" stroke="${li(c, .55)}" stroke-width="${N(w * .2)}" opacity=".85"/>`;
  }
  const note = (x, y, k, c) => g(`translate(${x} ${y}) scale(${k})`,
    egg(0, 0, 3.4, 2.5, c, -20) + rr(2.1, -13, 1.5, 13, .7, c) + p('M3.6 -13 C7.4 -11 8.4 -7.6 7.2 -4.4 C6.6 -7 5 -8.6 3.6 -9.2Z', c));
  const fish = (x, y, rot, k, c) => g(`translate(${x} ${y}) rotate(${rot}) scale(${k})`,
    p('M5 0 L12 -4.5 L10 0 L12 4.5Z', c) + egg(0, 0, 7.4, 3.8, c) + ci(-3.8, -.8, .8, '#2A1B18') + s('M-1 -1.4 Q1 0 -1 1.6', dk(c, .3), .5));
  const brote = (x, y, k) => g(`translate(${x} ${y}) scale(${k})`,
    s('M0 0 V-6', '#3E9A45', 1.2) + p('M0 -5 C-4 -5 -6 -8 -6 -10 C-3 -10 0 -8 0 -5Z', '#6DBE5A') + p('M0 -6 C4 -6 6 -9 6 -11 C3 -11 0 -9 0 -6Z', '#6DBE5A'));
  const gota = (x, y, k, c) => g(`translate(${x} ${y}) scale(${k})`,
    `<path d="M0 -17 C8 -5 11.5 1 11.5 6.5 A11.5 11.5 0 0 1 -11.5 6.5 C-11.5 1 -8 -5 0 -17Z" fill="${rad(c || '#6EC1F0')}" stroke="${dk(c || '#6EC1F0', .25)}" stroke-width=".4"/>` + hl(-4.5, 3, 2.2, 4.4, 20, .55));
  function beam(x1, x2, X1, X2, y1, y2) {
    const id = reg('haz', `<linearGradient id="haz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF7D6" stop-opacity=".9"/><stop offset="1" stop-color="#FFF7D6" stop-opacity="0"/></linearGradient>`);
    return `<polygon points="${x1},${y1} ${x2},${y1} ${X2},${y2} ${X1},${y2}" fill="${id}"/>`;
  }
  /** Ala con plumas que sale desde (0,0) hacia la izquierda (usar mx() para la derecha). */
  const ala = (c, k) => g(`scale(${k || 1})`,
    p('M0 0 C-6 -8 -16 -12 -28 -10 L-24 -7 L-28 -4 L-22 -2.6 L-25 1 L-18 1 L-19 4.4 L-12 3.4 L-11 6.6 L-4 4 Z', c, { s: dk(c, .35), w: .35 }) +
    s('M-3 0 C-10 -4 -17 -6 -24 -6.4 M-4 2 C-10 0 -15 -.6 -20 -.8 M-5 3.6 L-12 2.4', dk(c, .3), .4, .6));
  const txt = (x, y, size, str, fill, o) => `<text x="${x}" y="${y}" font-family="Fredoka,'Baloo 2','Arial Rounded MT Bold',sans-serif" font-weight="${(o && o.w) || 700}" font-size="${size}" fill="${fill}"${o && o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || .35}" paint-order="stroke"` : ''}${o && o.anchor ? ` text-anchor="${o.anchor}"` : ''}>${str}</text>`;

  root.Arte = {
    N, mix, li, dk, key, reg, rad, lin, grad, fade, defs: () => [...defs.values()].join(''),
    g, mx, hl, ball, egg, rr, p, f, s, ci, sh, glow, shade, spark, star5, rays, flame, cloud, sun, moon, heart, eye,
    ground, waves, ring, note, fish, brote, gota, beam, txt, ala
  };
})(window);
