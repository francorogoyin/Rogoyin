/* ============================================================
   ROGOYIN - Blog Personal
   JavaScript principal del sitio.
   ============================================================ */

/* ------------------------------------------------------------
   Inicialización cuando el DOM está listo.
   ------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', function() {

  Inicializar_Tema();
  Inicializar_Header_Inteligente();
  Inicializar_Filtrado_Categorias();
  Inicializar_Boton_Ir_Arriba();

});

/* ------------------------------------------------------------
   1. Toggle de tema claro/oscuro.
   Guarda la preferencia en localStorage para persistir.
   ------------------------------------------------------------ */

function Inicializar_Tema() {

  const Boton_Tema = document.getElementById('Boton_Tema');

  if (!Boton_Tema) return;

  /* Cargar tema guardado o usar claro por defecto. */
  const Tema_Guardado = localStorage.getItem('tema');

  if (Tema_Guardado === 'oscuro') {
    document.documentElement.setAttribute('data-tema', 'oscuro');
    Boton_Tema.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-tema', 'claro');
    Boton_Tema.textContent = '🌙';
  }

  /* Evento click para cambiar tema. */
  Boton_Tema.addEventListener('click', function() {

    const Tema_Actual = document.documentElement
      .getAttribute('data-tema');

    if (Tema_Actual === 'oscuro') {
      document.documentElement.setAttribute('data-tema', 'claro');
      localStorage.setItem('tema', 'claro');
      Boton_Tema.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-tema', 'oscuro');
      localStorage.setItem('tema', 'oscuro');
      Boton_Tema.textContent = '☀️';
    }

  });

}

/* ------------------------------------------------------------
   2. Header inteligente.
   Desaparece al scrollear hacia abajo, reaparece al subir.
   ------------------------------------------------------------ */

function Inicializar_Header_Inteligente() {

  const Header = document.getElementById('Header_Principal');

  if (!Header) return;

  let Posicion_Scroll_Anterior = 0;
  const Umbral_Scroll = 50;

  window.addEventListener('scroll', function() {

    const Posicion_Scroll_Actual = window.pageYOffset;

    /* Evitar cambios mínimos por rebote. */
    if (Math.abs(Posicion_Scroll_Actual - Posicion_Scroll_Anterior)
        < 10) {
      return;
    }

    /* Si está arriba de todo, siempre mostrar. */
    if (Posicion_Scroll_Actual < Umbral_Scroll) {
      Header.classList.remove('Header_Oculto');
      Posicion_Scroll_Anterior = Posicion_Scroll_Actual;
      return;
    }

    /* Scrolleando hacia abajo: ocultar. */
    if (Posicion_Scroll_Actual > Posicion_Scroll_Anterior) {
      Header.classList.add('Header_Oculto');
    }
    /* Scrolleando hacia arriba: mostrar. */
    else {
      Header.classList.remove('Header_Oculto');
    }

    Posicion_Scroll_Anterior = Posicion_Scroll_Actual;

  });

}

/* ------------------------------------------------------------
   3. Filtrado por categorías.
   Muestra/oculta tarjetas según la categoría seleccionada.
   ------------------------------------------------------------ */

function Inicializar_Filtrado_Categorias() {

  const Enlaces_Categoria = document
    .querySelectorAll('.Nav_Enlace[data-categoria]');
  const Tarjetas = document.querySelectorAll('.Tarjeta');

  if (Enlaces_Categoria.length === 0 || Tarjetas.length === 0) return;

  Enlaces_Categoria.forEach(function(Enlace) {

    Enlace.addEventListener('click', function(Evento) {

      Evento.preventDefault();

      const Categoria_Seleccionada = this
        .getAttribute('data-categoria');

      /* Actualizar clase activa en navegación. */
      Enlaces_Categoria.forEach(function(E) {
        E.classList.remove('Nav_Enlace_Activo');
      });
      this.classList.add('Nav_Enlace_Activo');

      /* Filtrar tarjetas. */
      Tarjetas.forEach(function(Tarjeta) {

        const Categoria_Tarjeta = Tarjeta
          .getAttribute('data-categoria');

        if (Categoria_Seleccionada === 'todos'
            || Categoria_Tarjeta === Categoria_Seleccionada) {
          Tarjeta.classList.remove('Tarjeta_Oculta');
        } else {
          Tarjeta.classList.add('Tarjeta_Oculta');
        }

      });

    });

  });

}

/* ------------------------------------------------------------
   4. Botón ir al inicio con función deshacer.
   Aparece al scrollear, guarda posición para volver.
   ------------------------------------------------------------ */

function Inicializar_Boton_Ir_Arriba() {

  const Boton_Ir_Arriba = document.getElementById('Boton_Ir_Arriba');
  const Boton_Deshacer = document.getElementById('Boton_Deshacer');

  /* Si no existen los botones, estamos en index. */
  if (!Boton_Ir_Arriba) return;

  let Posicion_Guardada = null;
  const Umbral_Mostrar_Boton = 300;

  /* Mostrar/ocultar botón según posición de scroll. */
  window.addEventListener('scroll', function() {

    if (window.pageYOffset > Umbral_Mostrar_Boton) {
      Boton_Ir_Arriba.classList.add('Boton_Visible');
    } else {
      Boton_Ir_Arriba.classList.remove('Boton_Visible');
      /* Si estamos arriba, ocultar también botón deshacer. */
      if (Boton_Deshacer) {
        Boton_Deshacer.classList.remove('Boton_Visible');
      }
    }

  });

  /* Click en botón ir arriba. */
  Boton_Ir_Arriba.addEventListener('click', function() {

    /* Guardar posición actual antes de ir arriba. */
    Posicion_Guardada = window.pageYOffset;

    /* Ir al inicio. */
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    /* Mostrar botón deshacer después de un momento. */
    if (Boton_Deshacer) {
      setTimeout(function() {
        Boton_Deshacer.classList.add('Boton_Visible');
      }, 500);
    }

  });

  /* Click en botón deshacer (volver a posición anterior). */
  if (Boton_Deshacer) {

    Boton_Deshacer.addEventListener('click', function() {

      if (Posicion_Guardada !== null) {

        window.scrollTo({
          top: Posicion_Guardada,
          behavior: 'smooth'
        });

        /* Ocultar botón deshacer. */
        Boton_Deshacer.classList.remove('Boton_Visible');
        Posicion_Guardada = null;

      }

    });

  }

}
