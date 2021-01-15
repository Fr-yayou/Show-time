<template>
<div>
  <BarChart v-bind:label="changeLabel" v-bind:num="num"/>
</div>
</template>

<script>
const BarChart = () => import("../../components/admin/BarChart")
import {mapGetters,mapActions} from "vuex"
export default {
  name:"Statistic",

  data(){
    return{
      booked:[],
      num:[],
      name:[],
      label:[],
    }
  },

  components:{
    BarChart
  },

  methods:{
    ...mapActions(["setAllUsers","setAllConcerts"]),
    
    getStat(){
      for (let m in this.getConcert) {
      this.label.push(m);
      this.num.push(this.getConcert[m])
}
    },

  },

  computed:{
    ...mapGetters(["getAllUsers","getAllConcerts"]),

    getBooked(){
      return this.getAllUsers.map(user =>{
        return user.booked_concert.forEach(book =>{
          return this.booked.push(book)
        })
      })
    },
    
    getConcert(){
      return this.booked.reduce((acc,val) =>{
        if(typeof(acc[val]) == 'undefined'){
          acc[val] = 1
        }else{
          acc[val] +=1 
        }
        return acc;
      },{})
    },

    changeLabel(){
      return this.label.map(l =>{
        return this.getAllConcerts.find(concert => concert._id === l).name_concert })}
    

  },

  created(){
    this.setAllUsers(),
    this.setAllConcerts()
  },

  mounted(){
    this.getBooked
    this.getConcert
    this.getStat()
  }


}


</script>

<style>

</style>