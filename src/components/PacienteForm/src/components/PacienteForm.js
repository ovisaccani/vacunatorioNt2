export default {
  name: "src-components-paciente-form",
  components: {},
  props: [],
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      nombreLengthMin: 5,
      nombreLengthMax: 15,
      edadMin: 18,
      edadMax: 120,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getInicialData() {
      return {
        nombre: "",
        edad: "",
        email: "",
        dni: "",
        lugarVac: "Pendiente",
        tipoVacuna: "Pendiente",
        fecha: "Pendiente",
        estado: "CONFIRMACION_PENDIENTE",
      };
    },

    enviar() {
      if (this.formState.$valid) {
        this.$store.dispatch("postSolicitud", this.formData);
        this.formData = this.getInicialData();
        this.formState._reset();
      } else {
        alert("Datos invalidos");
      }
    },
  },
};
