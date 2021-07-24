import Vue from "vue";

Vue.filter("formteoFecha", function(value) {
  const dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (dateFormat.test(value)) {
  let result = value.split("-");
  return `${result[2]}/${result[1]}/${result[0]}`;
  }
  return value
});
Vue.filter("formateoEstado", function(value) {
  let result;
  switch (value) {
    case "CONFIRMACION_PENDIENTE":
      result = "Turno pendiente";
      break;
    case "CONFIRMADO_PRIMERA_DOSIS":
      result = "Primera dosis aplicada";
      break;
    case "TURNO_CONFIRMADO":
      result = "Turno confirmado";
      break;
    case "CONFIRMADO_SEGUNDA_DOSIS":
      result = "Segunda dosis aplicada";
      break;
  }
  return result;
});
