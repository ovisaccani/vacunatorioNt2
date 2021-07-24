import Vue from 'vue'

var miMixinGlobal = {
    computed: {
        getIsLogged() {
            return this.$store.state.isLogged
        },
        getSolcitudesPorEstado(){
            return this.$store.state.solicitudesPorEstado
        },
        getSolicitudes() {
            return this.$store.state.solicitudes
        }
    }
}

Vue.mixin(miMixinGlobal)