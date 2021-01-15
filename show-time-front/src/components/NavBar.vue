<template>
    <div class="navBar-container">
        <div class="logo-container">
            <img src="../assets/Logo-bandsite.png" alt="">
        </div>
            <div class="container-navLink">
                <ul class="list">
                    <div class="list" v-if="authenticated">
                            <router-link class="list-linkOne" to="/">Home</router-link>
                            <router-link class="list-linkOne" to="/concerts">Events</router-link>
                            <router-link v-if="authenticated.isAdmin == 0" class="list-linkOne" to="/profile"><li class="active">Profile</li></router-link>
                            <router-link v-if="authenticated.isAdmin == 1" class="list-linkOne" to="/admin/dashboard/users"><li class="active">Dashboard</li></router-link>
                    </div>
                    <li v-if="authenticated" class="list-linkThree" @click="Out">Log out</li>
                </ul>
                <ul v-if="!authenticated" class="btn-container">
                    <router-link class="btnAppOne" to="/signup">Sign Up</router-link>
                    <router-link class="btnAppTwo" to="/signin">Sign In</router-link>
                </ul>
            </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
    name:"NavBar",

    computed:{
        ...mapGetters(["authenticated"])
    },

    methods:{

        ...mapActions(["logOut"]),

        Out(){
            this.logOut(null)
            window.localStorage.clear()
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.navBar-container{
    background-color: #323232;
    width:100%;
    height: 70px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 1

}
.logo-container{
    margin-left:30px  
}
.container-navLink{
    margin-right:30px;
}

.list{
    display: flex;
    justify-content: space-around;
    text-decoration: none;
}
.list-linkOne{
    color:#f0f0f0;
    list-style: none;
    font-weight: 700;
    font-size:18px;
    height: 70px;
    line-height: 70px;
    text-decoration: none;
    margin-right: 20px;
}
.list-linkTwo{
    color:#f0f0f0;
    list-style: none;
    font-weight: 700;
    font-size:18px;
    height: 70px;
    line-height: 70px;
    text-decoration: none;
    margin-right: 20px;
}
.list-linkThree{
    color:#f0f0f0;
    list-style: none;
    font-weight: 700;
    font-size:18px;
    height: 70px;
    line-height: 70px;
    text-decoration: none;
    color:#F9A825
}

.list-linkOne:hover{
    border-bottom:3px solid #F9A825;
}
.list-linkTwo:hover{
    border-bottom:3px solid #F9A825;
}
.list-linkThree:hover{
    border-bottom:3px solid #F9A825;
}

.list a{
    text-decoration: none;
    outline: none;
}
.btnAppOne{
    padding:8px 24px;
    color:#F9A825;
    border:1px solid #F9A825;
    border-radius:20px;
    height: 40px;
    text-decoration: none;
    margin-right: 15px;
}
.btnAppOne:hover{
    filter: brightness(50%)
}
.btnAppTwo:hover{
    filter: brightness(50%)
}
.btnAppTwo{
  padding:8px 24px;
  background-color:#F9A825;
  color:#f0f0f0;
  border:1px solid #F9A825;
  border-radius:20px;
  height: 40px;
  text-decoration: none;
}
.container-navLink{
    display: flex;
}
.btn-container{
    display: flex;
    align-items: center;
}
</style>