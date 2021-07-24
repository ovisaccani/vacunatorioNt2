<template>
  <div class="jumbotron p-3">
    <h2>Cancela tu turno</h2>
    <hr />

    <!-- Cambiar @submit.prevent segun envarThenCatch o enviarAsync -->
    <div class="container-fluid">
      <vue-form
        :state="formState"
        novalidate
        @submit.prevent="buscarSolicitud()"
      >
        <!-- Dni -->
        <validate tag="div" class="pt-2">
          <label for="dni">Dni</label>
          <input
            type="number"
            id="dni"
            name="dni"
            class="form-control"
            required
            v-model.number="formData.dni"
            placeholder="Ingrese su dni"
            autocomplete="off"
          />
          <field-messages name="edad" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">
              Dni requerido
            </div>
          </field-messages>
        </validate>

        <button class="btn btn-dark mt-3 me-3" type="submit">Enviar</button>
      </vue-form>
      <br>
      <table class="table" v-if="encontreSolicitud">
        <thead>
          <tr class="bg-dark text-white">
            <th scope="col">Nombre</th>
            <th scope="col">Dni</th>
            <th scope="col">Edad</th>
            <th scope="col">Tipo de vacuna</th>
            <th scope="col">Lugar de vacunacion</th>
            <th scope="col">Fecha de turno</th>
            <th scope="col">Estado</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ solicitudBuscada.nombre }}</td>
            <td>{{ solicitudBuscada.dni }}</td>
            <td>{{ solicitudBuscada.edad }}</td>
            <td>{{ solicitudBuscada.tipoVacuna }}</td>
            <td>{{ solicitudBuscada.lugarVac }}</td>
            <td>{{ solicitudBuscada.fecha | formteoFecha }}</td>
            <td>{{  solicitudBuscada.estado | formateoEstado }}</td>
            <td>
              <button class="btn btn-danger" @click="borrarSolicitud()">
                Borrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-show="!encontreSolicitud" class="alert alert-warning mt-3">
        Esperando personas
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="js">

  export default  {
    name: 'src-components-cancelar-turno',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData: this.getInicialData(),
        formState: {},
        solicitud:{},
      }
    },
    methods: {
      getInicialData() {
        return {
         dni: "",
        }
      },
      buscarSolicitud() {
        if (this.formState.$valid) {
         this.$store.dispatch('getSolicitudDni', this.formData.dni)
         this.formData = this.getInicialData();
         this.formState._reset();
        } else {
         alert("Datos invalidos");
        }
      },
      borrarSolicitud(){
        this.$store.dispatch('deleteSolicitud', this.solicitudBuscada)
      }
    },
    computed: {
      solicitudBuscada(){
        return this.$store.state.solicitudBuscada
      },
      encontreSolicitud(){
        return this.$store.state.encontreSolicitud
      }
    }
}


</script>

<style scoped lang="css">
.src-components-cancelar-turno {
}
</style>
