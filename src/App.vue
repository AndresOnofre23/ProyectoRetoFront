<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login"  v-if="!estaActivo">Login</router-link> |
      <a @click="cerrarSesion()"  v-if="estaActivo">Cerrar Sesion</a> |
      <router-link to="/notas" v-if="estaActivo">Notas</router-link>
    </div> -->
    <div>
      <b-navbar toggleable="md" type="dark" variant="info" v-if="estaActivo">
        <b-navbar-brand href="#">Reto</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" v-if="!estaActivo">Login</b-nav-item>
            <b-nav-item to="/usuarios" v-if="estaActivo">Usuarios</b-nav-item>
          </b-navbar-nav>

          
          <b-navbar-nav>
            <b-nav-item-dropdown right v-if="estaActivo">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="cerrarSesion()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from './views/Login.vue';
export default {
  components: { Login },
  methods:{
    ...mapActions(['cerrarSesion', 'leerToken'])
  },
  computed:{
    ...mapGetters(['estaActivo'])
  },
  created(){
    this.leerToken();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
