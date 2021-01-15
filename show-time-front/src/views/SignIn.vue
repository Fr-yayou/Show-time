<template>
  <div class="container-signIn">
      <div class="container-signInForm">
          <div class="container-signInTitle">
              <h1>Sign In</h1>
          </div>
          <div class="msgSuccess">
              <p>{{this.$route.query.msg}}</p>
          </div>
          <div class="msgError" v-if="msgError">
              <p>{{msgError}}</p>
          </div>
          <form class="container-formSignIn" @submit="submitSignIn">
              <div class="container-inputSignIn">
                  <input class="inputSignIn" type="text" v-model="email" placeholder="Email">
              </div>
              <div class="container-inputSignIn">
                  <input class="inputSignIn" v-model="password" type="password" placeholder="Password">
              </div>
              <div  class="container-btnSignIn">
                  <input class="btn-SignIn" type="submit" value="Sign In">
              </div>
          </form>
          <p class="text-logIn">Not registered on Bandsite yet? <router-link to="/signup" class="linkerLogIn"><span>Sign up</span></router-link></p>
      </div>
       <div class="hero-imageSignIn"></div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {
    name:"SignIn",

    data(){
        return{
            email:"",
            password:"",
            msgError:"",
        }
    },

    methods:{

        ...mapActions(["signIn"]),
        submitSignIn(){
            event.preventDefault()
            const user = {
                email:this.email,
                password:this.password
            }

            this.signIn(user).then(response =>{
                response
                if(this.authenticated.isAdmin == 1){
                    this.$router.push({path:"/admin/dashboard/users"})
                }else{
                    this.$router.push({path:"concerts"})
                }
        
            }).catch(err =>{
                this.msgError = err.response.data.message
            })
        }
    },
      computed:{
        ...mapGetters(["authenticated"])
  },

}
</script>

<style>
.container-formSignIn{
    width: 390px;
}
.hero-imageSignIn{
    background-image: url("../assets/imageSignIn.jpg");
    background-size: cover;
    background-position: center center;
    height: 91.12vh;
    width: 40%;
}
.container-signIn{
    padding-top:70px;
    display:flex;
    width: 100%;
    background-color: #efeff2;
}
.container-signInForm{
    width: 60%;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container-btnSignIn{
    display:flex;
    justify-content: center;
}

.btn-SignIn{
    width: 300px;
    height: 50px;
    border:1px solid #F9A825;
    border-radius:20px;
    background-color:#F9A825;
    outline: none;
    color:white
}

.container-signInTitle{
    margin-bottom:20px;
}
.container-inputSignIn{
    display: flex;
    justify-content: center;
}

::placeholder{
    text-indent: 10px;
}
.inputSignIn{
    width: 100%;
    height:50px;
    margin-bottom: 20px;
    background-color: white;
    border: 1px solid white;
    outline: none;
    text-indent: 10px;
}

.linkerLogIn span{
    color:#F9A825
}
.linkerLogIn{
    text-decoration: none;
}

.text-logIn{
    font-weight: 500;
    padding-top: 20px;
}
.msgSuccess{
    color:#66BB6A;
    display: flex;
    justify-content: center;
}
.msgError{
    color:#E57373;
    display: flex;
    justify-content: center;
}
</style>