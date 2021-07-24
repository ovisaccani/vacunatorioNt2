import Vue from "vue";
import VueRouter from "vue-router";
import ListadoSolicitudes from "./components/ListadoSolicitudes.vue";
import PacienteForm from "./components/PacienteForm/PacienteForm.vue";
import CancelarTurno from "./components/CancelarTurno.vue";
import  AsignarTurno from "./components/AsignarTurno.vue"
import  ModificarEstado from "./components/ModificarEstado.vue"
Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: ListadoSolicitudes },
    { path: "/pedirTurno", component: PacienteForm },
    { path: "/cancelarTurno", component: CancelarTurno },
    { path: "/asignarTurno", component: AsignarTurno },
    { path: "/modificarEstado", component: ModificarEstado },
    
  ],
});
