<template> 
    <div class="container-signUp">
        <div class="container-formSignUp">
            <div class="width-wider">
                <div class="container-titleSignUp">
                    <h1>Ready to sign up ? </h1>
                    <p class="text-logIn">Already have a Bandsite account? <router-link to="/signin" class="linkerLogIn"><span>Log in</span></router-link></p>
                </div>
                <div class="msgError" v-if="this.msgError"><p>{{msgError}}</p></div>
                 <form class="form-signUp" @submit="submitSignUp">
                     <div class="container-inputSignUp">
                         <input class="inputSignUp" type="text" v-model="email" placeholder="E-mail address">
                     </div>
                     <div class="container-inputSignUp">
                         <input class="inputSignUp" type="text" v-model="username" placeholder="Username">
                     </div>
                     <div class="container-inputSignUp">
                          <input class="inputSignUp" type="password" v-model="password" placeholder="Password">
                     </div>
                     <div class="container-btnSignUp">
                         <input class="btn-SignUp" type="submit" value="Sign up">
                     </div>
                 </form>
            </div>
        </div>
        <div v-blur="blurConfig" class="hero-imageSignUp"></div>
    </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
    name:"SignUp",

    data(){
        return{
            email:"",
            username:"",
            password:"",
            msgError:"",
            msgSucess:"",
            isBlurred: true,
            blurConfig: {
                isBlurred: false,
                opacity: 0.3,
                filter: 'blur(1.2px)',
                transition: 'all .5s linear'
            }
        }
    },

    methods:{
        ...mapActions(["register"]),
        submitSignUp(){
            event.preventDefault()
           const newUser ={
                username:this.username,
                email:this.email,
                password:this.password
            }

            this.register(newUser).then(response =>{
                if(response.includes("User")){
                     return this.msgError = response
                }else{
                    return this.$router.push({path:"signin",query:{msg:`User created with the email address ${response}`}})
                }
            })
            this.email=""
            this.username=""
            this.password=""
        }
    }
}
</script>

<style scoped>

.inputSignUp{
    width: 100%;
    height:50px;
    margin-bottom: 20px;
    background-color: white;
    border: 1px solid white;
    outline: none;
    text-indent: 10px;
}

.container-inputSignUp{
    display: flex;
    justify-content: center;
}

.container-signUp{
    padding-top:70px;
    display:flex;
    width: 100%;
    background-color: #efeff2;
}
.container-formSignUp{
    width: 60%;
    padding-top:80px;
    display: flex;
    justify-content: center;

}
.hero-imageSignUp{
    background-image: url("../assets/imageSignUp.jpg");
    background-size: cover;
    background-position: center center;
    width: 40%;
    height: 91.12vh;
}
.text-logIn{
    font-weight: 500;
    padding-top: 20px;
}
.linkerLogIn{
    text-decoration: none;
    border-bottom:1px solid #F9A825
}
.linkerLogIn span{
    color:#F9A825
}
.container-btnSignUp{
    display:flex;
    justify-content: center;
}
.btn-SignUp{
    width: 300px;
    height: 50px;
    border:1px solid #F9A825;
    border-radius:20px;
    background-color:#F9A825;
    outline: none;
    color:white
}
.container-formSignUp-title{
    margin-bottom:20px;
}

.container-titleSignUp{
    margin-bottom:20px;
    display: flex;
    flex-direction: column;
    align-items: center
}

::placeholder{
    text-indent: 10px;
}
.width-wider{
    width: 390px
}
.msgError{
    color:#E57373;
    display: flex;
    justify-content: center;
}
.msgSuccess{
    color:#66BB6A;
    display: flex;
    justify-content: center;
}

</style>