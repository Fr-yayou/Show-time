<template>
  <div class="container-createUser">
      <h1>Create a new user</h1>
      <div>
          <div class="msgErrorCreate" v-if="this.msgError"><p>{{msgError}}</p></div>
          <div class="msgSuccessCreate" v-if="this.msgSuccess"><p>User created with the email:{{msgSuccess}}</p></div>
          <form class="form-CreateUser" @submit="submitCreate">
                     <div class="container-inputCreateUser">
                         <input class="inputCreateUser" type="text" v-model="email" placeholder="E-mail address">
                     </div>
                     <div class="container-inputCreateUser">
                         <input class="inputCreateUser" type="text" v-model="username" placeholder="Username">
                     </div>
                     <div class="container-inputCreateUser">
                          <input class="inputCreateUser" type="password" v-model="password" placeholder="Password">
                     </div>
                     <div class="container-btnCreateUser">
                         <input class="btn-CreateUser" type="submit" value="Sign up">
                     </div>
            </form>
      </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
    name:"CreateUsers",

    data(){
        return{
            email:"",
            username:"",
            password:"",
            msgError:"",
            msgSuccess:""
        }
    },
    
    methods:{
        ...mapActions(["register"]),
        submitCreate(){
            event.preventDefault()
           const newUser ={
                username:this.username,
                email:this.email,
                password:this.password,
            }

            this.register(newUser).then(response =>{
                if(response.includes("User")){
                     return this.msgError = response
                }else{
                    return this.msgSuccess = response
                }
            })
            this.email=""
            this.username=""
            this.password=""
            this.isAdmin=""
        }
    }
}
</script>

<style>
.container-createUser{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.form-CreateUser{
    margin-top:20px;
    width:390px
}

.inputCreateUser{
    width: 100%;
    height:50px;
    margin-bottom: 20px;
    background-color: white;
    border: 1px solid white;
    outline: none;
    text-indent: 10px;
}

.container-btnCreateUser{
    display:flex;
    justify-content: center;
}
.btn-CreateUser{
    width: 300px;
    height: 50px;
    border:1px solid #F9A825;
    border-radius:20px;
    background-color:#F9A825;
    outline: none;
    color:white
}
.container-radioCreate{
    margin-bottom:15px;
    display: flex;
    justify-content: space-around;
}

.msgErrorCreate{
    color:#E57373;
    display: flex;
    justify-content: center;
}
.msgSuccessCreate{
    color:#66BB6A;
    display: flex;
    justify-content: center;
}
</style>