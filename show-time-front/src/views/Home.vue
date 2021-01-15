<template>
  <div class="home">
    <div v-blur="blurConfig" class="backGround"></div>
      <router-link class="btn-heroImage" to="/events"><span class="difOne">Check</span> Our Events</router-link>
  </div>
</template>


<script>
export default {
  name:"Home",
  components:{
  },
  data(){
    return{
      
      isBlurred: true,
 
          // Example 2:
          // Activate and deactivate blur directive providing a local
          // configuration object.
      blurConfig: {
        isBlurred: false,
        opacity: 0.3,
        filter: 'blur(1.2px)',
        transition: 'all .5s linear'
      }
    }
  }
}
</script>

<style scoped>
.heroImage{
  width: 100%;
  height: 100%;
}
.btn-heroImage{
  position: absolute;
  top: 40%;
  left: 50%;
  font-size:30px;
  transform: translate(-50%, -110%);
  -ms-transform: translate(-50%, -50%);
  color: white;
  padding: 12px 24px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  border: 2px solid transparent;
}

.btn-heroImage:hover{
  border: 2px solid #F9A825;
  border-radius: 5px;
  color: #F9A825;
}

.backGround{
  background-image: url("../assets/hero.jpg");
  height: 100vh;
  background-size: cover;
  background-position: center center;
}

.difOne{
  color: #F9A825;
}
</style>