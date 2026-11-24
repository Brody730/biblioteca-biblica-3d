/* vistas.js — vista 3D vectorial de cada libro y hojas tamaño carta para imprimir. */
(function (root) {
  'use strict';
  const B = root.Biblioteca, A = root.Arte, { N, dk } = A;
  const FONT = B.FONT, esc = B.esc;
  const up = t => t.toUpperCase();

  // ===================== VISTA 3D (SVG, imprimible) =====================
  const EX = [.9, .17], EY = [0, 1], EB = [-.6, -.24];
  const mat = (a, b, c, d, e, f) => `matrix(${[a, b, c, d, e, f].map(N).join(' ')})`;
  const TRIM = { portada: 'cover', contra: 'cover', lomo: 'strip', canto: 'strip', tapa: 'top' };
  const cara = (kind, b) => `<g clip-path="url(#trim-${TRIM[kind]})">${B.pieza(kind, b)}</g>`;
  const VB3D = '-26 -14 126 174';

  function libro3D(b, lado) {
    const atras = lado === 'atras';
    const fM = mat(EX[0], EX[1], EY[0], EY[1], 0, 0);
    const sM = mat(-EB[0], -EB[1], EY[0], EY[1], 30 * EB[0], 30 * EB[1]);
    const tM = atras ? mat(-EX[0], -EX[1], EB[0], EB[1], 100 * EX[0], 100 * EX[1]) : mat(EX[0], EX[1], -EB[0], -EB[1], 30 * EB[0], 30 * EB[1]);
    const bx = 30 * EB[0], by = 30 * EB[1];
    const side = `${N(bx)},${N(by)} 0,0 0,130 ${N(bx)},${N(by + 130)}`;
    const top = `${N(bx)},${N(by)} ${N(bx + 90)},${N(by + 17)} 90,17 0,0`;
    const front = `0,0 90,17 90,147 0,130`;
    return `<g>` +
      `<ellipse cx="36" cy="140" rx="66" ry="10" transform="rotate(10.7 36 140)" fill="${A.fade('#1E0D08')}" opacity=".5"/>` +
      `<g transform="${sM}">${cara(atras ? 'canto' : 'lomo', b)}</g><polygon points="${side}" fill="#000" opacity=".16"/>` +
      `<g transform="${tM}">${cara('tapa', b)}</g><polygon points="${top}" fill="#fff" opacity=".1"/>` +
      `<g transform="${fM}">${cara(atras ? 'contra' : 'portada', b)}</g><polygon points="${front}" fill="url(#gloss)"/>` +
      `<g fill="none" stroke="#000" stroke-opacity=".28" stroke-width=".35" stroke-linejoin="round"><polygon points="${side}"/><polygon points="${top}"/><polygon points="${front}"/></g>` +
      `</g>`;
  }
  const svg3D = (b, lado, cls) => `<svg viewBox="${VB3D}" class="${cls || ''}" role="img" aria-label="${esc(b.nombre)} en 3D">${libro3D(b, lado)}</svg>`;

  // ===================== HOJAS CARTA =====================
  const HW = 215.9, HH = 279.4;
  const hojaSVG = inner => `<svg class="hoja" viewBox="0 0 ${HW} ${HH}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}"><rect width="${HW}" height="${HH}" fill="#fff"/>${inner}</svg>`;
  const corte = (x, y, w, h) => `<rect x="${N(x)}" y="${N(y)}" width="${w}" height="${h}" fill="none" stroke="#3C3C3C" stroke-width=".3" stroke-dasharray="1.6 1.1"/>`;
  const colocar = (kind, b, x, y) => kind === 'tapa'
    ? `<g transform="translate(${N(x + 30)} ${N(y)}) rotate(90)">${B.pieza('tapa', b)}</g>`
    : `<g transform="translate(${N(x)} ${N(y)})">${B.pieza(kind, b)}</g>`;
  function pestana(cx, y, dir, label, fs) {
    fs = fs || 2;
    const w = Math.min(46, B.tw(label, fs, .15) + 5), x1 = N(cx - w / 2), x2 = N(cx + w / 2), d = dir === 'abajo' ? 3.6 : -3.6;
    return `<path d="M${x1} ${y} L${N(x1 + 1.6)} ${N(y + d)} H${N(x2 - 1.6)} L${x2} ${y} Z" fill="#9AA0A6"/>` +
      `<text x="${N(cx)}" y="${N(dir === 'abajo' ? y + 2.65 : y - 1.05)}" font-size="${fs}" font-weight="600" fill="#fff" text-anchor="middle" letter-spacing=".15">${esc(label)}</text>`;
  }
  const encabezado = txt => `<text x="${HW / 2}" y="4.4" text-anchor="middle" font-size="2.2" fill="#9a9a9a" letter-spacing=".25">${esc(txt)}</text>`;
  const tijera = (x, y) => `<text x="${x}" y="${y}" font-family="'Segoe UI Symbol','Noto Sans Symbols 2','DejaVu Sans',sans-serif" font-size="4" fill="#3C3C3C">✂</text>`;
  const ROWS = [6.7, 142.7];

  /** Hoja tipo 1: portada (A) + contraportada (B) de 1 o 2 libros. */
  function hojaPortadas(libros, pie) {
    let o = '', t = '';
    libros.forEach((b, r) => {
      const y = ROWS[r], nm = up(b.nombre);
      o += colocar('portada', b, 5.95, y) + colocar('contra', b, 109.95, y) + corte(5.95, y, 100, 130) + corte(109.95, y, 100, 130);
      t += r === 0 ? pestana(31, 136.7, 'abajo', `A · ${nm}`) + pestana(135, 136.7, 'abajo', `B · ${nm}`)
        : pestana(81, 142.7, 'arriba', `A · ${nm}`) + pestana(185, 142.7, 'arriba', `B · ${nm}`);
    });
    return hojaSVG(o + t + tijera(1.2, 74) + encabezado(pie));
  }

  /** Hoja tipo 2: lomo (C), canto (D) y tapa (E) de hasta 4 libros. */
  function hojaTiras(libros, pie) {
    let o = '', t = '';
    libros.forEach((b, j) => {
      const r = j < 2 ? 0 : 1, y = ROWS[r], x0 = 7.95 + (j % 2) * 3 * 34;
      ['lomo', 'canto', 'tapa'].forEach((k, i) => {
        const x = x0 + i * 34, h = k === 'tapa' ? 100 : 130, L = 'CDE'[i];
        o += colocar(k, b, x, y) + corte(x, y, 30, h);
        t += r === 0 ? pestana(x + 9, y + h, 'abajo', `${L} · ${b.n}`, 1.9) : pestana(x + 21, y, 'arriba', `${L} · ${b.n}`, 1.9);
      });
      const cx = x0 + 2 * 34 + 15, ty = y + 110;
      const lines = B.tw(up(b.nombre), 2.8) > 28 ? up(b.nombre).split(' ') : [up(b.nombre)];
      t += `<g text-anchor="middle" fill="#555"><text x="${cx}" y="${ty}" font-size="2.4" font-weight="600" fill="#999">LIBRO ${b.n}</text>` +
        lines.map((l, i) => `<text x="${cx}" y="${N(ty + 4.4 + i * 3.6)}" font-size="2.8" font-weight="700" fill="${B.GRUPOS[b.g].osc}">${esc(l)}</text>`).join('') +
        `<text x="${cx}" y="${N(ty + 9 + (lines.length - 1) * 3.6)}" font-size="2" fill="#888">C lomo · D canto · E tapa</text></g>`;
    });
    return hojaSVG(o + t + encabezado(pie));
  }

  /** Hoja de solo lomos (C): hasta 12 libros. */
  function hojaLomos(libros, pie) {
    let o = '', t = '';
    libros.forEach((b, j) => {
      const r = j < 6 ? 0 : 1, y = ROWS[r], x = 7.95 + (j % 6) * 34;
      o += colocar('lomo', b, x, y) + corte(x, y, 30, 130);
      t += r === 0 ? pestana(x + 9, y + 130, 'abajo', `C · ${b.n}`, 1.9) : pestana(x + 21, y, 'arriba', `C · ${b.n}`, 1.9);
    });
    return hojaSVG(o + t + encabezado(pie));
  }

  function bloque(x, y, G, k) { // dibujo pequeño del bloque con letras
    k = k || 1;
    const P = (a, b) => `${N(x + a * k)},${N(y + b * k)}`;
    const letra = (cx, cy, r, L, fs) => `<circle cx="${N(x + cx * k)}" cy="${N(y + cy * k)}" r="${N(r * k)}" fill="#9AA0A6"/><text x="${N(x + cx * k)}" y="${N(y + cy * k + fs * k * .36)}" font-size="${N(fs * k)}" font-weight="700" fill="#fff" text-anchor="middle">${L}</text>`;
    return `<g stroke="${G.osc}" stroke-width=".35" stroke-linejoin="round">` +
      `<polygon points="${P(8, 6)} ${P(0, 0)} ${P(0, 41.6)} ${P(8, 47.6)}" fill="${G.base}"/>` +
      `<polygon points="${P(8, 6)} ${P(40, 6)} ${P(32, 0)} ${P(0, 0)}" fill="#FFF3DF"/>` +
      `<rect x="${N(x + 8 * k)}" y="${N(y + 6 * k)}" width="${N(32 * k)}" height="${N(41.6 * k)}" fill="${G.claro}"/></g>` +
      `<path d="M${P(32, 0)} V${N(y + 41.6 * k)} H${N(x)} M${P(32, 41.6)} L${P(40, 47.6)}" fill="none" stroke="${G.osc}" stroke-width=".3" stroke-dasharray="1 .8" opacity=".5"/>` +
      letra(24, 26.8, 5, 'A', 6.5) + letra(4, 23.8, 3, 'C', 4) + letra(20, 3, 2.4, 'E', 3.3);
  }
  const leyenda = (x, y) => {
    const it = [['A', 'Portada → frente'], ['B', 'Contraportada → atrás'], ['C', 'Lomo → izquierda'], ['D', 'Canto → derecha'], ['E', 'Tapa → arriba']];
    return it.map(([L, t], i) => `<rect x="${x}" y="${N(y + i * 7.5)}" width="5" height="5" rx="1.2" fill="#9AA0A6"/><text x="${x + 2.5}" y="${N(y + 3.5 + i * 7.5)}" font-size="2.7" font-weight="700" fill="#fff" text-anchor="middle">${L}</text><text x="${x + 7}" y="${N(y + 3.5 + i * 7.5)}" font-size="2.7" fill="#3d3d3d">${t}</text>`).join('') +
      `<text x="${x + 7}" y="${N(y + 38.8)}" font-size="2.3" fill="#8a8a8a">(la tapa: lado de color hacia el lomo)</text>`;
  };
  const PASOS = [
    ['Recorta cada pieza por la línea punteada ✂.', 'La pestaña gris solo dice qué pieza es: se recorta.'],
    ['Lija el bloque de madera y quítale el polvo.'],
    ['Unta cola blanca en capa delgada y pega cada', 'pieza en su lado (guíate por las letras).'],
    ['Alisa con una tarjeta del centro a las orillas.'],
    ['Ya seco, puedes darle una capa de barniz.']
  ];
  function pasos(x, y, color) {
    let o = '', yy = y;
    PASOS.forEach((ls, i) => {
      ls.forEach((l, j) => { o += `<text x="${j ? x + 4 : x}" y="${N(yy)}" font-size="2.9" fill="#3d3d3d">${j ? '' : `<tspan font-weight="700" fill="${color}">${i + 1}.</tspan> `}${esc(l)}</text>`; yy += 4.4; });
      yy += 1.2;
    });
    return o;
  }
  function regla(x, y) {
    let o = `<line x1="${x}" y1="${y}" x2="${x + 50}" y2="${y}" stroke="#555" stroke-width=".3"/>`;
    for (let i = 0; i <= 10; i++) o += `<line x1="${x + i * 5}" y1="${y}" x2="${x + i * 5}" y2="${N(y - (i % 2 ? 1.6 : 3))}" stroke="#555" stroke-width=".25"/>`;
    return o + `<text x="${x + 54}" y="${y}" font-size="2.6" fill="#777">5 cm · verifica la escala</text>`;
  }

  /** Kit de un libro: todas sus piezas + instrucciones en una sola hoja. */
  function hojaKit(b, pie) {
    const G = B.GRUPOS[b.g];
    let o = colocar('portada', b, 5.95, 6.7) + colocar('contra', b, 109.95, 6.7) +
      colocar('lomo', b, 5.95, 142.7) + colocar('canto', b, 39.95, 142.7) + colocar('tapa', b, 73.95, 142.7) +
      corte(5.95, 6.7, 100, 130) + corte(109.95, 6.7, 100, 130) + corte(5.95, 142.7, 30, 130) + corte(39.95, 142.7, 30, 130) + corte(73.95, 142.7, 30, 100);
    o += pestana(38, 136.7, 'abajo', 'A · PORTADA') + pestana(160, 136.7, 'abajo', 'B · CONTRAPORTADA') +
      pestana(20.95, 142.7, 'arriba', 'C · LOMO', 1.9) + pestana(54.95, 142.7, 'arriba', 'D · CANTO', 1.9) + pestana(88.95, 142.7, 'arriba', 'E · TAPA', 1.9) +
      tijera(1.2, 74) + tijera(73.5, 248.5) +
      `<g font-size="2.4" fill="#8a8a8a" text-anchor="middle"><text x="88.95" y="251">La base del libro</text><text x="88.95" y="254.4">no se imprime:</text><text x="88.95" y="257.8">queda sobre</text><text x="88.95" y="261.2">el estante.</text></g>` +
      `<rect x="110" y="144" width="100" height="128.5" rx="4" fill="#fff" stroke="${A.li(G.base, .55)}" stroke-width=".35"/>` +
      `<text x="114" y="149" font-size="2.3" fill="#9a8e8a" letter-spacing=".3">${esc(up(b.nombre))} · LIBRO ${b.n} DE 66 · TAMAÑO REAL</text>` +
      `<text x="114" y="157" font-size="6" font-weight="700" fill="${G.osc}">Cómo armar tu libro</text>` +
      `<text x="114" y="162.5" font-size="3" fill="#5f5f5f">Bloque de madera de 10 × 13 × 3 cm</text>` +
      bloque(118, 170, G) + leyenda(164, 172.6) + pasos(114, 226, G.osc) + regla(114, 266.5) + encabezado(pie);
    return hojaSVG(o);
  }

  /** Hoja de instrucciones para el juego completo. */
  function hojaInstrucciones(resumen) {
    const G = B.GRUPOS.may;
    let o = `<rect x="10" y="10" width="195.9" height="259.4" rx="6" fill="none" stroke="#E6D6CE" stroke-width=".5"/>` +
      `<text x="20" y="30" font-size="10" font-weight="700" fill="#8E2E25">Biblioteca Bíblica 3D</text>` +
      `<text x="20" y="38" font-size="4" fill="#5f5f5f">66 libros de la Biblia para armar sobre bloques de madera</text>` +
      `<text x="20" y="52" font-size="4.6" font-weight="700" fill="#3d3d3d">Materiales</text>` +
      ['Un bloque de madera de 10 × 13 × 3 cm por libro.', 'Estas hojas impresas al 100 % (tamaño real).', 'Papel bond de 90–120 g o papel adhesivo.', 'Tijeras o cúter con regla, cola blanca y lija.', 'Una tarjeta para alisar. Opcional: barniz.']
        .map((t, i) => `<text x="22" y="${59 + i * 5.4}" font-size="3.2" fill="#3d3d3d">• ${esc(t)}</text>`).join('') +
      `<text x="20" y="90" font-size="4.6" font-weight="700" fill="#3d3d3d">Cada libro tiene 5 piezas</text>` +
      bloque(26, 98, G, 1.15) + leyenda(84, 102) +
      `<text x="20" y="166" font-size="4.6" font-weight="700" fill="#3d3d3d">Paso a paso</text>` + pasos(22, 174, G.osc) +
      `<text x="20" y="214" font-size="4.6" font-weight="700" fill="#3d3d3d">Las hojas</text>` +
      resumen.map((t, i) => `<text x="22" y="${221 + i * 5.4}" font-size="3.2" fill="#3d3d3d">• ${esc(t)}</text>`).join('');
    // leyenda de colores por sección
    B.ORDEN.forEach((id, i) => {
      const g = B.GRUPOS[id], x = 128 + (i % 2) * 38, y = 52 + Math.floor(i / 2) * 9;
      o += `<rect x="${x}" y="${y - 3.6}" width="5" height="5" rx="1.2" fill="${g.base}"/><text x="${x + 7}" y="${y}" font-size="2.6" fill="#3d3d3d">${esc(g.nombre)}</text>`;
    });
    o += `<text x="128" y="45" font-size="3.4" font-weight="700" fill="#3d3d3d">Colores por sección</text>` + regla(20, 258) +
      `<text x="195.9" y="262.5" font-size="2.4" fill="#9a9a9a" text-anchor="end">Citas: Reina-Valera 1960</text>`;
    return hojaSVG(o);
  }

  // ===================== PLANTILLA ARMABLE CON PESTAÑAS (opalina) =====================
  // Hoja carta horizontal. Fila: pestaña | lomo | portada | canto | contraportada,
  // con la tapa de arriba y la de abajo unidas a la portada.
  const AW = 279.4, AH = 215.9, PT = 7;
  const hojaSVGh = inner => `<svg class="hoja apaisada" viewBox="0 0 ${AW} ${AH}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}"><rect width="${AW}" height="${AH}" fill="#fff"/>${inner}</svg>`;
  const CORTE_RED = `M0 0L${PT} ${-PT}H${30 - PT}L30 0V-30H130V0L${130 + PT} ${-PT}H${160 - PT}L160 0L${160 + PT} ${-PT}H${260 - PT}L260 0` +
    `V130L${260 - PT} ${130 + PT}H${160 + PT}L160 130L${160 - PT} ${130 + PT}H${130 + PT}L130 130V160H30V130L${30 - PT} ${130 + PT}H${PT}L0 130L${-PT} ${130 - PT}V${PT}Z`;
  const PESTANAS = [[0, 30], [130, 160], [160, 260]];
  /** La plantilla de un libro; (0,0) es la esquina de arriba a la izquierda del lomo. */
  function red(b, grosor) {
    grosor = grosor || 1;
    const pz = (kind, x, y) => `<g transform="translate(${x} ${y})"><g clip-path="url(#trim-${TRIM[kind]})">${B.pieza(kind, b)}</g></g>`;
    let o = pz('lomo', 0, 0) + pz('portada', 30, 0) + pz('canto', 130, 0) + pz('contra', 160, 0) + pz('tapa', 30, -30) +
      `<g transform="translate(30 160) scale(1 -1)"><g clip-path="url(#trim-top)">${B.pieza('tapa', b)}</g></g>`;
    let tabs = '', txt = '';
    PESTANAS.forEach(([a, z]) => {
      tabs += `M${a} 0L${a + PT} ${-PT}H${z - PT}L${z} 0ZM${a} 130L${a + PT} ${130 + PT}H${z - PT}L${z} 130Z`;
      txt += `<text x="${(a + z) / 2}" y="-2.6">PEGA</text><text x="${(a + z) / 2}" y="134.4">PEGA</text>`;
    });
    tabs += `M0 0L${-PT} ${PT}V${130 - PT}L0 130Z`;
    txt += `<text transform="translate(-2.6 65) rotate(-90)">PEGA AQUÍ · VA POR DENTRO</text>`;
    o += `<path d="${tabs}" fill="#D9DDE1"/><g font-size="2" font-weight="600" fill="#9AA0A6" text-anchor="middle" letter-spacing=".3">${txt}</g>`;
    // dobleces (punteado) y corte (línea continua)
    o += `<path d="M0 0H260M0 130H260M0 0V130M30 0V130M130 0V130M160 0V130" fill="none" stroke="#1E1E1E" stroke-opacity=".6" stroke-width="${N(.3 * grosor)}" stroke-dasharray="${N(1.1 * grosor)} ${N(1 * grosor)}"/>` +
      `<path d="${CORTE_RED}" fill="none" stroke="#1E1E1E" stroke-width="${N(.35 * grosor)}" stroke-linejoin="round"/>`;
    return o;
  }
  const muestra = (x, y, tipo) => tipo === 'corte' ? `<line x1="${x}" y1="${y}" x2="${x + 8}" y2="${y}" stroke="#1E1E1E" stroke-width=".4"/>`
    : tipo === 'doblez' ? `<line x1="${x}" y1="${y}" x2="${x + 8}" y2="${y}" stroke="#1E1E1E" stroke-opacity=".7" stroke-width=".35" stroke-dasharray="1.1 1"/>`
      : `<path d="M${x} ${y + 1.6}L${x + 1.6} ${y - 1.6}H${x + 6.4}L${x + 8} ${y + 1.6}Z" fill="#D9DDE1"/>`;

  /** Una hoja horizontal con la plantilla de un libro, lista para recortar, doblar y pegar. */
  function hojaArmable(b, pie) {
    const G = B.GRUPOS[b.g], ox = (AW - 260 - PT) / 2 + PT, oy = (AH - 190) / 2 + 30;
    const name = up(b.nombre), nfs = Math.min(8, 118 / B.tw(name, 1, .1));
    const tx = ox + 134, ty = oy + 130 + PT + 5;
    let o = `<g transform="translate(${N(ox)} ${N(oy)})">${red(b)}</g>`;
    o += `<text x="${N(tx)}" y="${N(oy - 23)}" font-size="2.5" font-weight="600" fill="#9a8e8a" letter-spacing=".3">LIBRO ${b.n} DE 66 · ${G.t === 'AT' ? 'ANTIGUO' : 'NUEVO'} TESTAMENTO · ${esc(up(G.nombre))}</text>` +
      `<text x="${N(tx)}" y="${N(oy - 13.5)}" font-size="${N(nfs)}" font-weight="700" fill="${G.osc}" letter-spacing=".1">${esc(name)}</text>`;
    const pasos = [
      ['corte', 'Recorta por la línea continua, con todo y pestañas.'],
      ['doblez', 'Marca y dobla hacia adentro las líneas punteadas.'],
      ['pega', 'Pon pegamento en las pestañas grises: van por dentro.'],
      [null, 'Pega primero la pestaña larga del lomo y al final cierra las tapas.']
    ];
    pasos.forEach(([t, s], i) => {
      const y = ty + i * 5;
      o += (t ? muestra(tx, y - 1, t) : '') + `<text x="${N(tx + 10)}" y="${N(y)}" font-size="2.9" fill="#3d3d3d"><tspan font-weight="700" fill="${G.osc}">${i + 1}.</tspan> ${esc(s)}</text>`;
    });
    o += regla(tx, ty + 22) + tijera(ox - 6, oy - 9) +
      `<text x="${N(ox - PT)}" y="${N(oy + 130 + 30)}" font-size="2.3" fill="#9a9a9a">10 × 13 × 3 cm</text>` +
      `<text x="${N(ox - PT)}" y="${N(oy + 130 + 34)}" font-size="2.3" fill="#9a9a9a">Citas: RVR1960</text>` +
      `<text x="${AW / 2}" y="5.4" text-anchor="middle" font-size="2.2" fill="#9a9a9a" letter-spacing=".25">${esc(pie)}</text>`;
    return hojaSVGh(o);
  }

  /** Hoja de instrucciones (horizontal) para los libros armables. */
  function hojaInstrArmable(resumen) {
    const G = B.GRUPOS.may, ej = B.porNumero(1);
    const li = (x, y, t) => `<text x="${x}" y="${N(y)}" font-size="3.2" fill="#3d3d3d">• ${esc(t)}</text>`;
    let o = `<rect x="10" y="10" width="${AW - 20}" height="${N(AH - 20)}" rx="6" fill="none" stroke="#E6D6CE" stroke-width=".5"/>` +
      `<text x="20" y="28" font-size="10" font-weight="700" fill="#8E2E25">Biblioteca Bíblica 3D</text>` +
      `<text x="20" y="36" font-size="4" fill="#5f5f5f">66 libros de la Biblia para recortar, doblar y pegar · cada libro mide 10 × 13 × 3 cm</text>` +
      `<text x="20" y="50" font-size="4.6" font-weight="700" fill="#3d3d3d">Materiales</text>` +
      ['Estas hojas impresas en opalina tamaño carta (180–225 g).', 'Impresas en horizontal, al 100 % (tamaño real).', 'Tijeras, regla y una pluma sin tinta para marcar los dobleces.', 'Lápiz adhesivo, pegamento blanco o cinta doble cara.']
        .map((t, i) => li(22, 57 + i * 5.2, t)).join('') +
      `<text x="20" y="86" font-size="4.6" font-weight="700" fill="#3d3d3d">Paso a paso</text>`;
    const pasos = ['Recorta por la línea continua ✂, con todo y pestañas.', 'Con la regla, repasa cada línea punteada con la pluma sin tinta.',
      'Dobla hacia adentro por todas las líneas punteadas.', 'Pega la pestaña larga del lomo por dentro de la contraportada.',
      'Dobla las pestañas de arriba hacia adentro y cierra la tapa sobre ellas.', 'Haz lo mismo abajo. ¡Tu libro está listo!'];
    pasos.forEach((t, i) => { o += `<text x="22" y="${N(93 + i * 5.4)}" font-size="3.2" fill="#3d3d3d"><tspan font-weight="700" fill="${G.osc}">${i + 1}.</tspan> ${esc(t)}</text>`; });
    o += `<text x="22" y="${N(93 + 6 * 5.4 + 2)}" font-size="2.9" fill="#6f6f6f" font-style="italic">Consejo: para que quede más firme, rellénalo con cartón o unicel antes de cerrar la última tapa.</text>` +
      `<text x="20" y="144" font-size="4.6" font-weight="700" fill="#3d3d3d">Las hojas</text>` + resumen.map((t, i) => li(22, 151 + i * 5.2, t)).join('') +
      `<text x="20" y="175" font-size="4.6" font-weight="700" fill="#3d3d3d">Las líneas</text>` +
      muestra(22, 181, 'corte') + `<text x="33" y="182" font-size="3.2" fill="#3d3d3d">Continua: recortar</text>` +
      muestra(76, 181, 'doblez') + `<text x="87" y="182" font-size="3.2" fill="#3d3d3d">Punteada: doblar</text>` +
      muestra(22, 188, 'pega') + `<text x="33" y="189" font-size="3.2" fill="#3d3d3d">Gris: pestaña para pegar (va por dentro)</text>` +
      regla(22, 199);
    // plantilla de ejemplo y libro terminado
    const k = .4;
    o += `<text x="158" y="50" font-size="3.4" font-weight="700" fill="#3d3d3d">Así es la plantilla de cada libro</text>` +
      `<g transform="translate(${N(158 + PT * k)} ${N(56 + 30 * k)}) scale(${k})">${red(ej, 2)}</g>` +
      `<g font-size="2.6" fill="#5f5f5f"><text x="${N(158 + (PT + 15) * k)}" y="${N(56 + 30 * k + 130 * k + 13)}" text-anchor="middle">lomo</text>` +
      `<text x="${N(158 + (PT + 80) * k)}" y="${N(56 + 30 * k + 130 * k + 18)}" text-anchor="middle">portada</text>` +
      `<text x="${N(158 + (PT + 145) * k)}" y="${N(56 + 30 * k + 130 * k + 13)}" text-anchor="middle">canto</text>` +
      `<text x="${N(158 + (PT + 210) * k)}" y="${N(56 + 30 * k + 130 * k + 13)}" text-anchor="middle">contraportada</text>` +
      `<text x="${N(158 + (PT + 80) * k)}" y="54" text-anchor="middle">tapa de arriba</text></g>` +
      `<text x="158" y="146" font-size="3.4" font-weight="700" fill="#3d3d3d">Colores por sección</text>`;
    B.ORDEN.forEach((id, i) => {
      const g = B.GRUPOS[id], x = 158 + (i % 2) * 38, y = 154 + Math.floor(i / 2) * 8;
      o += `<rect x="${x}" y="${y - 3.6}" width="5" height="5" rx="1.2" fill="${g.base}"/><text x="${x + 7}" y="${y}" font-size="2.6" fill="#3d3d3d">${esc(g.nombre)}</text>`;
    });
    o += `<g transform="translate(236 140) scale(.27)">${libro3D(ej, 'frente')}</g>` +
      `<text x="${AW - 20}" y="${N(AH - 14)}" font-size="2.4" fill="#9a9a9a" text-anchor="end">Citas: Reina-Valera 1960</text>`;
    return hojaSVGh(o);
  }

  // ===================== PLANES DE IMPRESIÓN =====================
  function trozos(arr, n) { const out = []; for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n)); return out; }
  /** modo: 'armable' (plantilla con pestañas, un libro por hoja horizontal), y para madera:
      'ahorro' (portadas + tiras), 'basico' (portadas + lomos), 'kit' (un libro por hoja). */
  function plan(libros, modo, instrucciones) {
    const hojas = [];
    if (modo === 'armable') {
      libros.forEach(b => hojas.push(['armable', [b]]));
      if (instrucciones) hojas.unshift(['instr-armable', [`${libros.length} ${libros.length === 1 ? 'hoja' : 'hojas'}: una por libro, con su plantilla completa.`, 'Cada hoja trae también su propio paso a paso.']]);
      return hojas;
    }
    if (modo === 'kit') libros.forEach(b => hojas.push(['kit', [b]]));
    else if (modo === 'basico') trozos(libros, 12).forEach(grupo => { trozos(grupo, 2).forEach(par => hojas.push(['portadas', par])); hojas.push(['lomos', grupo]); });
    else trozos(libros, 4).forEach(grupo => { trozos(grupo, 2).forEach(par => hojas.push(['portadas', par])); hojas.push(['tiras', grupo]); });
    const nP = hojas.filter(h => h[0] === 'portadas').length, nT = hojas.filter(h => h[0] === 'tiras').length, nL = hojas.filter(h => h[0] === 'lomos').length;
    const resumen = modo === 'kit' ? [`${hojas.length} hojas: una por libro, con todas sus piezas e instrucciones.`]
      : [`${nP} hojas de portadas: portada (A) y contraportada (B) de 2 libros por hoja.`,
        modo === 'basico' ? `${nL} hojas de lomos (C): 12 libros por hoja. El canto y la tapa se pintan o se dejan en madera.`
          : `${nT} hojas de tiras: lomo (C), canto (D) y tapa (E) de 4 libros por hoja.`,
        'Las hojas van en orden: las piezas de cada grupo de libros quedan juntas.'];
    if (instrucciones && modo !== 'kit') hojas.unshift(['instrucciones', resumen]);
    return hojas;
  }
  function render(h, i, total) {
    const nom = l => l.map(b => b.nombre).join(', ');
    const pie = `BIBLIOTECA BÍBLICA 3D · HOJA ${i + 1} DE ${total}`;
    switch (h[0]) {
      case 'instrucciones': return hojaInstrucciones(h[1]);
      case 'instr-armable': return hojaInstrArmable(h[1]);
      case 'armable': return hojaArmable(h[1][0], `${pie} · ${up(h[1][0].nombre)}`);
      case 'portadas': return hojaPortadas(h[1], `${pie} · PORTADAS · ${up(nom(h[1]))}`);
      case 'tiras': return hojaTiras(h[1], `${pie} · LOMO, CANTO Y TAPA · LIBROS ${h[1][0].n}–${h[1][h[1].length - 1].n}`);
      case 'lomos': return hojaLomos(h[1], `${pie} · LOMOS · LIBROS ${h[1][0].n}–${h[1][h[1].length - 1].n}`);
      default: return hojaKit(h[1][0], `${pie} · ${up(h[1][0].nombre)}`);
    }
  }

  root.Vistas = { libro3D, svg3D, VB3D, plan, render, hojaKit, hojaInstrucciones, hojaArmable, hojaInstrArmable };
})(window);
