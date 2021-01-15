<template>
    <div class="container-oneUser">
        <h1>User: <span>{{getOneUser.username}}</span></h1>
        <v-card class="card-color">
            <form class="form-updateUser" @submit="getInput">
                <div class="container-inputUpdate">
                    <label>Email</label>
                    <input class="inputUpdate" type="text" v-model="email"/> 
                </div>
                <div class="container-inputUpdate">
                    <label>Username</label>
                    <input class="inputUpdate" type="text" v-model="username"/>
                </div>
                <div class="container-radio">
                    <div>
                        <label>Admin</label>
                        <input type="radio" value="1" v-model="isAdminData"/>
                    </div>
                    <div>
                        <label>User</label>
                        <input type="radio" value="0" v-model="isAdminData"/>
                    </div>
                </div>
                <div class="container-btnUpdate">
                   <input class="btn-Update" type="submit" value="Update"/> 
                </div>
            </form>
            <div class="container-btnDelete">
                <button class="btn-Delete" @click="deleteUserOne(getOneUser._id)">Delete</button>
            </div>
        </v-card>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    name:"OneUser",

    data(){
        return{
            emailData:"",
            usernameData:"",
            isAdminData:""
        }
    },
    methods:{
        ...mapActions(["setUser","updateUser","deleteUser"]),


        getInput(){

            event.preventDefault()
            let newUser

            if(this.emailData != "" && this.usernameData != "" && this.isAdminData != ""){
                newUser = {
                    _id:this.$route.params.id,
                    username:this.usernameData,
                    email:this.emailData,
                    isAdmin:this.isAdminData
                
                } 

            }else if(this.emailData == "" && this.usernameData != "" && this.isAdminData != ""){
                newUser = {
                    _id:this.$route.params.id,
                    username:this.usernameData,
                    isAdmin:this.isAdminData
                
                } 

            }else if(this.emailData != "" && this.usernameData == "" && this.isAdminData != ""){
                newUser = {
                    _id:this.$route.params.id,
                    email:this.emailData,
                    isAdmin:this.isAdminData
                
                } 

            }else if(this.emailData != "" && this.usernameData != "" && this.isAdminData == ""){
                newUser = {
                    _id:this.$route.params.id,
                    email:this.emailData,
                    username:this.usernameData
                } 

            }else if (this.emailData != "" && this.usernameData == "" && this.isAdminData == ""){
                newUser = {
                    _id:this.$route.params.id,
                    email:this.emailData,
                } 
            }else if (this.emailData == "" && this.usernameData != "" && this.isAdminData == ""){
                newUser = {
                    _id:this.$route.params.id,
                    username:this.usernameData,
                } 
            }else if(this.emailData == "" && this.usernameData == "" && this.isAdminData != ""){
                newUser = {
                    _id:this.$route.params.id,
                    isAdmin:this.isAdminData,
                } 
            }
        

            if(newUser){
                console.log(newUser)
                this.updateUser(newUser)
                this.$router.push({path:"/admin/dashboard/users"})
            }



        },

        deleteUserOne(id){
            this.deleteUser(id)
            this.$router.push({path:"/admin/dashboard/users"})
        }
    },

    computed:{
          ...mapGetters(["getOneUser"]),
          email:{
              get(){
                  return this.getOneUser.email
              },

              set(value){
                  this.emailData = value
              }
          },
          username:{
              get(){
                  return this.getOneUser.username
              },
              set(value){
                  this.usernameData = value
              }
          },
    },

    created(){
        this.setUser(this.$route.params.id)
    }
}

</script>

<style scoped>
.card-color{
    background-color:#efeff2;
    width: 50%;
    margin-top: 20px;
}
.container-oneUser{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
.container-oneUser span{
    color:#F9A825
}
.form-updateUser{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.inputUpdate{
    width: 100%;
    height:50px;
    margin-bottom: 20px;
    background-color: white;
    border: 1px solid white;
    outline: none;
    text-indent: 10px;
}
.container-inputUpdate{
    width:80%
}
.container-inputUpdate label{
    margin-bottom: 5px;
    color:#F9A825
}
.container-btnUpdate{
    display:flex;
    justify-content: center;
    margin-bottom: 15px;
}
.container-btnDelete{
    display:flex;
    justify-content: center;
    margin-bottom: 15px;
}

.btn-Update{
    width: 300px;
    height: 50px;
    border:1px solid #F9A825;
    border-radius:20px;
    background-color:#F9A825;
    outline: none;
    color:white
}
.btn-Delete{
    width: 300px;
    height: 50px;
    border:1px solid #EF5350;
    border-radius:20px;
    background-color:#EF5350;
    outline: none;
    color:white
}

.container-radio{
    margin-bottom:15px;
    display: flex;
    width: 200px;
    justify-content: space-around;
}

</style>