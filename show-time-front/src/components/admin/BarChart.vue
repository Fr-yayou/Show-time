<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  name:"Statistic",
  components:{
  },
  props:["num","label"],
  //use the feedback and the concert id//
  //number of concert by month//
  data(){
    return{
      data:{
        labels: this.label,
        datasets: [{
        backgroundColor: '#F9A825',
        label: 'Sale by concert',
        data: this.num,
        }]
      },
      options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }

  },

  mounted () {
    this.renderChart(this.data, this.options)
  },


}

</script>

<style>
#bar-chart{
  width:1100px !important;
  height: 650px !important;
}
</style>