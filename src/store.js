import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const urlRecursos =
  "https://60d3a13361160900173c97f3.mockapi.io/solicitudes/solicitudes";

export default new Vuex.Store({
  state: {
    isLogged: false,
    solicitudes: [],
    solicitudBuscada: {},
    encontreSolicitud: false,
    solicitudesPorEstado: [],
  },
  actions: {
    async asignarTurno({ commit }, paciente) {
      await axios.put(`${urlRecursos}/${paciente.id}`, paciente);
      commit("asignarTurno", paciente);
    },

    async getSolicitudesPorEstado({ commit }, estado) {
      const res = await axios(`${urlRecursos}/?estado=${estado}`);
      commit("getSolicitudPorEstado", res.data);
    },
    logInChange({ commit }, value) {
      commit("changeLogInStatus", value);
    },
    async getSolicitudes({ commit }) {
      try {
        const respuesta = await axios(urlRecursos);
        const solicitudes = respuesta.data;
        commit("getSolicitudes", solicitudes);
      } catch (err) {
        console.error("ERROR en AXIOS: ", err.message);
      }
    },
    async postSolicitud({ commit }, value) {
      try {
        await axios.post(urlRecursos, value, {
          "content-type": "application/json",
        });
        commit("postSolicitud", value);
      } catch (err) {
        console.error("ERROR POSTEANDO SOLICITUD", err.message);
      }
    },
    async getSolicitudDni({ commit }, value) {
      try {
        const res = await axios(`${urlRecursos}/?dni=${value}`);
        const solicitud = {
          data: res.data[0],
          status: res.data[0] !== undefined,
        };
        commit("getSolicitudDni", solicitud);
      } catch (err) {
        console.error("ERROR BUSCANDO SOLICITUD", err.message);
      }
    },
    async deleteSolicitud({ commit }, value) {
      try {
        await axios.delete(`${urlRecursos}/${value.id}`);
        const idx = this.state.solicitudes.findIndex((x) => x.id === value.id);
        commit("deleteSolicitud", idx);
      } catch (err) {
        console.error("ERROR ELIMINANDO SOLICITUD", err.message);
      }
    },
    async modificarEstado({ commit }, solicitud) {
      await axios.put(`${urlRecursos}/${solicitud.id}`, solicitud);
      const idx = this.state.solicitudes.indexOf(solicitud);
      commit("modificarEstado", solicitud, idx);
    },
  },
  mutations: {
    changeLogInStatus(state, value) {
      state.isLogged = value;
    },
    getSolicitudes(state, value) {
      state.solicitudes = value;
    },
    postSolicitud(state, value) {
      state.solicitudes.push(value);
    },
    getSolicitudDni(state, value) {
      state.solicitudBuscada = value.data;
      state.encontreSolicitud = value.status;
    },
    deleteSolicitud(state, idx) {
      state.solicitudBuscada = {};
      state.encontreSolicitud = false;
      state.solicitudes.splice(idx, 1);
    },
    getSolicitudPorEstado(state, result) {
      state.solicitudesPorEstado = result;
    },
    asignarTurno(state, valor) {
      let encontrado = null;
      let i = 0;
      while (i < state.solicitudesPorEstado.length && encontrado == null) {
        if (state.solicitudesPorEstado[i].id == valor.id) {
          encontrado = i;
          i++;
        } else {
          i++;
        }
      }
      state.solicitudesPorEstado.splice(encontrado, 1);
    },
    modificarEstado(state, valor, idx) {
      state.solicitudes[idx] = valor;
    },
  },
});
