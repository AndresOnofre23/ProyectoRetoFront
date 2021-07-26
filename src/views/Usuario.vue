<template>
  <div class="container">
    <h1>Usuarios</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      {{mensaje.texto}}
    </b-alert>


    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Correo</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
          <th scope="row">{{item._id}}</th>
          <td>{{item.nombre}}</td>
          <td>{{item.email}}</td>
          <td>
            <!-- <b-button @click="alerta()">Acción</b-button> -->
            <b-button  
              class="btn-danger btn-sm mx-2">Eliminar
            </b-button>
            <b-button 
              class="btn-warning btn-sm">Editar
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      usuarios: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: {color: '', texto: ''},
      usuario: {nombre: '', email: ''},
      editar: false,
      userEditar: {}
    }
  },
  created(){
    this.listarUsers();
  },
  methods: {
    alerta(){
      this.mensaje.color = 'danger';
      this.mensaje.texto = 'Probando alerta';
      this.showAlert();
    },
    listarUsers(){
      this.axios.get('/usuarios')
        .then(res => {
          console.log(res.data);
          this.usuarios = res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
   
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    eliminarNota(id){
      console.log(id);
    },
    activarEdicion(){
      console.log(id);
    }

  }
}
</script>