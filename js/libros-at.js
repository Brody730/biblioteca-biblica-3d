/* libros-at.js — Antiguo Testamento (39 libros).
   Cada libro: datos, cita (RVR1960), dato curioso e isotipo dibujado en esc().
   La escena se dibuja alrededor de (0,0) dentro de un círculo de radio 28.6:
   b = fondo (recortado al círculo) · f = figura principal (puede salirse del marco) · t = primer plano (recortado). */
(function () {
  'use strict';
  const L = Biblioteca.libro;
  const { N, g, mx, hl, ball, egg, rr, p, f, s, ci, sh, glow, shade, spark, star5, rays, flame, cloud, sun, moon, heart, eye,
    ground, waves, ring, note, fish, brote, gota, beam, txt, ala: alaP } = Arte;
  const DIA = ['#7EC3F2', '#DDF1FC'], NOCHE = ['#141E4A', '#3A5596'], SALA = ['#FBE7C2', '#EFC892'];

  // ======================= LA LEY =======================
  L({ n: 1, nombre: 'Génesis', g: 'ley', cap: 50, sub: 'En el principio',
    cita: 'En el principio creó Dios los cielos y la tierra.', ref: 'Génesis 1:1',
    dato: 'Matusalén vivió 969 años: es la persona que más años vivió en toda la Biblia (Gn 5:27).',
    iso: 'La Tierra con un brote, entre la noche y el día: Dios lo creó todo. Las 7 cuentas del aro son los 7 días.',
    cuentas: { n: 7, full: true }, cielo: { h: ['#182553', '#34508F', '#86AEDA', '#F7D79B', '#FFC48A'] },
    esc: () => ({
      b: moon(-20, -7, 4.6) + spark(-16, -20, 1.7) + spark(-25, 5, 1.2) + spark(-19.5, 18, .9) + spark(-11.5, -11, .8) + sun(19, -11, 5.4),
      f: sh(1, 12, 19, 18, .35) + ball(0, 9, 16.5, '#4AA8E8') +
        p('M-11 2 C-7 -4 1 -3 2 2 C4 6 -2 8 -1 13 C0 17 -6 20 -9 16 C-12 12 -15 7 -11 2Z', '#5DB55A') +
        p('M6 7 C10 4 15 7 14 12 C13 16 9 20 5 18 C2 16 4 12 6 7Z', '#5DB55A') +
        p('M4 -3 C7 -5 10 -3 9 0 C7 2 3 0 4 -3Z', '#5DB55A') + shade(0, 9, 16.5) +
        egg(0, -7.4, 4.2, 1.6, '#7A5230') + s('M0 -7 C0 -11 -.3 -14 .4 -17', '#2F7D3A', 1.7) +
        p('M.2 -14.5 C-3.5 -13 -8 -15 -9.5 -20 C-4.5 -21.5 -.8 -18.8 .2 -14.5Z', '#7FCB5A', { s: '#2F7D3A', w: .35 }) +
        p('M.4 -16.5 C1.5 -22 7 -26 13 -25 C12 -19 6.5 -15.5 .4 -16.5Z', '#7FCB5A', { s: '#2F7D3A', w: .35 }),
      t: cloud(19, 12, .62)
    }) });

  L({ n: 2, nombre: 'Éxodo', g: 'ley', cap: 40, sub: 'Dios libera',
    cita: 'Jehová peleará por vosotros, y vosotros estaréis tranquilos.', ref: 'Éxodo 14:14',
    dato: 'Dios alimentó a su pueblo con maná, un pan que caía del cielo, durante 40 años (Éx 16:35).',
    iso: 'El mar Rojo abierto en dos muros de agua, con un camino seco y la vara de Moisés.',
    cielo: ['#8FD0F5', '#FDEBC4'],
    esc: () => {
      const muro = p('M-30 -14 C-20 -20 -11 -14 -9 -4 C-7 6 -8 16 -9 30 H-30Z', '#2F8FD8') + s('M-28 -13.5 C-20 -18.5 -12 -13 -10 -4', '#fff', 1.1, .7) + s('M-22 -2 q4 3 3 9 M-17 10 q3 3 2 8', '#fff', .7, .4);
      return {
        b: cloud(0, -16, .5) + p('M-10 30 L-3 -3 Q0 -5 3 -3 L10 30Z', '#E8C98A') + muro + mx(muro) + fish(-19, 9, 12, .55, '#F2913D') + mx(fish(-18, -2, -8, .45, '#F6D04A')),
        f: s('M0 21 V-10 Q0 -19 6 -19 Q11 -19 11 -13', '#6B4423', 3.2) + s('M-.6 20 V-10 Q-.6 -18.4 6 -18.4', '#C99A62', .9, .8)
      };
    } });

  L({ n: 3, nombre: 'Levítico', g: 'ley', cap: 27, sub: 'Santos para Dios',
    cita: 'Santos seréis, porque santo soy yo Jehová vuestro Dios.', ref: 'Levítico 19:2',
    dato: 'Aquí está el mandamiento que Jesús repitió: “Amarás a tu prójimo como a ti mismo” (Lv 19:18).',
    iso: 'Un altar de piedra con fuego: Levítico enseña cómo acercarse a un Dios santo.',
    cielo: ['#FFF1C9', '#F6C98F'],
    esc: () => ({
      b: glow(0, -8, 22, '#FFD45E', .55) + ground(15, '#C9A679'),
      f: sh(0, 19.5, 21, 3) + flame(-6.5, 1, .5) + flame(6.5, 1, .55) + flame(0, 2, 1.02) + s('M5 -22 q3 -3 0 -6', '#fff', 1, .6) +
        rr(-16, 8, 32, 10.5, 2, '#9A8A7A') + rr(-13, 0, 26, 9, 2, '#B3A494') +
        p('M-13 1 L-13 -4 L-9 1Z', '#B3A494') + p('M13 1 L13 -4 L9 1Z', '#B3A494') +
        s('M-6 8 V13 M5 13 V18 M-16 13 H16 M0 0 V4.5 M-13 4.5 H13 M-7 4.5 V9', '#6F6257', .5, .6)
    }) });

  L({ n: 4, nombre: 'Números', g: 'ley', cap: 36, sub: 'En el desierto',
    cita: 'Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia.', ref: 'Números 6:24-25',
    dato: '¡Una asna habló! Dios le abrió la boca para detener al profeta Balaam (Nm 22:28).',
    iso: 'Las tiendas de Israel en el desierto, guiadas por la columna de nube.',
    cielo: ['#8FD0F5', '#FCE7B6'],
    esc: () => ({
      b: sun(-18, -16, 4.4) + cloud(13.5, 2, .6) + cloud(15, -6, .72) + cloud(14, -15, .85) + ground(8, '#E3BE7C') +
        p('M-27 13 L-20 1 L-13 13Z', '#C98A4B') + p('M15 14 L21 4 L27 14Z', '#D9A05A'),
      f: sh(0, 18.5, 19, 2.6) + p('M-16 17 L0 -6 L16 17Z', '#D9773F', { s: '#8A4520', w: .4 }) + f('M-4.5 17 L0 4 L4.5 17Z', '#5A2E12') +
        s('M-8 6 L-11 17 M8 6 L11 17', '#B85A28', .6, .6) + s('M0 -6 V-11', '#6B4423', 1) + p('M0 -11 L6 -9.4 L0 -7.8Z', '#C0392B')
    }) });

  L({ n: 5, nombre: 'Deuteronomio', g: 'ley', cap: 34, sub: 'Ama a Dios',
    cita: 'Y amarás a Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todas tus fuerzas.', ref: 'Deuteronomio 6:5',
    dato: 'Cuando Jesús fue tentado en el desierto, respondió tres veces con palabras de Deuteronomio (Mt 4:1-10).',
    iso: 'Las dos tablas de la ley con un corazón: obedecer a Dios es amarlo.',
    cielo: ['#BFE3F7', '#F3F8E4'],
    esc: () => ({
      b: p('M-30 16 L-14 -8 L-4 6 L8 -4 L30 16 V30 H-30Z', '#A99C93') + ground(17, '#C9B08A'),
      f: sh(0, 19, 19, 2.6) + p('M-15 17 V-5 A7 7 0 0 1 -1 -5 V17Z', '#C4BDB2', { s: '#8A8278', w: .4 }) +
        p('M1 17 V-5 A7 7 0 0 1 15 -5 V17Z', '#C4BDB2', { s: '#8A8278', w: .4 }) +
        s('M-12 -2 H-4 M-12 2 H-4 M-12 6 H-4 M-12 10 H-4 M-12 14 H-6 M4 -2 H12 M4 2 H12 M4 6 H12 M4 10 H12 M4 14 H10', '#7A7268', .9, .8) +
        heart(0, -19, .5, '#E5384F')
    }) });

  // ======================= HISTORIA =======================
  L({ n: 6, nombre: 'Josué', g: 'his', cap: 24, sub: 'Esfuérzate',
    cita: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.', ref: 'Josué 1:9',
    dato: 'El pueblo rodeó Jericó 13 veces en 7 días. Al sonar las bocinas y gritar, ¡los muros cayeron! (Jos 6).',
    iso: 'Una bocina de cuerno suena y los muros de Jericó se derrumban.',
    cielo: DIA,
    esc: () => ({
      b: ground(13, '#D9B77A') + p('M-28 17 V-2 H-23 V-6 H-18 V-2 H-13 V-6 H-8 V-2 H-3 V17Z', '#CFA468') +
        g('rotate(17 14 17)', p('M3 17 V-2 H8 V-6 H13 V-2 H18 V-6 H23 V-2 H28 V17Z', '#C4975A')) +
        s('M-3 -2 L0 5 L-4 10 L-1 17 M-28 4 H-3 M-28 10 H-3 M-16 4 V10 M-10 -2 V4 M-22 -2 V4 M-9 10 V17 M-21 10 V17', '#8A5A2B', .5, .6) +
        rr(3, -13, 5, 3.6, .6, '#CFA468', 25) + rr(-3, -18, 4, 3, .6, '#C4975A', -20) + rr(9, -19, 3.4, 2.6, .5, '#CFA468', 40),
      f: sh(0, 19, 14, 2) + p('M-16 16 C-15 8 -9 2 -1 0 C7 -2 12 -8 13 -19 L23 -13 C21 -3 13 4 3 6 C-5 8 -11 11 -13 17 Z', '#E9C46A', { s: '#A87A1E', w: .4 }) +
        egg(18, -16, 5.8, 2.6, '#7A4E0F', 30) + egg(18, -16, 4.2, 1.6, '#4A2E08', 30) + ball(-14.6, 16.6, 2, '#B8892A') +
        s('M-8 4 L-4.6 8.6 M1 0 L3.4 5 M9 -5 L13 -1', '#A87A1E', .9, .8) + hl(-2, 1.4, 6, .9, -15, .5) +
        s('M8 -23 q1 -4 6 -5 M6 -27 q2 -4 8 -5', '#fff', 1, .9)
    }) });

  L({ n: 7, nombre: 'Jueces', g: 'his', cap: 21, sub: 'Dios rescata',
    cita: 'Jehová está contigo, varón esforzado y valiente.', ref: 'Jueces 6:12',
    dato: 'Gedeón venció a un ejército enorme con solo 300 hombres, trompetas, cántaros y antorchas (Jue 7).',
    iso: 'El cántaro roto de Gedeón con la antorcha encendida adentro.',
    cielo: NOCHE,
    esc: () => ({
      b: spark(-18, -16, 1.4) + spark(16, -20, 1.1) + spark(22, -4, .9) + spark(-23, 2, .8) + glow(0, -10, 19, '#FFC93C', .55) + ground(15, '#3B4A2E'),
      f: sh(0, 19, 15, 2.4) + flame(0, -5, 1.02) +
        p('M-11 17 C-17 8 -13 -2 -7 -5 L-8 -9 L-4 -6 L-1 -10 L2 -6 L5 -9.5 L8 -9 L7 -5 C13 -2 17 8 11 17Z', '#C8743C', { s: '#8A4520', w: .4 }) +
        s('M3 -4 L1 2 L5 6 L3 11', '#7A3B18', .7) + hl(-7, 4, 2, 5, 15, .3) + p('M14 17 L19 10 L22 18Z', '#B8642F') + p('M-21 18 L-18 12 L-14 18Z', '#B8642F')
    }) });

  L({ n: 8, nombre: 'Rut', g: 'his', cap: 4, sub: 'Amor fiel',
    cita: 'Tu pueblo será mi pueblo, y tu Dios mi Dios.', ref: 'Rut 1:16',
    dato: 'Rut fue la bisabuela del rey David (Rt 4:17).',
    iso: 'Un manojo de espigas: Rut recogía trigo en el campo de Booz.',
    cielo: ['#F9D38A', '#FDEFC4'],
    esc: () => {
      let o = sh(0, 20, 12, 2.2);
      for (let i = -3; i <= 3; i++) {
        const a = i * 10 * Math.PI / 180, tx = N(Math.sin(a) * 27), ty = N(7 - Math.cos(a) * 27);
        o += s(`M0 7 L${tx} ${ty}`, '#C9972B', 1.3) + s(`M${N(i * 1.2)} 7 L${N(i * 3.2)} 19.5`, '#C9972B', 1.3) + egg(tx, ty, 2.3, 5.4, '#F0C24A', i * 10) +
          s(`M${tx} ${N(ty - 5)} L${N(tx + Math.sin(a) * 4)} ${N(ty - 5 - Math.cos(a) * 4)}`, '#C9972B', .5);
      }
      o += rr(-5.5, 5, 11, 4.4, 2, '#C0392B') + p('M4 7 L9 4.5 L8.5 9.5Z', '#C0392B');
      return { b: sun(18, -15, 4.6) + ground(11, '#E0B654') + s('M-28 15 H28 M-28 20 H28', '#C9972B', .5, .5), f: o };
    } });

  L({ n: 9, nombre: '1 Samuel', g: 'his', cap: 31, sub: 'Dios mira el corazón',
    cita: 'El hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón.', ref: '1 Samuel 16:7',
    dato: 'David escogió 5 piedras lisas del arroyo… ¡y solo necesitó una para vencer a Goliat! (1 S 17:40-49).',
    iso: 'La honda de David y las cinco piedras lisas del arroyo.',
    cielo: DIA,
    esc: () => ({
      b: cloud(-17, -14, .55) + ground(8, '#8CC66A') + f('M-30 17 C-18 13 -6 21 8 16 C16 13 24 17 30 15 V30 H-30Z', '#6EC1F0', .95) + s('M-24 19 q5 -2 10 0 M4 20 q5 -2 10 0', '#fff', .6, .7),
      f: s('M-6 1 C-15 -6 -9 -19 0 -21 C9 -19 15 -6 6 1', '#6B4423', 1.4) + ring(0, -22, 1.8, .9, '#8A5A2B') +
        egg(0, 2, 7.4, 4.6, '#8A5A2B') + ball(0, .4, 3.5, '#A7ADB3') +
        ball(-12, 15, 2.6, '#B5BBC1') + ball(-6, 17, 2.4, '#9AA0A6') + ball(0, 15.5, 2.7, '#C2C7CC') + ball(6.5, 17, 2.4, '#9AA0A6') + ball(12.5, 15, 2.6, '#B5BBC1')
    }) });

  L({ n: 10, nombre: '2 Samuel', g: 'his', cap: 24, sub: 'El rey David',
    cita: 'Jehová es mi roca y mi fortaleza, y mi libertador.', ref: '2 Samuel 22:2',
    dato: 'David fue rey 40 años: 7 en Hebrón y 33 en Jerusalén (2 S 5:4-5).',
    iso: 'La corona del rey David sobre un cojín real.',
    cielo: ['#5E449C', '#B79BE0'],
    esc: () => ({
      b: rays(0, 2, 15, 28, 12, '#FFE9A8', 1.3, .35) + spark(-20, -15, 1.3) + spark(21, -12, 1.1),
      f: sh(0, 20, 21, 3) + egg(0, 17, 20, 5, '#B0303C') +
        p('M-16 10 L-18 -8 L-9 0 L0 -12 L9 0 L18 -8 L16 10Z', '#F2C230', { s: '#A87A1E', w: .4 }) + rr(-16.5, 7.5, 33, 6, 2, '#E0A91E') +
        ball(-18, -9, 2.2, '#F2C230') + ball(0, -13.4, 2.5, '#F2C230') + ball(18, -9, 2.2, '#F2C230') +
        ball(0, 10.5, 2, '#D9364A') + ball(-9, 10.5, 1.6, '#3E8ED0') + ball(9, 10.5, 1.6, '#3FA36B')
    }) });

  L({ n: 11, nombre: '1 Reyes', g: 'his', cap: 22, sub: 'El templo',
    cita: 'Da, pues, a tu siervo corazón entendido para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo.', ref: '1 Reyes 3:9',
    dato: 'Unos cuervos le llevaban pan y carne al profeta Elías junto al arroyo (1 R 17:6).',
    iso: 'El templo que construyó el rey Salomón, con columnas y techo de oro.',
    cielo: ['#8CCBF3', '#E6F5FD'],
    esc: () => ({
      b: cloud(-17, -14, .6) + cloud(19, -18, .5) + ground(15, '#E9D8B0'),
      f: sh(0, 19.5, 23, 2.6) + rr(-21, 13, 42, 4, 1, '#D9C7A0') + rr(-18, 9.5, 36, 4, 1, '#E6D6B2') +
        f('M-3.5 9.5 V-1 A3.5 3.5 0 0 1 3.5 -1 V9.5Z', '#6B4423') +
        [-15, -8.5, 4.5, 11].map(x => rr(x, -5, 4, 15, 1.4, '#F7EFDC') + rr(x - .6, -6.4, 5.2, 2, .8, '#E8BE55')).join('') +
        rr(-18.5, -9, 37, 3, 1, '#D9A93A') + p('M-19.5 -9 L0 -19 L19.5 -9Z', '#E8BE55', { s: '#A87A1E', w: .4 }) + ball(0, -13, 1.7, '#FFF3B0')
    }) });

  L({ n: 12, nombre: '2 Reyes', g: 'his', cap: 25, sub: 'Profetas y reyes',
    cita: 'No tengas miedo, porque más son los que están con nosotros que los que están con ellos.', ref: '2 Reyes 6:16',
    dato: 'Elías subió al cielo en un torbellino, con un carro y caballos de fuego (2 R 2:11).',
    iso: 'El carro de fuego que apareció cuando Elías subió al cielo.',
    cielo: ['#F9D08A', '#F2915A', '#C9504A'],
    esc: () => ({
      b: s('M-24 14 C-10 4 -18 -8 -4 -14 C6 -18 14 -22 22 -20', '#fff', 2, .35) + s('M-20 20 C-4 12 -10 0 4 -6 C12 -9 18 -12 26 -10', '#fff', 1.4, .3) +
        cloud(-16, 19, .8) + cloud(16, 21, .7),
      f: flame(-14, 2, .8) + flame(-19, 9, .6) + flame(-3, -7, .5) + flame(6, -8, .58) +
        p('M-13 4 C-13 -7 -8 -9 -2 -9 H9 L13 4Z', '#F2C230', { s: '#A87A1E', w: .4 }) + s('M-9 -4 H8', '#FFF3B0', 1, .8) + s('M12 2 L24 -5', '#C98A1E', 1.8) +
        s('M0 -1 V15 M-8 7 H8 M-5.6 1.4 L5.6 12.6 M-5.6 12.6 L5.6 1.4', '#C98A1E', 1.1) + ring(0, 7, 8, 2.4, '#E0A91E') + ball(0, 7, 1.9, '#F2C230') +
        flame(-9, 17, .42) + flame(9, 17, .42)
    }) });

  L({ n: 13, nombre: '1 Crónicas', g: 'his', cap: 29, sub: 'Adora a Dios',
    cita: 'Aclamad a Jehová, porque él es bueno; porque su misericordia es eterna.', ref: '1 Crónicas 16:34',
    dato: 'Empieza con 9 capítulos de nombres: una lista enorme de familias desde Adán.',
    iso: 'El arca del pacto, que David llevó a Jerusalén con cantos y alegría.',
    cielo: ['#FFF4CC', '#F7D58A'],
    esc: () => {
      const ala = g('translate(-13 -3) rotate(118)', alaP('#F6D878', .55));
      return {
        b: rays(0, -4, 10, 28, 14, '#fff', 1.5, .55) + ground(17, '#D9B77A'),
        f: sh(0, 18.5, 23, 2.6) + s('M-25 11 H25', '#8A5A2B', 2.4) + rr(-15, 0, 30, 15, 2, '#E8BE55') + s('M-11 4.5 H11 M-11 8.5 H11', '#C99A2E', .6, .7) +
          ball(-15, 11, 2, '#F6D878') + ball(15, 11, 2, '#F6D878') + rr(-17, -3.4, 34, 4.4, 1.6, '#F2D06B') + ala + mx(ala) + spark(0, -14, 1.8, '#fff')
      };
    } });

  L({ n: 14, nombre: '2 Crónicas', g: 'his', cap: 36, sub: 'Busca a Dios',
    cita: 'No es vuestra la guerra, sino de Dios.', ref: '2 Crónicas 20:15',
    dato: 'Josías comenzó a reinar cuando tenía solo 8 años (2 Cr 34:1).',
    iso: 'El candelabro de oro que alumbraba dentro del templo.',
    cielo: ['#4A2F4F', '#A5673F'],
    esc: () => {
      const oro = '#E8BE55';
      let o = sh(0, 20, 11, 2) + p('M-9 19.5 L-4 13 H4 L9 19.5Z', '#E0A91E') + s('M0 13 V-10', oro, 2.4);
      [[18, 8], [12, 3], [6, -2]].forEach(([x, y]) => { o += s(`M${-x} -10 Q${-x} ${y} 0 ${y} Q${x} ${y} ${x} -10`, oro, 2); });
      [-18, -12, -6, 0, 6, 12, 18].forEach(x => { o += rr(x - 1.9, -12.2, 3.8, 2.4, .8, '#F6D878') + flame(x, -12, .3); });
      return { b: glow(0, -12, 26, '#FFD45E', .5), f: o };
    } });

  L({ n: 15, nombre: 'Esdras', g: 'his', cap: 10, sub: 'El regreso',
    cita: 'Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla.', ref: 'Esdras 7:10',
    dato: 'Al poner los cimientos del nuevo templo, unos gritaban de alegría y otros lloraban de emoción (Esd 3:12-13).',
    iso: 'El rollo de la ley que Esdras estudiaba y enseñaba al pueblo.',
    cielo: SALA,
    esc: () => ({
      b: glow(0, 0, 24, '#fff', .55),
      f: sh(0, 19, 21, 2.4) + rr(-15, -12, 30, 26, 1, '#FBF3DC') + s('M-11 -6 H11 M-11 -2 H11 M-11 2 H11 M-11 6 H5', '#8A6A4A', .9, .75) +
        rr(-19, -16, 38, 5.4, 2.7, '#B9814A') + rr(-19, 10.6, 38, 5.4, 2.7, '#B9814A') +
        ball(-20, -13.3, 2.4, '#8A5A2B') + ball(20, -13.3, 2.4, '#8A5A2B') + ball(-20, 13.3, 2.4, '#8A5A2B') + ball(20, 13.3, 2.4, '#8A5A2B')
    }) });

  L({ n: 16, nombre: 'Nehemías', g: 'his', cap: 13, sub: 'Reconstruir',
    cita: 'El gozo de Jehová es vuestra fuerza.', ref: 'Nehemías 8:10',
    dato: 'El muro de Jerusalén se reconstruyó en solo 52 días (Neh 6:15).',
    iso: 'Un muro de ladrillos a medio construir y la paleta del albañil.',
    cielo: DIA,
    esc: () => {
      let o = sh(0, 19, 23, 2.4);
      [[-21, -10.5, 0, 10.5], [-15.7, -5.2, 5.3], [-21, -10.5], [-15.7]].forEach((xs, r) => xs.forEach(x => { o += rr(x, N(11 - r * 5.3), 10, 4.8, .8, r % 2 ? '#D98E5A' : '#CF8250'); }));
      o += egg(9, 5.4, 4.4, 1.5, '#E6E0D4') + g('translate(8 -8) rotate(-28)', p('M0 0 L13 -4.5 L13 4.5Z', '#C9CED3', { s: '#8A9096', w: .3 }) + rr(13, -1.4, 4, 2.8, .6, '#8A9096') + rr(16.5, -2, 9, 4, 2, '#8A5A2B'));
      return { b: cloud(-16, -15, .6) + ground(16, '#D9C7A0'), f: o };
    } });

  L({ n: 17, nombre: 'Ester', g: 'his', cap: 10, sub: 'Valiente',
    cita: '¿Y quién sabe si para esta hora has llegado al reino?', ref: 'Ester 4:14',
    dato: 'En este libro no aparece ni una vez el nombre de Dios, ¡pero su cuidado se ve en toda la historia!',
    iso: 'La corona de la reina Ester y el cetro de oro del rey.',
    cielo: ['#7B4AA0', '#E3B0D4'],
    esc: () => ({
      b: spark(-20, -10, 1.4) + spark(21, 5, 1.2) + spark(4, -21, 1) + s('M-21 21 L15 -17', '#B8892A', 2.6) + s('M-21 21 L15 -17', '#F2C230', 1.6) + ball(16.5, -18.5, 3.4, '#F6D878'),
      f: sh(0, 13.5, 19, 2.4) + p('M-15 6 C-15 -4 -10 -2 -8 -8 C-5 -2 -3 -4 0 -13 C3 -4 5 -2 8 -8 C10 -2 15 -4 15 6Z', '#F2C230', { s: '#A87A1E', w: .4 }) +
        rr(-15.5, 4.5, 31, 5.6, 2.6, '#E0A91E') + ball(0, 7.3, 2, '#E0457B') + ball(-8, 7.3, 1.4, '#7FD6E8') + ball(8, 7.3, 1.4, '#7FD6E8') +
        ball(0, -13.5, 2, '#E0457B') + ball(-8, -8.6, 1.5, '#F6D878') + ball(8, -8.6, 1.5, '#F6D878')
    }) });

  // ======================= POESÍA Y SABIDURÍA =======================
  L({ n: 18, nombre: 'Job', g: 'poe', cap: 42, sub: 'Confía siempre',
    cita: 'Yo sé que mi Redentor vive, y al fin se levantará sobre el polvo.', ref: 'Job 19:25',
    dato: 'Al final, Dios le dio a Job el doble de todo lo que había tenido antes (Job 42:10).',
    iso: 'El torbellino desde donde Dios le habló a Job, con la luz abriéndose paso.',
    cielo: ['#55627A', '#A9B6C9', '#F3E3B0'],
    esc: () => {
      let o = '';
      for (let i = 0; i < 7; i++) o += egg(N(Math.sin(i * 1.3) * 2.5), N(-17 + i * 5.4), N(19 - i * 2.5), 3.4, '#D5DCE6');
      o += s('M-14 -16 q14 5 27 -1 M-10 0 q10 4 19 -1 M-5 11 q5 3 10 -1', '#fff', .8, .75) + egg(0, 18.5, 8, 1.8, '#D9C7A0');
      return { b: glow(19, -17, 14, '#FFE9A8', .9) + rays(19, -17, 6, 16, 10, '#FFF3C4', 1, .6) + ground(18, '#BFA57A'), f: o };
    } });

  L({ n: 19, nombre: 'Salmos', g: 'poe', cap: 150, sub: 'Canta a Dios',
    cita: 'Jehová es mi pastor; nada me faltará.', ref: 'Salmo 23:1',
    dato: 'Es el libro más largo de la Biblia: 150 salmos. El 117 es el capítulo más corto y el 119 el más largo.',
    iso: 'El arpa con la que David cantaba alabanzas a Dios.',
    cielo: ['#6C5BB8', '#D3C4F2'],
    esc: () => ({
      b: glow(0, 0, 24, '#fff', .3) + spark(-21, 11, 1.2) + spark(21, -18, 1.4),
      f: sh(0, 20, 16, 2.2) + [-4, -.5, 3, 6.5, 10].map((x, i) => s(`M${x} ${N(-15 + i * .6)} V16`, '#FFF3C4', .7)).join('') +
        p('M-13 17 C-19 4 -15 -12 -6 -18 L-2 -15 C-9 -9 -11 4 -7 17Z', '#C98A2B', { s: '#8A5A0F', w: .4 }) +
        p('M-7 -19 C0 -22 8 -14 15 -15 L15 -11 C8 -10 0 -17 -5 -15Z', '#D9A03A', { s: '#8A5A0F', w: .4 }) +
        rr(12.4, -15, 3.2, 33, 1.4, '#B9781E') + rr(-14, 16, 30, 3.4, 1.6, '#8A5A0F') + note(22, 2, .8, '#FFF3C4') + note(-21, -8, .7, '#FFF3C4')
    }) });

  L({ n: 20, nombre: 'Proverbios', g: 'poe', cap: 31, sub: 'Sabiduría',
    cita: 'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.', ref: 'Proverbios 3:5',
    dato: 'Proverbios nos manda aprender de la hormiga, que trabaja sin que nadie la obligue (Pr 6:6-8).',
    iso: 'La hormiga trabajadora cargando una hoja: “Ve a la hormiga… y sé sabio”.',
    cielo: DIA,
    esc: () => ({
      b: sun(-18, -16, 4.4) + ground(9, '#9CCB6A'),
      f: sh(0, 16.5, 19, 2.4) + s('M-3 6 L-7 15 M0 7 L1 15.5 M3 6 L8 14.5', '#4A2212', 1.3) + s('M1 0 L3 -6', '#4A2212', 1.2) +
        p('M-8 -7 C-2 -19 12 -18 16 -9 C9 -4 0 -3 -8 -7Z', '#6DBE5A', { s: '#3E8A3A', w: .35 }) + s('M-8 -7 Q4 -11 16 -9', '#E7FAC8', .5, .9) +
        egg(-10, 4.5, 8, 6.4, '#7A3B22') + ball(0, 3.5, 5, '#8A4528') + ball(8.5, 0, 6.2, '#8A4528') + eye(7, -1, 1.3) + eye(11.4, -1, 1.3) +
        s('M7.4 2.6 Q9.2 4.4 11 2.6', '#3A1A0C', .6)
    }) });

  L({ n: 21, nombre: 'Eclesiastés', g: 'poe', cap: 12, sub: 'Todo tiene su tiempo',
    cita: 'Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.', ref: 'Eclesiastés 3:1',
    dato: 'Lo escribió “el Predicador”, un rey muy sabio de Jerusalén (Ec 1:1).',
    iso: 'Un reloj de arena entre el sol y la luna: todo tiene su tiempo.',
    cielo: { h: ['#FBE3A8', '#F3D9C9', '#7C76B8'] },
    esc: () => ({
      b: sun(-19, -13, 4.2) + moon(18, -14, 4.2) + spark(22, -3, 1),
      f: sh(0, 20, 14, 2.2) + rr(-12, -14, 2.2, 28, 1, '#8A5A2B') + rr(9.8, -14, 2.2, 28, 1, '#8A5A2B') +
        `<path d="M-9 -14 H9 C9 -4 2 -2 2 0 C2 2 9 4 9 14 H-9 C-9 4 -2 2 -2 0 C-2 -2 -9 -4 -9 -14Z" fill="#DDF1FA" opacity=".85" stroke="#8FB6CC" stroke-width=".4"/>` +
        f('M-6.4 -8 H6.4 C5 -4 1.5 -2.5 0 -1 C-1.5 -2.5 -5 -4 -6.4 -8Z', '#E8B93C') + f('M-8 14 C-6 8 -3 6 0 5.5 C3 6 6 8 8 14Z', '#E8B93C') + s('M0 -1 V6', '#E8B93C', .8) +
        hl(-5, -9, 1.2, 3.6, 15, .6) + rr(-13, -18, 26, 4.4, 2, '#B9814A') + rr(-13, 13.6, 26, 4.4, 2, '#B9814A')
    }) });

  L({ n: 22, nombre: 'Cantares', g: 'poe', cap: 8, sub: 'Canto de amor',
    cita: 'Yo soy la rosa de Sarón, y el lirio de los valles.', ref: 'Cantares 2:1',
    dato: 'Su nombre completo es “Cantar de los cantares”: quiere decir “la canción más hermosa” (Cnt 1:1).',
    iso: 'Un lirio de los valles rodeado de corazones.',
    cielo: ['#F7C9DC', '#FDEBF2'],
    esc: () => {
      const petalo = a => g(`rotate(${a})`, p('M0 1 C-5.5 -5 -4.5 -14 0 -19 C4.5 -14 5.5 -5 0 1Z', '#FDF6F9', { s: '#E3A6C2', w: .4 }));
      return {
        b: ground(16, '#8CC66A') + heart(16, -13, .42, '#E0457B') + heart(-17, -6, .32, '#E0457B') + heart(20, 4, .25, '#F08AAE'),
        f: s('M0 20 C-1 13 1 7 0 1', '#3E9A45', 2) + p('M0 14 C-6 11 -11 12 -13 16 C-8 17 -3 17 0 14Z', '#5DB55A') + p('M0 11 C5 7 10 7 13 10 C9 12 4 13 0 11Z', '#5DB55A') +
          petalo(-64) + petalo(64) + petalo(-32) + petalo(32) + petalo(0) +
          s('M0 -1 L-3 -9 M0 -1 L0 -10.5 M0 -1 L3 -9', '#E8B93C', .8) + ball(-3, -9.4, 1.1, '#F2B01E') + ball(0, -11, 1.1, '#F2B01E') + ball(3, -9.4, 1.1, '#F2B01E')
      };
    } });

  // ======================= PROFETAS MAYORES =======================
  L({ n: 23, nombre: 'Isaías', g: 'may', cap: 66, sub: 'Nuevas fuerzas',
    cita: 'Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.', ref: 'Isaías 40:31',
    dato: 'Isaías tiene 66 capítulos, ¡igual que los 66 libros de la Biblia!',
    iso: 'Un águila con las alas abiertas sobre las montañas.',
    cielo: ['#6DB3EC', '#DDF0FB'],
    esc: () => {
      const ala = g('translate(-3 -1) rotate(8)', alaP('#7A4E28', 1.02));
      return {
        b: sun(-17, -16, 4.6) + p('M-30 22 L-15 5 L-5 15 L7 1 L30 22 V30 H-30Z', '#8FA6B8') + f('M7 1 L11 6 L7 5 L4 8Z', '#fff', .8) + cloud(18, -11, .55),
        f: ala + mx(ala) + p('M-4.5 8 L0 18 L4.5 8Z', '#F4F6F8', { s: '#B5BBC1', w: .3 }) + egg(0, 2, 5.2, 8.5, '#6B4423') + ball(0, -8, 4.7, '#F7F8FA') +
          p('M-1.7 -6.6 L0 -1.8 L1.7 -6.6Z', '#F2B01E') + eye(-2, -8.8, .8) + eye(2, -8.8, .8)
      };
    } });

  L({ n: 24, nombre: 'Jeremías', g: 'may', cap: 52, sub: 'El alfarero',
    cita: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.', ref: 'Jeremías 29:11',
    dato: 'Cuando Dios lo llamó, Jeremías respondió: “¡No sé hablar, porque soy niño!” (Jer 1:6).',
    iso: 'Una vasija de barro sobre la rueda del alfarero: Dios nos da forma.',
    cielo: ['#F6DDB8', '#E9BE8A'],
    esc: () => ({
      b: glow(0, -2, 22, '#fff', .45),
      f: sh(0, 20.5, 21, 2.4) + rr(-3.5, 15, 7, 6, 1, '#6F767C') + egg(0, 14.5, 18, 3.6, '#8A8F96') +
        p('M-8 13 C-14 7 -12 -2 -6 -5 C-7.5 -8 -7.5 -10 -8.5 -12 H8.5 C7.5 -10 7.5 -8 6 -5 C12 -2 14 7 8 13Z', '#C8743C', { s: '#8A4520', w: .4 }) +
        egg(0, -12, 8.5, 2, '#8A4520') + s('M-11 3 Q0 6 11 3 M-10 -1 Q0 2 10 -1', '#A85A2A', .6, .7) + hl(-7, 4, 1.8, 5, 12, .3) +
        s('M-22 9 q-3 3 0 6 M22 9 q3 3 0 6', '#fff', 1, .75) + ball(-15, 11.5, 1.4, '#C8743C') + ball(14.5, 10.5, 1.1, '#C8743C')
    }) });

  L({ n: 25, nombre: 'Lamentaciones', g: 'may', cap: 5, sub: 'Nueva mañana',
    cita: 'Nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.', ref: 'Lamentaciones 3:22-23',
    dato: 'Son 5 poemas tristes. Cuatro de ellos siguen el orden del alfabeto hebreo, letra por letra.',
    iso: 'Una lágrima y, detrás, el sol de un nuevo amanecer.',
    cielo: ['#3B4A7A', '#C98AA6', '#FBD9A0'],
    esc: () => ({
      b: rays(15, 17, 11, 25, 12, '#FFE9A8', 1.3, .55) + ball(15, 17, 8.5, '#FFC93C') +
        f('M-30 13 H-22 V6 H-18 V10 H-13 V17 H-30Z', '#3F3D5C') + f('M30 13 H26 V7 H23 V17 H30Z', '#3F3D5C') + ground(17, '#4B4A66'),
      f: sh(-2, 19, 12, 2, .4) + gota(-2, 2, 1.02, '#6EC1F0')
    }) });

  L({ n: 26, nombre: 'Ezequiel', g: 'may', cap: 48, sub: 'Corazón nuevo',
    cita: 'Os daré corazón nuevo, y pondré espíritu nuevo dentro de vosotros.', ref: 'Ezequiel 36:26',
    dato: 'Ezequiel vio un valle lleno de huesos secos… ¡que volvieron a vivir! (Ez 37:1-10).',
    iso: 'Las ruedas brillantes de la visión de Ezequiel: una rueda dentro de otra.',
    cielo: ['#2E3F7A', '#7FA9E0'],
    esc: () => {
      let o = s('M-15 1 H15 M0 -14 V16', '#C99A2E', 1.2) + ring(0, 1, 15, 3.2, '#E8BE55') +
        `<ellipse cx="0" cy="1" rx="6.5" ry="15" fill="none" stroke="#A87A1E" stroke-width="3.2"/><ellipse cx="0" cy="1" rx="6.5" ry="15" fill="none" stroke="#F2D06B" stroke-width="2"/>`;
      for (let k = 0; k < 8; k++) { const a = k * 45 * Math.PI / 180; o += ball(N(Math.cos(a) * 15), N(1 + Math.sin(a) * 15), 1.4, '#2BA6A0'); }
      return { b: glow(0, 0, 26, '#FFE27A', .45) + spark(-21, -12, 1.3) + spark(20, -17, 1.2) + spark(22, 11, 1), f: o + ball(0, 1, 2.6, '#F6D878') };
    } });

  L({ n: 27, nombre: 'Daniel', g: 'may', cap: 12, sub: 'Fiel a Dios',
    cita: 'Mi Dios envió su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño.', ref: 'Daniel 6:22',
    dato: 'Daniel y sus amigos comieron solo legumbres y agua 10 días… ¡y se veían más sanos que los que comían la comida del rey! (Dn 1:12-15).',
    iso: 'Un león dormido en el foso, con la boca cerrada, y la luz del ángel entrando desde arriba. Las 3 cuentas: Daniel oraba 3 veces al día.',
    cuentas: { n: 3 }, cielo: ['#FBE7B5', '#B98E6C', '#7A5646', '#4B342C'],
    esc: () => {
      let melena = '';
      for (let k = 0; k < 16; k++) melena += g(`rotate(${k * 22.5})`, egg(0, -15, 6.4, 8.4, '#E08A2E'));
      const leon = melena + ball(0, 0, 17, '#E08A2E') +
        ball(-10.5, -10, 4.6, '#F5C46E') + ci(-10.5, -10, 2.4, '#E59A6E') + ball(10.5, -10, 4.6, '#F5C46E') + ci(10.5, -10, 2.4, '#E59A6E') +
        egg(0, 0, 12.6, 12, '#F5C46E') + hl(-4.5, -6.5, 4.2, 2.3, -20, .4) +
        s('M-7.2 -1.6 Q-4.8 1 -2.4 -1.6 M2.4 -1.6 Q4.8 1 7.2 -1.6', '#5A2E12', 1) +
        ci(-8.2, 3.4, 1.9, '#F07F5E', .45) + ci(8.2, 3.4, 1.9, '#F07F5E', .45) +
        ball(-2.7, 5, 3.7, '#FBEFD6') + ball(2.7, 5, 3.7, '#FBEFD6') +
        f('M-3 1.3 Q0 -.1 3 1.3 Q2.8 3.6 0 4.6 Q-2.8 3.6 -3 1.3Z', '#6B3518') + s('M0 4.6 V6.2 M-2.4 7 Q-1.2 7.9 0 6.2 Q1.2 7.9 2.4 7', '#6B3518', .6);
      const piedra = (x, y, rx, ry) => egg(x, y, rx, ry, '#8A6B5A');
      return {
        b: piedra(-21, -8, 7.5, 5.4) + piedra(-24, 6, 6.5, 5.2) + piedra(-15, -18, 5.4, 3.8) + piedra(21, -9, 7.5, 5.4) + piedra(24, 6, 6.5, 5.2) + piedra(15, -19, 5.4, 3.8) +
          piedra(-28, 19, 6, 4.4) + piedra(28, 19, 6, 4.4) + egg(0, 35, 36, 13, '#C9A679') + beam(-6, 6, -20, 20, -29, 32) + ci(0, -28, 6, '#FFF8DD') +
          spark(-5, -17, 1.3) + spark(6.5, -12, .9) + egg(0, 20.5, 19.5, 7.6, '#D9953E'),
        f: sh(1.5, 5, 21, 20, .35) + g('translate(0 3) scale(.86)', leon) +
          egg(-8.2, 28.4, 6.2, 3.6, '#F5C46E') + egg(8.2, 28.4, 6.2, 3.6, '#F5C46E') +
          s('M-10.4 29.4 v1.8 M-8 29.8 v1.8 M-5.6 29.4 v1.8 M6 29.4 v1.8 M8.4 29.8 v1.8 M10.8 29.4 v1.8', '#B9772F', .5) +
          txt(15, -14, 3.2, 'z', '#fff', { stroke: '#8E2E25' }) + txt(19, -19, 4.2, 'z', '#fff', { stroke: '#8E2E25' }) + txt(24, -25, 5.4, 'Z', '#fff', { stroke: '#8E2E25' })
      };
    } });

  // ======================= PROFETAS MENORES =======================
  L({ n: 28, nombre: 'Oseas', g: 'men', cap: 14, sub: 'Amor que perdona',
    cita: 'Y conoceremos, y proseguiremos en conocer a Jehová… vendrá a nosotros como la lluvia.', ref: 'Oseas 6:3',
    dato: 'El nombre Oseas significa “salvación”.',
    iso: 'Una nube que deja caer lluvia sobre la tierra seca y la hace brotar.',
    cielo: ['#8FB8DE', '#DDEEF8'],
    esc: () => ({
      b: sun(14, -18, 5.4) + ground(14, '#B98A5A') +
        [[-14, 3], [-8, 8], [-2, 2], [4, 9], [10, 4], [15, 10], [-18, 10]].map(([x, y]) => gota(x, y, .16, '#4AA8E8')).join(''),
      f: cloud(-1, -9, 1.75) + brote(-12, 17, 1) + brote(0, 18, 1.2) + brote(12, 17, 1)
    }) });

  L({ n: 29, nombre: 'Joel', g: 'men', cap: 3, sub: 'Vuelve a Dios',
    cita: 'Convertíos a Jehová vuestro Dios; porque misericordioso es y clemente, tardo para la ira y grande en misericordia.', ref: 'Joel 2:13',
    dato: 'El apóstol Pedro citó al profeta Joel en su predicación del día de Pentecostés (Hch 2:16-17).',
    iso: 'Una langosta: Joel habla de una plaga de langostas que se comió las cosechas.',
    cielo: ['#F3E3A0', '#FBF3CF'],
    esc: () => ({
      b: s('M-21 15 V-6 M-16 15 V-10', '#C9972B', 1) + egg(-21, -9, 1.8, 4.4, '#E8B93C') + egg(-16, -13, 1.8, 4.4, '#E8B93C') + ground(12, '#C9B458'),
      f: sh(0, 17, 19, 2.2) + s('M-3 6 L-11 -9 L-17 14', '#5A8F2A', 2) + s('M5 7 L4 14.5 M9 6 L11 13.5', '#5A8F2A', 1.3) + egg(-1, 4, 13.5, 4.6, '#7DB93B', -6) +
        p('M-13 4 C-5 -4 6 -3 9 1 C2 3 -6 6 -13 4Z', '#A8D86A', { s: '#5A8F2A', w: .3 }) + ball(12.5, 0, 4.8, '#8CC84A') + eye(13.8, -1.2, 1.3) +
        s('M14 -4.4 Q19 -13 24 -11 M12 -4.6 Q14 -13 18 -15', '#5A8F2A', .8) + s('M12.6 2.4 Q14.4 3.4 15.8 2', '#3A5F1A', .5)
    }) });

  L({ n: 30, nombre: 'Amós', g: 'men', cap: 9, sub: 'Justicia',
    cita: 'Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo.', ref: 'Amós 5:24',
    dato: 'Amós no era profeta de profesión: era pastor y recogía higos silvestres cuando Dios lo llamó (Am 7:14-15).',
    iso: 'Una plomada de albañil junto a un muro: Dios mide si su pueblo anda derecho.',
    cielo: DIA,
    esc: () => {
      let muro = '';
      for (let r = 0; r < 7; r++) { const y = N(15 - r * 6.1), d = r % 2 ? 0 : -5; muro += rr(-30 + d, y, 11.4, 5.5, .8, '#B5AEA6') + rr(-18 + d, y, 11.4, 5.5, .8, '#C1BAB1'); }
      return {
        b: cloud(16, -16, .5) + ground(20, '#C9B08A') + muro,
        f: s('M9 -27 V5', '#6B4423', 1) + ball(9, -27, 1.7, '#6B4423') + rr(5, 3, 8, 3.4, 1, '#B8892A') + p('M3.5 6.4 H14.5 L9 21Z', '#E0A91E', { s: '#A87A1E', w: .4 }) + hl(6.8, 10, .9, 2.6, 15, .5)
      };
    } });

  L({ n: 31, nombre: 'Abdías', g: 'men', cap: 1, sub: 'Dios es justo',
    cita: 'Porque cercano está el día de Jehová sobre todas las naciones; como tú hiciste se hará contigo.', ref: 'Abdías 1:15',
    dato: 'Es el libro más corto del Antiguo Testamento: ¡un solo capítulo con 21 versículos!',
    iso: 'Un nido de águila en la cima de la montaña, entre las estrellas (Abd 1:4).',
    cielo: ['#F7A968', '#FBE3B8'],
    esc: () => ({
      b: p('M-30 24 L-20 6 L-12 16 L-4 8 V30 H-30Z', '#B58AA5') + p('M30 24 L21 8 L12 18 V30 H30Z', '#C79AB0') + spark(-15, -19, 1.3, '#fff') + spark(21, -11, .9, '#fff') +
        p('M-21 30 L-7 -7 L-1 -13 L7 -5 L21 30Z', '#9C8B84', { s: '#6F625C', w: .4 }) + f('M-1 -13 L7 -5 L4 3 L-2 -3Z', '#fff', .18) + s('M-7 -7 L-3 4 L-9 14 M7 -5 L5 6 L11 16', '#6F625C', .6, .6),
      f: egg(0, -13, 7.4, 2.7, '#8A5A2B') + s('M-7 -13 L-10 -15.4 M7 -13 L10 -15.4 M-4 -11 L-6.4 -9 M3 -11 L6.4 -9.4', '#6B4423', .8) +
        ball(-2.3, -15.2, 2.1, '#FBF3DC') + ball(2.3, -15.4, 2.1, '#F4E9C8') + star5(13.5, -22, 3.3, '#FFE27A')
    }) });

  L({ n: 32, nombre: 'Jonás', g: 'men', cap: 4, sub: 'Dios perdona',
    cita: 'Invoqué en mi angustia a Jehová, y él me oyó.', ref: 'Jonás 2:2',
    dato: 'Jonás estuvo 3 días y 3 noches dentro del gran pez (Jon 1:17).',
    iso: 'El gran pez que Dios preparó para rescatar a Jonás del mar.',
    cielo: ['#9BD8F5', '#E3F6FD'],
    esc: () => ({
      b: cloud(16, -17, .5) + waves(6, '#3D9BE0'),
      f: s('M-6 -12 C-6 -19 -12 -20 -13 -16 M-6 -12 C-6 -19 0 -20 1 -16', '#BFE6F9', 1.4) + ci(-14, -13.4, 1, '#BFE6F9') + ci(2, -13.4, 1, '#BFE6F9') +
        p('M-20 2 C-18 -10 -4 -14 8 -10 C16 -8 20 -2 22 -8 C25 -12 29 -12 30 -9 C27 -6 27 0 22 4 C14 12 -8 14 -18 9 C-21 7 -21 4 -20 2Z', '#3F7FBF', { s: '#245A8F', w: .4 }) +
        f('M-18 8 C-8 13 8 12 18 6 C10 9.5 -6 10.5 -18 8Z', '#CFE6F7', .9) + hl(-6, -7, 6, 2, -8, .35) + eye(-13, 1, 1.5) + s('M-19 5 Q-14 9 -8 7', '#1F3F66', .7),
      t: waves(11.5, '#5BB5EC')
    }) });

  L({ n: 33, nombre: 'Miqueas', g: 'men', cap: 7, sub: 'De Belén vendrá',
    cita: 'Hacer justicia, y amar misericordia, y humillarte ante tu Dios.', ref: 'Miqueas 6:8',
    dato: 'Unos 700 años antes, Miqueas anunció que el Mesías nacería en el pueblito de Belén (Mi 5:2).',
    iso: 'El pueblito de Belén de noche, con una estrella encima.',
    cielo: NOCHE,
    esc: () => ({
      b: spark(-20, -14, 1.2) + spark(19, -8, 1) + spark(-10, -22, .9) + spark(23, -19, 1.1) + beam(-1.5, 1.5, -8, 8, -15, 10) + star5(0, -17, 5.4, '#FFE27A') + ground(12, '#3E5A4A'),
      f: rr(-16, 3, 11, 12, 1, '#E9D2A8') + p('M-16 3.4 A5.5 5.5 0 0 1 -5 3.4Z', '#D9B77A') + f('M-12.2 15 V10 A1.7 1.7 0 0 1 -8.8 10 V15Z', '#6B4423') +
        rr(-4, -1, 10, 16, 1, '#F1DDB8') + rr(-5, -2.4, 12, 2.4, .8, '#D9B77A') + rr(-.8, 3, 3.6, 4.2, .6, '#FFD45E') +
        rr(7, 5, 10, 10, 1, '#E3C898') + p('M7 5.4 A5 5 0 0 1 17 5.4Z', '#CFA468') + rr(10.5, 8.6, 3, 3.4, .5, '#FFD45E')
    }) });

  L({ n: 34, nombre: 'Nahum', g: 'men', cap: 3, sub: 'Dios es refugio',
    cita: 'Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían.', ref: 'Nahum 1:7',
    dato: 'Nahum habla a Nínive, la misma ciudad donde había predicado Jonás mucho tiempo antes.',
    iso: 'Una torre fuerte de piedra: Dios es nuestra fortaleza.',
    cielo: ['#7FB8E8', '#E3F2FB'],
    esc: () => ({
      b: cloud(-18, -12, .6) + cloud(19, -17, .5) + ground(16, '#8CC66A'),
      f: sh(0, 20.5, 15, 2.2) + rr(-9, -8, 18, 28, 1, '#B5AEA6') + rr(-11.5, -13, 23, 6, 1, '#C4BEB6') + [-11.5, -2.75, 6].map(x => rr(x, -17.5, 5.5, 5, .6, '#C4BEB6')).join('') +
        f('M-3.6 20 V11 A3.6 3.6 0 0 1 3.6 11 V20Z', '#6B4423') + rr(-1.6, -3, 3.2, 5.4, 1.6, '#3F3D5C') + s('M-9 0 H-3 M3 4 H9 M-9 8 H-4 M4 -5 H9', '#8A8278', .5, .7) +
        s('M0 -17.5 V-26', '#6B4423', 1) + p('M0 -26 L8 -23.5 L0 -21Z', '#D9364A')
    }) });

  L({ n: 35, nombre: 'Habacuc', g: 'men', cap: 3, sub: 'Me alegraré',
    cita: 'Con todo, yo me alegraré en Jehová, y me gozaré en el Dios de mi salvación.', ref: 'Habacuc 3:18',
    dato: 'Habacuc termina con una canción: el capítulo 3 es una oración escrita para cantarse.',
    iso: 'Un ciervo firme en lo alto de la montaña: “hace mis pies como de ciervas” (Hab 3:19).',
    cielo: ['#F9C78A', '#FDEBC8'],
    esc: () => ({
      b: sun(-17, -15, 5) + p('M-30 26 L-18 8 L-8 18 V30 H-30Z', '#C9A58F') + p('M-28 30 L-10 9.5 L11 9.5 L28 30Z', '#9C8E86') + f('M-10 9.5 L11 9.5 L6 14 L-4 13Z', '#fff', .2),
      f: [-6, -2.5, 3, 6.5].map(x => rr(x, 2, 2.2, 8, 1, '#A66A2E')).join('') + egg(0, -1, 9.5, 5.6, '#C98A4B') + p('M5 -3 L9 -13 L13 -11 L10 0Z', '#C98A4B') +
        p('M8.5 -16 L7 -20.5 L10.5 -17.5Z', '#A66A2E') + egg(12, -14, 4.4, 3.3, '#C98A4B', -12) +
        s('M11 -17 L10 -22.5 M10.3 -20 L7.8 -22 M13 -17 L14.5 -22.5 M14 -20.4 L16.6 -21.6', '#7A4E28', 1) + eye(13, -14.6, .8) + ball(16, -13.2, 1, '#3A1A0C') +
        ball(-9.6, -3, 1.7, '#FBF3DC') + ci(-3, -2.5, .8, '#fff', .8) + ci(0, -.5, .8, '#fff', .8) + ci(3, -3, .8, '#fff', .8)
    }) });

  L({ n: 36, nombre: 'Sofonías', g: 'men', cap: 3, sub: 'Dios canta',
    cita: 'Jehová está en medio de ti, poderoso, él salvará; se gozará sobre ti con alegría, callará de amor, se regocijará sobre ti con cánticos.', ref: 'Sofonías 3:17',
    dato: 'Sofonías era tataranieto de Ezequías, probablemente el rey de Judá (Sof 1:1).',
    iso: 'Notas musicales y corazones: ¡Dios se alegra por su pueblo con cantos!',
    cielo: ['#F9D976', '#FDF1C0'],
    esc: () => ({
      b: rays(0, 0, 10, 28, 16, '#fff', 1.4, .5) + heart(-18, -13, .32, '#E0457B') + heart(20, 12, .26, '#E0457B'),
      f: sh(0, 17, 17, 2.2) + p('M-4.6 -14 L16 -18 V-12 L-4.6 -8Z', '#7A3FA0') + rr(-4.6, -13, 2.6, 23, 1, '#6A3590') + rr(13.4, -17, 2.6, 23, 1, '#6A3590') +
        egg(-9, 10, 6, 4.6, '#7A3FA0', -20) + egg(9, 6, 6, 4.6, '#7A3FA0', -20) + hl(-11, 8.4, 1.8, 1, -20, .5) + hl(7, 4.4, 1.8, 1, -20, .5) + note(-19, 4, .7, '#B06AD0') + note(20, -8, .6, '#B06AD0')
    }) });

  L({ n: 37, nombre: 'Hageo', g: 'men', cap: 2, sub: 'Manos a la obra',
    cita: 'Trabajad; porque yo estoy con vosotros, dice Jehová de los ejércitos.', ref: 'Hageo 2:4',
    dato: 'Tiene solo 2 capítulos, y anima al pueblo a terminar de construir el templo de Dios.',
    iso: 'Troncos de madera y un martillo: “subid al monte, traed madera y reedificad la casa”.',
    cielo: DIA,
    esc: () => {
      const tronco = (x, y, len) => rr(x, y, len, 6.4, 3.2, '#B9814A') + egg(N(x + len - 2.6), N(y + 3.2), 2.4, 3.1, '#E6C08A') + s(`M${N(x + len - 2.6)} ${N(y + 1.8)} a1.2 1.5 0 1 0 .1 0`, '#B9814A', .4) + s(`M${x + 4} ${N(y + 2)} h${N(len * .4)}`, '#8A5A2B', .5, .5);
      return {
        b: cloud(-16, -16, .55) + ground(16, '#C9B08A'),
        f: sh(0, 20, 23, 2.4) + tronco(-19, 12.6, 38) + tronco(-17, 6.2, 34) + tronco(-14, -.2, 28) +
          g('translate(4 -17) rotate(38)', rr(-1.7, -1, 3.4, 20, 1.6, '#C98A4B') + rr(-7.5, -6.4, 15, 6.8, 1.6, '#8A9096'))
      };
    } });

  L({ n: 38, nombre: 'Zacarías', g: 'men', cap: 14, sub: 'Viene el Rey',
    cita: 'No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos.', ref: 'Zacarías 4:6',
    dato: 'Zacarías anunció que el Rey llegaría montado en un asno (Zac 9:9)… ¡y así entró Jesús a Jerusalén!',
    iso: 'Un burrito con manto real: el Rey humilde viene montado en un asno.',
    cielo: DIA,
    esc: () => ({
      b: cloud(-17, -15, .55) + ground(13, '#9CCB6A') + p('M-27 14 C-22 6 -16 6 -12 10 C-18 9 -23 11 -27 14Z', '#4FA36B'),
      f: sh(0, 18, 19, 2.4) + s('M-14 2 Q-19 6 -17 12', '#6F6F7A', 1.4) + [-10, -5, 3, 7].map(x => rr(x, 8, 3, 9.4, 1.5, '#85858F')).join('') +
        p('M6 2 L10 -8 L15 -6 L12 6Z', '#9A9AA6') + egg(-2, 4, 12, 7.5, '#9A9AA6') + p('M-8 -3.4 H4 V6.5 H-8Z', '#C0392B') + s('M-8 6.5 H4', '#F2C230', 1) +
        p('M10 -12 L9 -22 L13 -13Z', '#85858F') + p('M13 -13 L15.4 -22 L16.4 -12Z', '#85858F') + egg(14, -9, 6, 4.4, '#9A9AA6', 20) + egg(18, -7, 3.4, 3, '#E9E4DA', 20) +
        eye(14, -10.4, 1) + s('M10 -10 L8 -3', '#5F5F69', 1.4) + ci(19.4, -7, .5, '#5F5F69')
    }) });

  L({ n: 39, nombre: 'Malaquías', g: 'men', cap: 4, sub: 'Sol de justicia',
    cita: 'Mas a vosotros los que teméis mi nombre, nacerá el Sol de justicia, y en sus alas traerá salvación.', ref: 'Malaquías 4:2',
    dato: 'Después de Malaquías pasaron unos 400 años hasta los días del Nuevo Testamento.',
    iso: 'El Sol de justicia saliendo con alas de luz.',
    cielo: ['#5B8FD0', '#F9C98A', '#FFE9B0'],
    esc: () => {
      const ala = g('translate(-10 8) rotate(-6)', alaP('#FFF3C4', .72));
      return {
        b: rays(0, 9, 14, 30, 14, '#FFD45E', 1.8, .8),
        f: ala + mx(ala) + ball(0, 9, 12, '#FFC93C'),
        t: ground(17, '#6DBE5A')
      };
    } });
})();
