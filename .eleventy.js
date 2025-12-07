/**
 * Configuración de Eleventy para el blog Rogoyin.
 *
 */

module.exports = function(Configuracion_Eleventy) {

  // Copiar archivos estáticos sin procesar.
  Configuracion_Eleventy.addPassthroughCopy("src/Estilos");
  Configuracion_Eleventy.addPassthroughCopy("src/Scripts");
  Configuracion_Eleventy.addPassthroughCopy("src/Imagenes");
  Configuracion_Eleventy.addPassthroughCopy("src/admin");

  // Filtro para formatear fechas en español.
  Configuracion_Eleventy.addFilter("date", function(Fecha, Formato) {
    const Meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const Fecha_Objeto = new Date(Fecha);

    if (Formato === "%Y-%m-%d") {
      const Anio = Fecha_Objeto.getFullYear();
      const Mes = String(Fecha_Objeto.getMonth() + 1).padStart(2, "0");
      const Dia = String(Fecha_Objeto.getDate()).padStart(2, "0");
      return `${Anio}-${Mes}-${Dia}`;
    }

    if (Formato === "%d de %B, %Y") {
      const Dia = Fecha_Objeto.getDate();
      const Mes = Meses[Fecha_Objeto.getMonth()];
      const Anio = Fecha_Objeto.getFullYear();
      return `${Dia} de ${Mes}, ${Anio}`;
    }

    if (Formato === "%Y") {
      return Fecha_Objeto.getFullYear().toString();
    }

    return Fecha_Objeto.toLocaleDateString("es-AR");
  });

  // Filtro para convertir texto a slug.
  Configuracion_Eleventy.addFilter("slugify", function(Texto) {
    return Texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  // Filtro para rechazar elementos de una colección.
  Configuracion_Eleventy.addFilter("reject", function(Coleccion, Clave, Valor) {
    return Coleccion.filter(function(Item) {
      const Valor_Item = Clave.split(".").reduce(function(Objeto, K) {
        return Objeto ? Objeto[K] : undefined;
      }, Item);
      return Valor_Item !== Valor;
    });
  });

  // Filtro para obtener los primeros N elementos.
  Configuracion_Eleventy.addFilter("slice", function(Coleccion, Inicio, Fin) {
    return Coleccion.slice(Inicio, Fin);
  });

  // Configuración de directorios.
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };

};
