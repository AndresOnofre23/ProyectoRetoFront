<template >
  <div class="cuerpo">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3 v-if="!agregar">Login</h3>
            <h3 v-if="agregar">Crear Cuenta</h3>
          </div>
          <div class="card-body">
            <div v-if="!agregar">
              <form @submit.prevent="login">
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><i class="fas fa-user"></i
                    ></span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="username"
                    v-model="usuario.email"
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><i class="fas fa-key"></i
                    ></span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="password"
                    v-model="usuario.pass"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="Acceder"
                    class="btn float-right login_btn"
                  />
                </div>
              </form>
              <div v-if="mensaje != ''">
                <p>{{ mensaje }}</p>
              </div>
              <div class="card-footer">
                <button @click="activarCrear">Crear Usuario</button>
              </div>
            </div>

            <form @submit.prevent="agregarUser" v-if="agregar">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                  v-model="userNew.nombre"
                />
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Correo"
                  v-model="userNew.email"
                />
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="fas fa-key"></i
                  ></span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="password"
                  v-model="userNew.pass"
                />
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  value="Guardar"
                  class="btn float-right login_btn"
                />
              </div>
              <div class="card-footer">
                <button @click="activarCrear">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      usuario: { email: "", pass: "" },
      userNew: { email: "", pass: "" },
      mensaje: "",
      agregar: false,
      users: [],
    };
  },
  methods: {
    ...mapActions(["guardarUsuario"]),
    login() {
      // console.log(this.usuario);
      this.axios
        .post("/login", this.usuario)
        .then((res) => {
          console.log(res.data);
          const token = res.data.token;
          this.guardarUsuario(token);
        })
        .catch((e) => {
          console.log(e.response);
          this.mensaje = e.response.data.mensaje;
        });
    },
    activarCrear() {
      if(this.agregar){
        this.agregar = false;
      }
      this.agregar = true;
    },
    agregarUser() {
      this.agregar = false;
      // console.log(this.nota);
      this.axios
        .post("/nuevo-usuario", this.userNew)
        .then((res) => {
          this.users.push(res.data);
          this.userNew.nombre = "";
          this.userNew.email = "";
          (this.userNew.pass = ""), (this.mensaje.color = "success");
          this.mensaje.texto = "Usuario Agregada!";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response.data.error.errors.nombre.message) {
            this.mensaje.texto = e.response.data.error.errors.nombre.message;
          } else {
            this.mensaje.texto = "Error de sistema";
          }
          this.mensaje.color = "danger";
          this.showAlert();
        });
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Numans");

.cuerpo {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: "Numans", sans-serif;
}

.container {
  height: 100%;
  align-content: center;
}

.card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>