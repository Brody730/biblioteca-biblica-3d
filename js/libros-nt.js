/* libros-nt.js — Nuevo Testamento (27 libros). Mismo formato que libros-at.js. */
(function () {
  'use strict';
  const L = Biblioteca.libro;
  const { N, g, mx, hl, ball, egg, rr, p, f, s, ci, sh, glow, shade, spark, star5, rays, flame, cloud, sun, moon, heart, eye,
    ground, waves, ring, note, fish, brote, gota, beam, txt, dk, li } = Object.assign({}, Arte);
  const DIA = ['#7EC3F2', '#DDF1FC'], NOCHE = ['#141E4A', '#3A5596'];

  const regalo = (x, y, w, h, c, cinta) =>
    rr(x, y, w, h, 1, c) + rr(N(x - 1), N(y - 2.6), N(w + 2), 3.2, 1, dk(c, .1)) + rr(N(x + w / 2 - 1), N(y - 2.6), 2, N(h + 2.6), .6, cinta) +
    egg(N(x + w / 2 - 2.2), N(y - 3.6), 2.4, 1.4, cinta, -25) + egg(N(x + w / 2 + 2.2), N(y - 3.6), 2.4, 1.4, cinta, 25);
  const hoja = (x, y, rot, k, c) => g(`translate(${x} ${y}) rotate(${rot}) scale(${k})`, p('M0 0 C3 -3 9 -3 12 0 C9 3 3 3 0 0Z', c || '#5DB55A') + s('M0 0 H11', '#E7FAC8', .4, .8));

  // ======================= EVANGELIOS =======================
  L({ n: 40, nombre: 'Mateo', g: 'eva', cap: 28, sub: 'Jesús es el Rey',
    cita: 'Y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo.', ref: 'Mateo 28:20',
    dato: 'Mateo era cobrador de impuestos. Jesús lo llamó y él dejó todo para seguirlo (Mt 9:9).',
    iso: 'La estrella que guio a los magos y sus tres regalos: oro, incienso y mirra (Mt 2:11).',
    cielo: ['#1D2A63', '#5A6FB8'],
    esc: () => ({
      b: spark(-20, -8, 1.2) + spark(19, -3, 1) + spark(-12, -21, .9) + beam(-1.5, 1.5, -12, 12, -15, 14) + star5(0, -17, 6, '#FFE27A') + ground(15, '#C9A679'),
      f: sh(0, 19.5, 22, 2.4) + regalo(-6, 3, 12, 14, '#E8BE55', '#C0392B') +
        p('M-19 17 C-21 12 -19 8 -16 7 V4 H-11 V7 C-8 8 -6 12 -8 17Z', '#8A6BC2', { s: '#573D86', w: .35 }) + rr(-17, 2, 7, 2.4, 1, '#B79BE0') + s('M-13.5 0 q-1.5 -3 0 -6 q1.5 -3 0 -6', '#fff', .7, .6) +
        p('M9 17 C8 11 11 8 13 7 V3 H16 V7 C18 8 21 11 20 17Z', '#2BA6A0', { s: '#176864', w: .35 }) + ball(14.5, 1.6, 2, '#E8BE55') + hl(11, 11, .9, 3, 10, .4)
    }) });

  L({ n: 41, nombre: 'Marcos', g: 'eva', cap: 16, sub: 'Jesús calma el mar',
    cita: 'Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de Dios.', ref: 'Marcos 10:14',
    dato: 'Es el Evangelio más corto: tiene 16 capítulos. Jesús le dijo al viento “Calla, enmudece”… ¡y el mar se calmó! (Mr 4:39).',
    iso: 'La barca de los discípulos en el mar que Jesús calmó.',
    cielo: ['#7E8FB0', '#BFD9F0', '#FDE9B8'],
    esc: () => ({
      b: rays(14, -17, 6, 22, 10, '#FFF3C4', 1.2, .55) + cloud(-16, -15, .7) + waves(9, '#3D9BE0'),
      f: s('M2 7 V-22', '#6B4423', 1.4) + p('M3 -21 C12 -16 15 -6 14 3 H3Z', '#FBF3DC', { s: '#C9B58A', w: .35 }) + p('M1 -18 C-7 -13 -9 -5 -9 2 H1Z', '#F2E6C6', { s: '#C9B58A', w: .35 }) +
        p('M-20 5 H22 C19 13 13 16 0 16 C-13 16 -18 12 -20 5Z', '#B9814A', { s: '#7A4E28', w: .4 }) + s('M-18 9 H20', '#8A5A2B', .6, .7) + rr(-21, 3.6, 44, 2.6, 1.2, '#8A5A2B'),
      t: waves(14, '#5BB5EC')
    }) });

  L({ n: 42, nombre: 'Lucas', g: 'eva', cap: 24, sub: 'El Salvador nació',
    cita: 'Que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor.', ref: 'Lucas 2:11',
    dato: 'Lucas era médico (Col 4:14) y también escribió el libro de Hechos.',
    iso: 'El pesebre con paja, iluminado por la luz de la noche en que nació Jesús.',
    cielo: NOCHE,
    esc: () => ({
      b: spark(-20, -12, 1.3) + spark(20, -16, 1.1) + spark(-6, -22, .9) + star5(13, -19, 4, '#FFE27A') + p('M-30 -2 L0 -24 L30 -2 V30 H-30Z', '#6B4A33') + f('M-26 -1 L0 -20 L26 -1 V30 H-26Z', '#3E2A1E') + ground(17, '#8A6A4A'),
      f: glow(0, 2, 20, '#FFE9A8', .8) + sh(0, 19.5, 20, 2.4) + s('M-14 18 L-6 4 M-6 18 L-14 4 M14 18 L6 4 M6 18 L14 4', '#7A4E28', 2.2) +
        p('M-17 2 H17 L13 12 H-13Z', '#B9814A', { s: '#7A4E28', w: .4 }) +
        p('M-16 3 C-12 -3 -6 -1 -3 -4 C0 -1 4 -4 7 -2 C10 -3 14 -2 16 3Z', '#F2D06B') + s('M-12 1 L-14 -2 M-6 0 L-5 -4 M2 0 L4 -4 M9 1 L12 -2 M-1 1 L-2 -3', '#D9A93A', .6) +
        egg(0, -2.6, 7, 3.6, '#FBF6EC') + egg(-6.4, -3.6, 2.8, 2.6, '#F7E6CF') + s('M-3 -4 Q0 -1 4 -3.6', '#E3CFA8', .5) + ring(-6.4, -3.6, 4.4, .6, '#FFF3B0')
    }) });

  L({ n: 43, nombre: 'Juan', g: 'eva', cap: 21, sub: 'La luz del mundo',
    cita: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.', ref: 'Juan 3:16',
    dato: '“Jesús lloró” (Jn 11:35) es uno de los versículos más cortos de toda la Biblia.',
    iso: 'Una lámpara de aceite encendida: Jesús dijo “Yo soy la luz del mundo” (Jn 8:12).',
    cielo: ['#1B2450', '#4A3F7A'],
    esc: () => ({
      b: rays(2, -10, 10, 28, 14, '#FFE9A8', 1.4, .35) + glow(2, -8, 24, '#FFC93C', .55),
      f: sh(0, 17.5, 20, 2.6) + flame(5, -3, 1.02) +
        p('M-18 2 C-18 13 -6 15 4 13 C11 11.5 13 7 10 3 L14 -1 C13 -2.5 10 -2.5 8 -1 C2 -2 -10 -3 -18 2Z', '#C8743C', { s: '#8A4520', w: .4 }) +
        egg(-7, 2, 8, 2.2, '#5A2E12') + p('M-18 4 C-22 3 -24 6 -22 9 C-20 11 -17 10 -16.4 8', '#C8743C', { s: '#8A4520', w: .4 }) + hl(-10, 7.6, 4, 1.4, 0, .35) +
        s('M-10 10 Q-4 12 2 10', '#8A4520', .5, .6)
    }) });

  // ======================= HECHOS =======================
  L({ n: 44, nombre: 'Hechos', g: 'hch', cap: 28, sub: 'La iglesia crece',
    cita: 'Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos… hasta lo último de la tierra.', ref: 'Hechos 1:8',
    dato: 'Pablo sobrevivió a un naufragio, y luego en la isla de Malta lo mordió una víbora… ¡y no le pasó nada! (Hch 28:3-5).',
    iso: 'Las lenguas de fuego de Pentecostés sobre el mundo: el mensaje llega a todas las naciones.',
    cielo: ['#87CDEB', '#E4F6F5'],
    esc: () => ({
      b: s('M-26 -6 C-16 -14 -6 -6 -14 -2 C-20 1 -22 -6 -16 -7', '#fff', 1.2, .8) + s('M26 -12 C16 -20 6 -12 14 -8 C20 -5 22 -12 16 -13', '#fff', 1.2, .8) + s('M-28 6 Q-18 2 -8 6', '#fff', 1, .6),
      f: sh(1, 11, 17, 16, .3) + ball(0, 10, 14.5, '#4AA8E8') +
        p('M-9 4 C-6 -1 1 -1 2 3 C3 7 -2 8 -1 12 C0 16 -5 18 -8 15 C-10 12 -13 8 -9 4Z', '#5DB55A') + p('M5 8 C9 6 13 8 12 12 C11 16 7 19 4 17 C2 15 3 11 5 8Z', '#5DB55A') + shade(0, 10, 14.5) +
        flame(-10, -7, .5) + flame(0, -9, .62) + flame(10, -7, .5)
    }) });

  // ======================= CARTAS DE PABLO =======================
  L({ n: 45, nombre: 'Romanos', g: 'pab', cap: 16, sub: 'Salvos por gracia',
    cita: 'Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.', ref: 'Romanos 5:8',
    dato: 'Pablo dictó esta carta y un ayudante llamado Tercio la escribió; ¡hasta manda saludos! (Ro 16:22).',
    iso: 'Los arcos de piedra de Roma: la carta fue enviada a los creyentes de esa ciudad (Ro 1:7).',
    cielo: ['#F7B58A', '#FDE6C8'],
    esc: () => {
      let arcos = rr(-24, -10, 48, 28, 1, '#E6CFA6') + rr(-25, -13, 50, 4, 1, '#F1DEBA') + rr(-25, 3, 50, 2.6, .8, '#D9BE8E');
      [-17, -6, 5, 16].forEach(x => { arcos += f(`M${x - 4} 3 V-4 A4 4 0 0 1 ${x + 4} -4 V3Z`, '#8A5A3A') + f(`M${x - 4} 18 V11 A4 4 0 0 1 ${x + 4} 11 V18Z`, '#8A5A3A'); });
      return { b: sun(0, -20, 4.6) + ground(17, '#C9A679'), f: sh(0, 20, 26, 2.4) + arcos + s('M-24 -6 H24', '#C9A679', .5, .6) };
    } });

  L({ n: 46, nombre: '1 Corintios', g: 'pab', cap: 16, sub: 'El amor',
    cita: 'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.', ref: '1 Corintios 13:4',
    dato: 'Al capítulo 13 se le llama “el capítulo del amor”.',
    iso: 'Un gran corazón con una cinta que dice AMOR: el camino más excelente (1 Co 12:31).',
    cielo: ['#F7C1D6', '#FDEAF1'],
    esc: () => ({
      b: rays(0, 0, 12, 28, 16, '#fff', 1.4, .5) + spark(-20, -14, 1.3, '#fff') + spark(20, 12, 1.1, '#fff'),
      f: sh(0, 18.5, 17, 2.4) + heart(0, -2, 1.4, '#E0457B') +
        p('M-21 3 L-25 8 L-21 11 L-16 9.4Z', '#B0303C') + p('M21 3 L25 8 L21 11 L16 9.4Z', '#B0303C') +
        p('M-19 1 Q0 6 19 1 L18 7.6 Q0 12.6 -18 7.6Z', '#F2C230', { s: '#A87A1E', w: .35 }) +
        txt(0, 8, 4.4, 'AMOR', '#8A2F55', { anchor: 'middle' })
    }) });

  L({ n: 47, nombre: '2 Corintios', g: 'pab', cap: 13, sub: 'Nueva criatura',
    cita: 'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.', ref: '2 Corintios 5:17',
    dato: 'Una vez, para escapar, a Pablo lo bajaron por una ventana del muro dentro de un canasto (2 Co 11:33).',
    iso: 'Una mariposa que acaba de salir de su capullo: en Cristo somos nuevos.',
    cielo: ['#9AD5F0', '#EAF7FD'],
    esc: () => {
      const alas = egg(-10, -7, 10, 8, '#F08A4B', -30) + egg(-8, 8, 7, 6, '#F2B01E', 25) + ci(-12, -8, 2.6, '#FFF3C4', .9) + ci(-8, 8.6, 1.8, '#fff', .8);
      return {
        b: cloud(-18, -17, .5) + s('M-22 18 C-21 10 -18 8 -16 4', '#6B4423', 1.6) + egg(-15, 9, 2.6, 5, '#B5A18A', 15) + s('M-16 6 L-13 4', '#8A7660', .5),
        f: alas + mx(alas) + egg(0, 0, 2.2, 11, '#4A2E1A') + ball(0, -11.6, 2.6, '#4A2E1A') + s('M-1 -13.6 Q-4 -19 -6 -19 M1 -13.6 Q4 -19 6 -19', '#4A2E1A', .7) + ci(-6, -19, .9, '#4A2E1A') + ci(6, -19, .9, '#4A2E1A')
      };
    } });

  L({ n: 48, nombre: 'Gálatas', g: 'pab', cap: 6, sub: 'Fruto del Espíritu',
    cita: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.', ref: 'Gálatas 5:22-23',
    dato: 'El fruto del Espíritu tiene 9 partes, como las 9 cuentas del aro del medallón.',
    iso: 'Un racimo de 9 uvas: el fruto del Espíritu crece en quien sigue a Jesús.',
    cuentas: { n: 9, full: true }, cielo: ['#BFE6B5', '#F5FBEF'],
    esc: () => {
      let u = '';
      [[0, -6], [-6, -5], [6, -5], [-3, 0], [3, 0], [-7, 1], [7, 1], [0, 5.5], [0, 11]].forEach(([x, y], i) => { u += ball(N(x * 1.15), N(y * 1.3 + 2), 4.6, i % 2 ? '#7A4BB0' : '#8E5CC6'); });
      return {
        b: ground(17, '#8CC66A') + hoja(-26, -6, -20, 1, '#6DBE5A') + hoja(14, 12, -15, 1, '#6DBE5A'),
        f: sh(0, 19.5, 12, 2) + s('M0 -10 Q1 -16 5 -20', '#6B4423', 1.6) + s('M3 -17 Q9 -22 9 -16 Q9 -12 13 -13', '#5A8F2A', .7) + hoja(1, -12, -150, 1.1, '#5DB55A') + u
      };
    } });

  L({ n: 49, nombre: 'Efesios', g: 'pab', cap: 6, sub: 'Armadura de Dios',
    cita: 'Vestíos de toda la armadura de Dios, para que podáis estar firmes contra las asechanzas del diablo.', ref: 'Efesios 6:11',
    dato: 'La armadura de Dios tiene 6 piezas: cinto, coraza, calzado, escudo, yelmo y espada (Ef 6:14-17).',
    iso: 'El escudo de la fe con la espada del Espíritu, que es la Palabra de Dios.',
    cielo: ['#8FB6E8', '#E9F2FC'],
    esc: () => ({
      b: rays(0, 0, 12, 28, 12, '#fff', 1.6, .5),
      f: sh(0, 20.5, 16, 2.4) + g('translate(1 1) rotate(42)', rr(-1.7, -29, 3.4, 33, 1, '#D5DCE3') + f('M-1.7 -29 L0 -32.5 L1.7 -29Z', '#D5DCE3') + s('M0 -28 V2', '#fff', .5, .7) + rr(-7, 4, 14, 2.8, 1.2, '#C99A2E') + rr(-1.6, 6.6, 3.2, 9, 1, '#7A4E28') + ball(0, 16.6, 2, '#E8BE55')) +
        p('M-14 -14 Q0 -18 14 -14 Q15 6 0 17 Q-15 6 -14 -14Z', '#C0392B', { s: '#7A1F18', w: .5 }) +
        p('M-11 -11.6 Q0 -14.6 11 -11.6 Q12 4.4 0 13.4 Q-12 4.4 -11 -11.6Z', '#E05A4A') + s('M-14 -14 Q0 -18 14 -14 Q15 6 0 17 Q-15 6 -14 -14Z', '#E8BE55', 1.2) +
        star5(0, -1, 6, '#F6D878') + hl(-7, -8, 2, 4, 15, .35)
    }) });

  L({ n: 50, nombre: 'Filipenses', g: 'pab', cap: 4, sub: 'Gozo siempre',
    cita: 'Todo lo puedo en Cristo que me fortalece.', ref: 'Filipenses 4:13',
    dato: 'Pablo escribió esta carta desde la cárcel… ¡y aun así habla muchísimo de gozo y alegría! (Fil 1:13; 4:4).',
    iso: 'La ventana de una cárcel de la que salen notas musicales: en Filipos, Pablo y Silas cantaban presos (Hch 16:25).',
    cielo: ['#9C8E86', '#C9BDB4'],
    esc: () => {
      let muro = '';
      for (let r = 0; r < 7; r++) { const y = N(-30 + r * 9), d = r % 2 ? 0 : -6; for (let x = -36 + d; x < 30; x += 12) muro += rr(x, y, 11.4, 8.4, 1, r % 2 ? '#A3958C' : '#B0A298'); }
      return {
        b: muro,
        f: sh(0, 16, 15, 2) + rr(-12, -12, 24, 26, 2, '#6F625C') + rr(-9.5, -9.5, 19, 21, 1.4, '#22325E') + spark(-5, -5, 1.1) + moon(4, -4, 3) +
          [-5.2, 0, 5.2].map(x => rr(x - 1, -9.5, 2, 21, 1, '#8A9096')).join('') + rr(-9.5, 0, 19, 1.8, .8, '#8A9096') +
          note(15, -12, .8, '#FFE27A') + note(-17, -7, .7, '#FFE27A') + note(19, 4, .6, '#FFF3C4')
      };
    } });

  L({ n: 51, nombre: 'Colosenses', g: 'pab', cap: 4, sub: 'Arraigados',
    cita: 'Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.', ref: 'Colosenses 3:23',
    dato: 'Pablo pidió que esta carta también se leyera en la iglesia de Laodicea (Col 4:16).',
    iso: 'Un árbol con raíces profundas: “arraigados y sobreedificados en él” (Col 2:7).',
    cielo: DIA,
    esc: () => ({
      b: sun(17, -18, 4.2) + f('M-30 6 Q0 2 30 6 V30 H-30Z', '#8A5A3A') + f('M-30 6 Q0 2 30 6 V9 Q0 5 -30 9Z', '#6DBE5A') +
        s('M0 7 C-2 13 -9 14 -13 21 M0 7 C1 14 6 16 12 22 M0 7 C0 15 -2 19 -1 26 M-6 13 L-12 13 M5 15 L10 13', '#C98A4B', 1.4),
      f: p('M-3 7 C-2 -2 -3 -6 -4 -10 H4 C3 -6 2 -2 3 7Z', '#8A5A2B') + s('M0 -8 L-6 -14 M1 -9 L7 -14', '#8A5A2B', 1.6) +
        ball(-9, -15, 7.6, '#4CA64A') + ball(9, -15, 7.6, '#4CA64A') + ball(0, -21, 8.6, '#5DB55A') + ball(0, -11, 6.4, '#5DB55A') +
        ball(-6, -18, 1.4, '#E5384F') + ball(7, -12.6, 1.4, '#E5384F') + ball(3, -24, 1.4, '#E5384F')
    }) });

  L({ n: 52, nombre: '1 Tesalonicenses', g: 'pab', cap: 5, sub: 'Cristo volverá',
    cita: 'Estad siempre gozosos. Orad sin cesar. Dad gracias en todo.', ref: '1 Tesalonicenses 5:16-18',
    dato: 'Probablemente es una de las primeras cartas que Pablo escribió.',
    iso: 'La trompeta de Dios entre las nubes: Jesús prometió volver (1 Ts 4:16).',
    cielo: ['#F9C98A', '#FDEFD2', '#BFE3F7'],
    esc: () => ({
      b: rays(0, -5, 10, 30, 16, '#fff', 1.6, .6) + cloud(-15, 15, .9) + cloud(16, 17, .8),
      f: g('rotate(-22)', p('M-18 -1.6 H6 L18 -8 V8 L6 1.6 H-18Z', '#F2C230', { s: '#A87A1E', w: .4 }) + egg(18, 0, 2.2, 8, '#E0A91E') + rr(-21, -2.4, 4.4, 4.8, 1.2, '#C99A2E') +
        rr(-11, -1.6, 2.4, 6, .8, '#E0A91E') + rr(-4, -1.6, 2.4, 6, .8, '#E0A91E') + hl(-4, -1, 8, .6, 0, .6)) +
        s('M20 -14 q4 2 4 6 M23 -18 q6 4 6 10', '#fff', 1.1, .9)
    }) });

  L({ n: 53, nombre: '2 Tesalonicenses', g: 'pab', cap: 3, sub: 'No te canses',
    cita: 'Y vosotros, hermanos, no os canséis de hacer bien.', ref: '2 Tesalonicenses 3:13',
    dato: 'Pablo firmaba con su propia mano al final de sus cartas, como señal de que eran suyas (2 Ts 3:17).',
    iso: 'Una pluma, un tintero y la firma de Pablo al final de su carta.',
    cielo: ['#F3E2C4', '#E3C79A'],
    esc: () => ({
      b: glow(0, 0, 24, '#fff', .45),
      f: sh(0, 18.5, 22, 2.4) + rr(-19, -14, 28, 32, 1, '#FBF3DC') + s('M-15 -8 H5 M-15 -4 H5 M-15 0 H5 M-15 4 H1', '#8A6A4A', .8, .7) +
        s('M-15 10 c2 -4 4 -4 3 0 c-1 3 3 2 4 -1 c1 -2 2 1 3 0 c2 -2 3 1 5 0', '#3F5FA8', .8) +
        rr(8, 6, 11, 11, 2.4, '#3A3F4A') + egg(13.5, 6, 5.5, 1.4, '#1A1D24') + hl(10, 11, 1, 3, 0, .4) +
        g('translate(14 6) rotate(28)', s('M0 0 V-24', '#8A6A4A', .6) + p('M0 -4 C-4 -10 -4 -20 0 -27 C4 -20 4 -10 0 -4Z', '#FDFBF6', { s: '#C9B58A', w: .35 }))
    }) });

  L({ n: 54, nombre: '1 Timoteo', g: 'pab', cap: 6, sub: 'Sé ejemplo',
    cita: 'Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.', ref: '1 Timoteo 4:12',
    dato: 'Pablo llamaba a Timoteo “verdadero hijo en la fe” (1 Ti 1:2).',
    iso: 'Una medalla de oro: aunque seas joven, puedes ser ejemplo para los demás.',
    cielo: ['#D35D8A', '#F7DAE6'],
    esc: () => ({
      b: rays(0, 4, 12, 30, 14, '#fff', 1.6, .5) + spark(-19, -15, 1.3, '#fff') + spark(20, -10, 1, '#fff'),
      f: p('M-11 -24 L-3 -24 L3 -6 L-5 -6Z', '#3E8ED0') + p('M11 -24 L3 -24 L-3 -6 L5 -6Z', '#E0457B') +
        sh(1, 22, 13, 2) + ball(0, 6, 13, '#F2C230') + ring(0, 6, 10.4, 1.6, '#E0A91E') + star5(0, 6, 6.6, '#FFE27A')
    }) });

  L({ n: 55, nombre: '2 Timoteo', g: 'pab', cap: 4, sub: 'Termina la carrera',
    cita: 'Y que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación.', ref: '2 Timoteo 3:15',
    dato: 'La abuela Loida y la mamá Eunice le enseñaron a Timoteo a amar a Dios desde niño (2 Ti 1:5).',
    iso: 'La corona de laurel del que termina la carrera: “he acabado la carrera, he guardado la fe” (2 Ti 4:7).',
    cielo: ['#FBE3A8', '#FDF5DA'],
    esc: () => {
      let o = '';
      for (let k = 0; k < 8; k++) {
        const t = 104 + k * 20, a = t * Math.PI / 180, x = N(Math.cos(a) * 15), y = N(2 + Math.sin(a) * 15);
        const hj = hoja(x, y, N(t + 60 + (k % 2 ? 26 : -26)), .82, k % 2 ? '#4CA64A' : '#5DB55A');
        o += hj + mx(hj);
      }
      return {
        b: rays(0, 0, 10, 30, 16, '#fff', 1.6, .6),
        f: sh(0, 21, 14, 2) + s('M-3.6 16.6 A15 15 0 0 1 -6.3 -11.6', '#6B8F3A', 1.4) + mx(s('M-3.6 16.6 A15 15 0 0 1 -6.3 -11.6', '#6B8F3A', 1.4)) + o +
          p('M-3 16 L-8 25 L-4 24 L-2 27 L1 18Z', '#E05A4A') + p('M3 16 L8 25 L4 24 L2 27 L-1 18Z', '#C0392B') + ball(0, 16, 3, '#E05A4A')
      };
    } });

  L({ n: 56, nombre: 'Tito', g: 'pab', cap: 3, sub: 'Haz lo bueno',
    cita: 'Nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia.', ref: 'Tito 3:5',
    dato: 'Pablo dejó a Tito en la isla de Creta para ayudar a organizar las iglesias (Tit 1:5).',
    iso: 'La isla de Creta con su palmera, en medio del mar.',
    cielo: ['#7FCDF2', '#E6F7FD'],
    esc: () => {
      const palma = (a, k) => g(`translate(4 -12) rotate(${a}) scale(${k})`, p('M0 0 C4 -5 12 -5 16 1 C11 -1 6 0 0 0Z', '#4CA64A', { s: '#2F7D3A', w: .3 }));
      return {
        b: sun(-17, -16, 4.4) + waves(8, '#3D9BE0') + p('M14 10 H24 L22 13 H16Z', '#8A5A2B') + s('M19 10 V3', '#6B4423', .6) + p('M19.4 3.4 L23 8 H19.4Z', '#fff'),
        f: egg(0, 13, 20, 5, '#F0D9A0') + s('M-2 12 C-1 4 2 -6 4 -12', '#8A5A2B', 2.4) + s('M-1.4 8 h2 M-.4 3 h2 M1 -2 h2 M2.6 -7 h2', '#6B4423', .5, .7) +
          palma(-10, 1) + palma(30, .9) + palma(170, 1) + palma(140, .9) + palma(-60, .8) + ball(2.4, -11, 1.6, '#8A5A2B') + ball(5.4, -10.4, 1.6, '#8A5A2B'),
        t: waves(16, '#5BB5EC')
      };
    } });

  L({ n: 57, nombre: 'Filemón', g: 'pab', cap: 1, sub: 'Perdón y hermandad',
    cita: 'No ya como esclavo, sino como más que esclavo, como hermano amado.', ref: 'Filemón 1:16',
    dato: 'Es una carta de un solo capítulo: Pablo pide a Filemón que perdone a Onésimo y lo reciba como a un hermano.',
    iso: 'Dos corazones unidos por una cinta: el perdón nos hace hermanos.',
    cielo: ['#F7DAE6', '#FDF2F6'],
    esc: () => ({
      b: rays(0, 0, 10, 30, 14, '#fff', 1.4, .6),
      f: sh(0, 17, 22, 2.4) + heart(-8, 0, .95, '#E0457B') + heart(8, 0, .95, '#F08AAE') +
        s('M-22 6 C-12 16 12 -4 22 6', '#F2C230', 2.4) + s('M-22 6 C-12 16 12 -4 22 6', '#FFF0B8', .6, .8) + ball(-22, 6, 1.6, '#E0A91E') + ball(22, 6, 1.6, '#E0A91E')
    }) });

  // ======================= CARTAS GENERALES =======================
  L({ n: 58, nombre: 'Hebreos', g: 'gen', cap: 13, sub: 'Firmes en la fe',
    cita: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.', ref: 'Hebreos 11:1',
    dato: 'El capítulo 11 es como un “salón de la fama de la fe”: Noé, Abraham, Moisés, Rahab y muchos más.',
    iso: 'Un ancla firme: la esperanza es “segura y firme ancla del alma” (He 6:19).',
    cielo: ['#5BA3D9', '#BFE3F7', '#2E6FA8'],
    esc: () => ({
      b: waves(-4, '#2E7CC4') + spark(-16, 10, 1, '#fff') + spark(18, 18, .8, '#fff') + s('M0 -24 V-10', '#C9A679', 1, .8),
      f: ring(0, -15, 3.6, 1.8, '#8A9096') + rr(-1.8, -12, 3.6, 28, 1.4, '#8A9096') + rr(-9, -7, 18, 3.4, 1.6, '#8A9096') +
        s('M-15 9 Q-14 19 0 19 Q14 19 15 9', '#6F767C', 4) + s('M-15 9 Q-14 19 0 19 Q14 19 15 9', '#A9B0B6', 2.4) +
        p('M-19 7 L-14 4 L-12 11Z', '#8A9096') + p('M19 7 L14 4 L12 11Z', '#8A9096') + hl(-.6, 0, .6, 8, 0, .5) +
        s('M3 -15 C12 -12 4 -4 12 0 C18 3 12 10 18 13', '#C9A679', 1.2)
    }) });

  L({ n: 59, nombre: 'Santiago', g: 'gen', cap: 5, sub: 'Haz lo que oyes',
    cita: 'Pero sed hacedores de la palabra, y no tan solamente oidores, engañándoos a vosotros mismos.', ref: 'Santiago 1:22',
    dato: 'Santiago compara la lengua con el timón: algo pequeñito que dirige un barco muy grande (Stg 3:4).',
    iso: 'El timón de un barco: lo pequeño (nuestras palabras) dirige lo grande.',
    cielo: ['#8CCBF3', '#E6F5FD'],
    esc: () => {
      let o = '';
      for (let k = 0; k < 8; k++) {
        const a = k * 45 * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
        o += s(`M${N(c * 4)} ${N(sn * 4)} L${N(c * 21)} ${N(sn * 21)}`, '#8A5A2B', 2.4) + egg(N(c * 22.5), N(sn * 22.5), 1.8, 3.4, '#B9814A', N(k * 45 + 90));
      }
      return {
        b: cloud(-17, -17, .5) + waves(14, '#3D9BE0'),
        f: o + ring(0, 0, 14, 3.4, '#B9814A') + ball(0, 0, 5, '#C98A4B') + ball(0, 0, 2, '#E8BE55')
      };
    } });

  L({ n: 60, nombre: '1 Pedro', g: 'gen', cap: 5, sub: 'Piedras vivas',
    cita: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.', ref: '1 Pedro 5:7',
    dato: 'Jesús le puso a Simón el nombre de Pedro, que quiere decir “piedra” (Jn 1:42).',
    iso: 'Piedras que forman una casa con la piedra principal dorada: “sed edificados como piedras vivas” (1 P 2:5).',
    cielo: DIA,
    esc: () => ({
      b: cloud(17, -18, .5) + ground(17, '#9CCB6A'),
      f: sh(0, 20.5, 20, 2.4) +
        egg(-12, 15, 6.4, 4.6, '#A79A90') + egg(0, 15.5, 6.4, 4.6, '#B5AEA6') + egg(12, 15, 6.4, 4.6, '#A79A90') +
        egg(-6, 7, 6.4, 4.4, '#B5AEA6') + egg(6, 7, 6.4, 4.4, '#9C8E86') + egg(-12, 7, 3, 4.2, '#A79A90') + egg(12, 7, 3, 4.2, '#B5AEA6') +
        egg(-6.6, -1, 5.6, 4.2, '#9C8E86') + egg(6.6, -1, 5.6, 4.2, '#A79A90') + egg(0, -9, 6, 4.6, '#E8BE55') + spark(0, -9, 1.4, '#fff')
    }) });

  L({ n: 61, nombre: '2 Pedro', g: 'gen', cap: 3, sub: 'Crece en Jesús',
    cita: 'Antes bien, creced en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo.', ref: '2 Pedro 3:18',
    dato: 'Para el Señor, “un día es como mil años, y mil años como un día” (2 P 3:8).',
    iso: 'Una planta que crece junto a una regla: así crecemos en la gracia de Dios.',
    cielo: ['#BFE6F7', '#F2FAFD'],
    esc: () => ({
      b: sun(-17, -17, 4.4) + rr(13, -22, 7, 42, 1, '#F2D06B') + s('M13 -18 h3 M13 -13 h4.5 M13 -8 h3 M13 -3 h4.5 M13 2 h3 M13 7 h4.5 M13 12 h3', '#8F6A12', .5),
      f: sh(-3, 20.5, 12, 2) + s('M-3 9 C-4 0 -1 -8 -3 -20', '#3E9A45', 1.6) + hoja(-3, 2, -150, 1, '#5DB55A') + hoja(-3, -4, -30, 1, '#4CA64A') + hoja(-3, -11, -150, .9, '#5DB55A') + hoja(-3, -17, -40, .8, '#6DBE5A') +
        p('M-13 9 H7 L4 20 H-10Z', '#C8743C', { s: '#8A4520', w: .4 }) + rr(-14, 7, 22, 3.6, 1.4, '#D9823F') + egg(-3, 8.6, 9, 1.4, '#6B3F22')
    }) });

  L({ n: 62, nombre: '1 Juan', g: 'gen', cap: 5, sub: 'Dios es amor',
    cita: 'Nosotros le amamos a él, porque él nos amó primero.', ref: '1 Juan 4:19',
    dato: 'Juan llama a los creyentes “hijitos” muchas veces en esta carta, como un abuelo cariñoso.',
    iso: 'Un corazón que brilla como el sol: Dios es luz y Dios es amor (1 Jn 1:5; 4:8).',
    cielo: ['#FBD38A', '#FDF0CF'],
    esc: () => ({
      b: rays(0, 2, 13, 30, 16, '#FFC93C', 2, .7) + glow(0, 2, 22, '#FFF3C4', .9),
      f: sh(0, 19, 14, 2.2) + heart(0, 1, 1.3, '#E5384F') + heart(0, 0, .5, '#FF8AA0')
    }) });

  L({ n: 63, nombre: '2 Juan', g: 'gen', cap: 1, sub: 'Anda en amor',
    cita: 'Y este es el amor, que andemos según sus mandamientos.', ref: '2 Juan 1:6',
    dato: 'Tiene solo 13 versículos. Está dirigida “a la señora elegida y a sus hijos” (2 Jn 1:1).',
    iso: 'Una carta cerrada con un sello en forma de corazón.',
    cielo: ['#C3CBF0', '#EEF1FC'],
    esc: () => ({
      b: rays(0, 0, 12, 30, 12, '#fff', 1.6, .6) + spark(-20, -15, 1.2, '#fff') + spark(19, 15, 1, '#fff'),
      f: sh(0, 17.5, 21, 2.4) + rr(-20, -11, 40, 27, 2, '#FBF6EC') + f('M-20 -9 L0 5 L20 -9 V-11 H-20Z', '#E9DFCB') +
        s('M-19 15 L-5 3 M19 15 L5 3', '#D9CCB0', .7) + p('M-20 -10 L0 4 L20 -10', '#F4EBD9', { s: '#D9CCB0', w: .5 }) + heart(0, 4, .45, '#C0392B')
    }) });

  L({ n: 64, nombre: '3 Juan', g: 'gen', cap: 1, sub: 'Anda en la verdad',
    cita: 'No tengo yo mayor gozo que este, el oír que mis hijos andan en la verdad.', ref: '3 Juan 1:4',
    dato: 'Es una carta personal para un amigo muy querido llamado Gayo (3 Jn 1:1).',
    iso: 'Un camino con huellas que lleva a casa: andar en la verdad.',
    cielo: DIA,
    esc: () => {
      const huella = (x, y, rot) => g(`translate(${x} ${y}) rotate(${rot})`, egg(0, 0, 1.4, 2.4, '#8A5A3A') + egg(0, 3, 1.1, 1.2, '#8A5A3A'));
      return {
        b: cloud(-17, -17, .5) + ground(-2, '#8CC66A') + f('M-6 30 C-4 14 -3 6 -1 -3 H3 C5 6 8 14 12 30Z', '#E9D2A8'),
        f: huella(1, 22, -10) + huella(6, 16, 8) + huella(1, 9, -6) + huella(4, 3, 6) +
          rr(-8, -16, 16, 13, 1, '#FBF3DC') + p('M-10.6 -15 L0 -24 L10.6 -15Z', '#C0392B') + rr(-2.4, -10, 4.8, 7, 1, '#8A5A2B') + rr(3, -13.6, 3.4, 3.4, .6, '#FFD45E')
      };
    } });

  L({ n: 65, nombre: 'Judas', g: 'gen', cap: 1, sub: 'Dios te guarda',
    cita: 'Y a aquel que es poderoso para guardaros sin caída, y presentaros sin mancha delante de su gloria con gran alegría.', ref: 'Judas 1:24',
    dato: 'Este Judas no es el que traicionó a Jesús: era hermano de Santiago (Jud 1:1).',
    iso: 'Un faro que alumbra en la noche y guía a los barcos a puerto seguro.',
    cielo: NOCHE,
    esc: () => ({
      b: spark(-21, -6, 1.1) + spark(15, -21, 1) + spark(-12, -20, .8) + f('M2 -14 L30 -24 L30 -4Z', '#FFE9A8', .55) + f('M-2 -14 L-30 -22 L-30 -8Z', '#FFE9A8', .35) + waves(14, '#2E5D9A'),
      f: egg(0, 16, 14, 4, '#7A7268') + p('M-7 16 L-4.4 -11 H4.4 L7 16Z', '#F4F1EA', { s: '#B5AEA6', w: .35 }) +
        f('M-6.4 9 L-6 5 H6 L6.4 9Z', '#C0392B') + f('M-5.4 -2 L-5 -6 H5 L5.4 -2Z', '#C0392B') +
        rr(-6.4, -13, 12.8, 2.4, .8, '#3A3F4A') + rr(-4, -19, 8, 6, 1, '#FFE27A') + glow(0, -16, 9, '#FFF3C4', .9) + p('M-5.4 -19 L0 -25 L5.4 -19Z', '#C0392B'),
      t: waves(18, '#3D7CC4')
    }) });

  // ======================= PROFECÍA =======================
  L({ n: 66, nombre: 'Apocalipsis', g: 'pro', cap: 22, sub: 'Todo será nuevo',
    cita: 'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor.', ref: 'Apocalipsis 21:4',
    dato: 'La nueva Jerusalén tendrá 12 puertas, ¡y cada puerta será una sola perla! (Ap 21:21).',
    iso: 'La ciudad de oro con su puerta de perla. Las 12 cuentas del aro son las 12 puertas.',
    cuentas: { n: 12, full: true }, cielo: ['#2E3A6B', '#7A6FC2', '#F6C9A0'],
    esc: () => ({
      b: rays(0, -2, 10, 30, 18, '#FFE9A8', 1.6, .55) + spark(-20, -14, 1.3) + spark(20, -18, 1.1) + spark(-8, -23, .9) + cloud(-17, 18, .85) + cloud(17, 19, .8),
      f: sh(0, 17, 23, 2.4) +
        rr(-21, -6, 9, 22, 1, '#F2C230') + rr(12, -6, 9, 22, 1, '#F2C230') + p('M-22 -6 L-16.5 -14 L-11 -6Z', '#E0A91E') + p('M11 -6 L16.5 -14 L22 -6Z', '#E0A91E') +
        rr(-13, 0, 26, 16, 1, '#F6D04A') + [-19, -15.4, 13.4, 17].map(x => rr(x, -2, 2, 3.4, 1, '#FFF3B0')).join('') +
        ring(0, 4, 7, 3, '#F4F1EA') + f('M-5 16 V5 A5 5 0 0 1 5 5 V16Z', '#FFF8DD') + spark(0, 9, 1.6, '#fff') + hl(-17, 0, 1, 4, 0, .45) + hl(15, 0, 1, 4, 0, .45)
    }) });
})();
