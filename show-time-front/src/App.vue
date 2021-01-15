<template>
 <v-app>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
   </v-app>
</template>

<script>
const NavBar = () => import("./components/NavBar.vue")
export default {
  name:"App",
  components:{
    NavBar,
  },
}
</script>

<style>
body{
  background-color:#efeff2
}
</style>
