# Biblioteca Bíblica 3D

Recurso **gratuito** para apoyar al ministerio infantil: los **66 libros de la Biblia** para ver en 3D, imprimir en opalina, recortar, doblar y armar con pestañas, hasta formar una biblioteca bíblica de verdad.

Cada libro tiene:

- un **dibujo propio** (isotipo) con volumen y sombras, relacionado con su historia;
- una **cita bíblica** (Reina-Valera 1960);
- un **dato curioso** para los niños;
- una **plantilla para armar** con pestañas: portada, contraportada, lomo, canto de hojas y tapas de arriba y abajo, en una hoja carta horizontal.

## Qué trae la página

| Página | Para qué sirve |
|---|---|
| `index.html` | La biblioteca: un librero con los 66 lomos por sección. Se puede buscar y filtrar. |
| `libro.html?n=27` | Visor 3D de cada libro (se gira con el dedo o el mouse), con su cita, su dato curioso y el botón para imprimirlo. |
| `imprimir.html` | Imprime todos los libros, una sección, un rango o un solo libro, en hojas tamaño carta. |
| `catalogo.html` | Catálogo con los 66 libros en 3D (frente y vuelta), listo para imprimir o guardar en PDF. |
| `sopas.html` | 6 sopas de letras (11 libros seguidos en cada una) y sus 6 hojas de respuestas. |
| `loteria.html` | Lotería bíblica: 66 cartas para cantar y 8 tablas de 16 libros. |
| `descargas/biblioteca-biblica-3d-armable.pdf` | Las 66 plantillas para armar con pestañas más la hoja de instrucciones (67 hojas). |
| `descargas/biblioteca-biblica-3d-hojas.pdf` | Piezas sueltas para pegar sobre bloques de madera (50 hojas + instrucciones). |
| `descargas/sopas-de-letras-66-libros.pdf` | Las 6 sopas de letras y sus respuestas (12 hojas). |
| `descargas/loteria-biblica-cartas.pdf` y `loteria-biblica-tablas.pdf` | La lotería: instrucciones y cartas (12 hojas) y tablas (8 hojas). |

## Cómo imprimir y armar

1. Imprime en **opalina carta de 180–225 g**, en **horizontal**, escala **100 % (tamaño real)**, márgenes **ninguno** y con **gráficos de fondo** activados. Cada hoja trae una regla de 5 cm para comprobar la escala.
2. Recorta por la **línea continua**, con todo y las pestañas grises.
3. Dobla hacia adentro por las **líneas punteadas** (repasarlas antes con una pluma sin tinta ayuda).
4. Pega la pestaña larga del lomo por dentro de la contraportada; luego dobla las pestañas de arriba y de abajo y cierra las tapas sobre ellas.

Cada libro armado mide **10 × 13 × 3 cm**.

| Opción | Hojas para los 66 libros |
|---|---|
| Para armar con pestañas (opalina) | 66 hojas (+1 de instrucciones) |
| Piezas sueltas para madera, ahorrando papel | 50 hojas (+1 de instrucciones) |
| Piezas sueltas para madera: portada, contraportada y lomo | 39 hojas (+1 de instrucciones) |

## Publicarlo en GitHub Pages

Es un sitio estático: no necesita servidor ni instalación.

1. Sube esta carpeta a un repositorio de GitHub.
2. En el repositorio entra a **Settings → Pages**, elige **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`.
3. En unos minutos el sitio queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

Para verlo en tu computadora sin internet, abre una terminal en esta carpeta y ejecuta `python -m http.server`; luego entra a `http://localhost:8000`. (La letra Fredoka se descarga de Google Fonts; sin internet se usa una letra parecida.)

## Cómo está hecho

Todo se dibuja con **SVG en el navegador**, sin imágenes, así que se imprime nítido a cualquier tamaño.

```
js/arte.js        utilidades de dibujo con volumen (esferas, degradados, alas, nubes…)
js/piezas.js      secciones, colores y las 5 piezas de cada libro en milímetros reales
js/libros-at.js   los 39 libros del Antiguo Testamento (datos, cita, dato curioso y dibujo)
js/libros-nt.js   los 27 libros del Nuevo Testamento
js/vistas.js      vista 3D vectorial y hojas carta para imprimir
css/estilos.css   estilos del sitio, del librero, del visor y de impresión
```

Para corregir una cita o un dato curioso, edita el libro en `js/libros-at.js` o `js/libros-nt.js`. Los textos se acomodan solos en la contraportada.

## Licencia y créditos

- Dibujos, textos y código: [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Puedes usarlo, imprimirlo, compartirlo y adaptarlo en tu iglesia o escuela **sin costo**, dando crédito y **sin venderlo**.
- Citas bíblicas: Reina-Valera © 1960 Sociedades Bíblicas en América Latina; © renovado 1988 Sociedades Bíblicas Unidas. Utilizado con permiso.
- Letras: [Fredoka](https://fonts.google.com/specimen/Fredoka) y [Nunito](https://fonts.google.com/specimen/Nunito), licencia SIL Open Font License.
