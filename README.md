# Biblioteca Bíblica 3D

Recurso **gratuito** para apoyar al ministerio infantil: los **66 libros de la Biblia** para ver en 3D, imprimir y pegar sobre bloques de madera, hasta formar una biblioteca bíblica de verdad.

Cada libro tiene:

- un **dibujo propio** (isotipo) con volumen y sombras, relacionado con su historia;
- una **cita bíblica** (Reina-Valera 1960);
- un **dato curioso** para los niños;
- cinco piezas para armar: **portada (A)**, **contraportada (B)**, **lomo (C)**, **canto de hojas (D)** y **tapa (E)**.

## Qué trae la página

| Página | Para qué sirve |
|---|---|
| `index.html` | La biblioteca: un librero con los 66 lomos por sección. Se puede buscar y filtrar. |
| `libro.html?n=27` | Visor 3D de cada libro (se gira con el dedo o el mouse), con su cita, su dato curioso y el botón para imprimirlo. |
| `imprimir.html` | Imprime todos los libros, una sección, un rango o un solo libro, en hojas tamaño carta. |
| `catalogo.html` | Catálogo con los 66 libros en 3D (frente y vuelta), listo para imprimir o guardar en PDF. |
| `descargas/biblioteca-biblica-3d-hojas.pdf` | Las 50 hojas del juego completo más la hoja de instrucciones, en PDF. |

## Cómo imprimir y armar

1. Imprime en hojas **carta**, escala **100 % (tamaño real)**, márgenes **ninguno** y con **gráficos de fondo** activados. La hoja de instrucciones trae una regla de 5 cm para comprobar la escala.
2. Usa **papel bond de 90–120 g** o **papel adhesivo imprimible**.
3. Recorta por la **línea punteada**. La pestaña gris solo indica la pieza (A–E) y se recorta.
4. Pega sobre un **bloque de madera de 10 × 13 × 3 cm**: A al frente, B atrás, C a la izquierda, D a la derecha y E arriba.

| Opción | Hojas para los 66 libros |
|---|---|
| Juego completo (A, B, C, D y E) | 50 hojas (+1 de instrucciones) |
| Solo portada, contraportada y lomo | 39 hojas (+1 de instrucciones) |
| Un libro por hoja, con instrucciones | 1 hoja por libro |

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
