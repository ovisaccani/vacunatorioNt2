import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "src-components-login-form",
  components: {},
  props: [],
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getInicialData() {
      return {
        email: "",
        password: "",
      };
    },
    async login() {
      try {
        const res = await firebase.default
          .auth()
          .signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          );
        console.log(res);
        this.$store.dispatch("logInChange", true);
        this.formData = this.getInicialData();
        this.formState._reset();
        this.$router.currentRoute.path == "/"
          ? this.$router.go()
          : this.$router.push({ path: "/" });
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
