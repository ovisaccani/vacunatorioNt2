<template>
  <section class="src-components-turno-form">
    <label for="selectVacuna">Vacuna</label>
    <select
      name="selectVacuna"
      class="form-select"
      v-model="vacunaSeleccionada"
      :required="true"
    >
      <option value="" disabled :selected="vacunaSeleccionada">
        Seleccione una vacuna
      </option>
      <option v-for="(vacuna, index) in vacunas" :key="index" :value="vacuna">
        {{ vacuna }}
      </option>
    </select>
    <br />
    <vue-form :state="formState" @submit.prevent="enviar()">
      <validate tag="div" class="pt-2">
        <label for="fecha">Fecha</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          class="form-control"
          v-model="fecha"
          required
          autocomplete="off"
          :min="fechaMin"
          :max="fechaMax"
        />
        <field-messages name="fecha" show="$dirty">
          <div slot="min" class="alert alert-danger mt-2">
            La fecha minima es {{ fechaMin }}
          </div>
        </field-messages>
        <field-messages name="fecha" show="$dirty">
          <div slot="max" class="alert alert-danger mt-2">
            La fecha minima es {{ fechaMax }}
          </div>
        </field-messages>
        <field-messages name="fecha" show="$dirty">
          <div slot="required" class="alert alert-danger mt-2">
            Fecha Requerida
          </div>
        </field-messages>
      </validate>
      <br />
      <validate tag="div" class="pt-2">
        <label for="lugar">Lugar de vacunación</label>
        <input
          type="text"
          id="lugar"
          name="lugar"
          class="form-control"
          placeholder="Ingrese el lugar de Vacunación"
          v-model.trim="lugar"
          required
          autocomplete="off"
        />
        <field-messages name="lugar" show="$dirty">
          <div slot="required" class="alert alert-danger mt-2">
            Lugar de vacunación requerido
          </div>
        </field-messages>
      </validate>
      <br />
      <button class="btn btn-dark mt-3 me-3 mb-3" type="submit">Enviar</button>
    </vue-form>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-turno-form',
    props: ["seleccionado"],
    
    mounted () {
        this.datos=this.seleccionado
    },
    data () {
      return {
        vacunas:["sputnik-v", "covishield", "sinopharm"],
        vacunaSeleccionada:"",
        formState: {},
        fechaMin:this.obtenerFechaActual(),
        fechaMax:"2025-01-01",
        datosFilter:{},
        lugar:"",
        datos:{},
        fecha:"",
        
      }
    },
    
    methods: {
formReset(){
        this.datos={}
        this.vacunaSeleccionada=""
        this.lugar=""
        this.fecha=""
      },
        enviar(){
        if (this.formState.$valid && !this.vacunaSeleccionada =="") {
        this.datos = this.getSeleccionado  
        this.datos.fecha=this.fecha
        this.datos.tipoVacuna=this.vacunaSeleccionada
        this.datos.estado ="TURNO_CONFIRMADO"
        this.datos.lugarVac=this.lugar
        this.$store.dispatch("asignarTurno",this.datos)
        this.$emit('resetSeleccionado', {})
        this.formReset()
        }else{
          console.log("campos erroneos"
          )
        }
        },
        obtenerFechaActual(){
          const fecha= new Date()
            const formatoMap = {
             dd: fecha.getDate()<10? `0${fecha.getDate()}`:`${fecha.getDate()}`,
             mm: fecha.getMonth()<10 ? `0${fecha.getMonth() + 1}`:`${fecha.getMonth() + 1}`,
             yyyy: `${fecha.getFullYear()}`
        }
      return  `${formatoMap.yyyy}-${formatoMap.mm}-${formatoMap.dd}`
        }

    },
    computed: {
      getSeleccionado(){
        return this.seleccionado
      }

    }
}
</script>

<style scoped lang="css">
.src-components-turno-form {
}
</style>
