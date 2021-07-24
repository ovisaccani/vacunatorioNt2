import Vue from "vue";
import App from "./App.vue";
import store from "./store.js";
import firebase from "firebase/app";
import { router } from "./routes";
import "./httpClient";
import "./form";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './globalMixins'
import './globalFilters'

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBNXr8g5uYIdLv_UtMRJINxJFLJIHoeK6E",
  authDomain: "fir-authtest-8c480.firebaseapp.com",
  projectId: "fir-authtest-8c480",
  storageBucket: "fir-authtest-8c480.appspot.com",
  messagingSenderId: "668304822825",
  appId: "1:668304822825:web:a737f23eb9af062ee6c238",
  measurementId: "G-K1PSZFFFXE",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
