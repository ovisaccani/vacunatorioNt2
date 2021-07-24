<template>
  <section class="src-components-asignar-turno">
    <div v-if="getSolcitudesPorEstado.length">
      <div class="container-fluid mt-3">
        <h3 align="center">Solicitudes pendientes</h3>
        <label for="solicitud">solicitudes</label>
        <select
          name="solicitud"
          class="form-select"
          v-model="seleccionado"
          :required="true"
        >
          <option :value="{}" disabled :selected="seleccionado">
            Seleccione una solicitud
          </option>
          <option
            v-for="(solicitud, index) in getSolcitudesPorEstado"
            :key="index"
            :value="solicitud"
          >
            {{ solicitud.nombre }}
          </option>
        </select>
        <hr />
        <div v-if="estaSeleccionado">
          <TurnoForm
            :seleccionado="seleccionado"
            @resetSeleccionado="resetSeleccionado($event)"
          />
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning mt-2">
      No hay solicitudes pendientes
    </div>
    <div v-if="ingresado" class="alert alert-warning mt-2">
      {{ `Solicitud ${datosFilter.nombre} actualizada, fecha: `
      }}{{ datosFilter.fecha | formteoFecha }}
    </div>
  </section>
</template>

<script lang="js">
  import TurnoForm from "./TurnoForm.vue"
  export default  {
    name: 'src-components-asignar-turno',
    props: [],
    components: {
    TurnoForm
  },
  async mounted () {
    await this.$store.dispatch('getSolicitudesPorEstado',"CONFIRMACION_PENDIENTE")
    },
    data () {
      return {
        ingresado:false,
        seleccionado:{},
      }

    },
    methods: {
     resetSeleccionado(select){
        this.seleccionado= select
      }
    },
    computed: {
      estaSeleccionado(){
       return this.seleccionado?.nombre
        },
     
    }
}
</script>

<style scoped lang="css">
.src-components-asignar-turno {
}
</style>